import React, { Component } from 'react'
import LanguageApiService from '../services/language-api-service'

const LanguageContext = React.createContext({
  language: null,
  words: [],
  nextWord: {},
  setLanguage: () => {},
  setWords: () => [],
  setNextWord: () => {}
})

export default LanguageContext

export class LanguageProvider extends Component {
  constructor(props) {
    super(props)
    const state = { language: {}, words: [], nextWord: {} }
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

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      nextWord: this.state.nextWord,

      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setNextWord: this.setNextWord
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
