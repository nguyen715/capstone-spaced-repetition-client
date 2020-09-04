import config from '../config'
import TokenService from './token-service'

const LanguageService = {
  getLanguageAndWords() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    }
    )
    .then(res =>
      console.log(res) &&
      (!res.ok)
        ? res.json().then(err => Promise.reject(err))
        : res.json()
    );
  },

  getNextWord() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(err => Promise.reject(err))
        : res.json()
    )
  },

  postGuess(guessString) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        guess: guessString
      })
    }
    return fetch(`${config.API_ENDPOINT}/language/guess`, options)
    .then(res =>
      (!res.ok)
        ? res.json().then(err => Promise.reject(err))
        : res.json()
    )
  }
}

export default LanguageService;