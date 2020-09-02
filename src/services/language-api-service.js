import config from '../config'

const LanguageService = {
  getLanguageAndWords() {
    return fetch(`${config.API_ENDPOINT}/language`);
  }
}

export default LanguageService;