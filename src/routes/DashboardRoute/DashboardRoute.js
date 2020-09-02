import React, { Component } from 'react'
import LanguageContext from '../contexts/LanguageContext'
import LanguageService from '../services/LanguageService'
import Word from '../components/Word/Word'

class DashboardRoute extends Component {
  static ContextType = LanguageContext;

  componentDidMount() {
    LanguageService.getLanguageAndWords()
    .then(data => {
      this.context.setLanguage(data.language);
      this.context.setWords(data.words);
    })
  }

  render() {
    return (
      <section id="dashboard">
        <h2>My Language: {this.context.language}</h2>

        <div className="word-list">
          {this.context.words.map(word => <Word word={word} /> )}
        </div>
        <div className="total-score">
          Total score so far: {this.context.language.total_score}
        </div>
        <button onClick="handleClick">Start Learning!</button>
      </section>
    );
  }
}

export default DashboardRoute
