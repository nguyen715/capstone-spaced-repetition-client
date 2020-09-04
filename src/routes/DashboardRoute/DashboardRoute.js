import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageService from '../../services/language-api-service'
import Word from '../../components/Word/Word'

class DashboardRoute extends Component {
  state = {
    shouldRedirect: false
  }
  static contextType = LanguageContext;
  static defaultProps = {
    words: []
  }

  componentDidMount = () => {
    LanguageService.getLanguageAndWords()
    .then(data => {
      console.log(data);
      this.context.setLanguage(data.language);
      this.context.setWords(data.words);
    })
    
    LanguageService.getNextWord()
    .then(word => {
      this.context.setNextWord(word);
    })
  }

  renderRedirect() {
    return (
      <Redirect to="/learn" />
    )
  }

  handleClick = () => {
    this.setState({ shouldRedirect: true })
  }

  render() {
    return (
      <section id="dashboard">
      {this.state.shouldRedirect && this.renderRedirect()}
        <h2>My Language: {this.context.language.name}</h2>

        <div className="word-list">
          {this.context.words.map(word => <Word word={word} key={word.id} /> )}
        </div>
        <div className="total-score">
          Total score so far: {this.context.language.total_score}
        </div>
        <button onClick={this.handleClick}>Start Learning!</button>
      </section>
    );
  }
}

export default DashboardRoute
