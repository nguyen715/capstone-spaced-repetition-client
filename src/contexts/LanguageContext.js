import React, { Component } from 'react'
import LanguageApiService from '../services/language-api-service'

const LanguageContext = React.createContext({
  language: null,
  words: [],
  setLanguage: () => {},
  setWords: () => []
})

export default LanguageContext

export class LanguageProvider extends Component {
  constructor(props) {
    super(props)
    const state = { language: {}, words: [] }
  }

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,

      setLanguage: this.setLanguage,
      setWords: this.setWords
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
