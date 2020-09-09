import React, { Component } from 'react'

const LanguageContext = React.createContext({
  language: null,
  words: [],
  nextWord: {},
  headWord: {},
  guess: '',
  setLanguage: () => {},
  setWords: () => [],
  setNextWord: () => {},
  setHeadWord: () => {},
  setGuess: () => ''
})

export default LanguageContext

export class LanguageProvider extends Component {
  constructor(props) {
    super(props)
    const state = { language: {}, words: [], nextWord: {}, guess: '' }
    this.state = state
  }

  setLanguage = language => {
    this.setState({ language: language })
  }

  setWords = wordList => {
    this.setState({ words: wordList })
  }

  setNextWord = word => {
    this.setState( { nextWord: word })
  }

  setHeadWord = word => {
    this.setState( { headWord: word })
  }

  setGuess = word => {
    this.setState( { guess: word })
  }

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      nextWord: this.state.nextWord,
      headWord: this.state.headWord,
      guess: this.state.guess,

      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setNextWord: this.setNextWord,
      setHeadWord: this.setHeadWord,
      setGuess: this.setGuess
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
