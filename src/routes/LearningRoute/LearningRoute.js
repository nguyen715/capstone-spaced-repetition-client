import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageService from '../../services/language-api-service'
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = LanguageContext;

  state = {
    guess: '',
    shouldRedirect: false
  }

  componentDidMount () {    
    LanguageService.getLanguageAndWords()
    .then(data => {
      this.context.setLanguage(data.language);
      this.context.setWords(data.words);
    })
    
    LanguageService.getNextWord()
    .then(word => {
      this.context.setNextWord(word);
    })
  }

  guessChanged = e => {
    this.setState({ guess: e.target.value })
  }

  renderRedirect = () => {
    return (
      <Redirect to="/feedback" />
    )
  }

  handleSubmitClick = e => {
    e.preventDefault();
    this.context.setGuess(this.state.guess);
    LanguageService.postGuess(this.state.guess);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const word = this.context.nextWord;
    return (
      <section id="learning">
        {this.state.shouldRedirect && this.renderRedirect()}
        <div className="next-word-info">
          <div>
            Your word is: {word.nextWord}
          </div>
          <div>
            Current total score: {word.totalScore}
          </div>
          <div>
            Correct guesses: {word.wordCorrectCount}
          </div>
          <div>
            Incorrect guesses: {word.wordIncorrectCount}
          </div>
        </div>
        <form>
          <label htmlFor="guess">Enter your guess: </label>
          <input type="text" id="learn-guess-input" onChange={this.guessChanged} value={this.state.guess}></input>
          <input type="submit" className="submit-button" onClick={this.handleSubmitClick} value="Submit"></input>
        </form>
      </section>
    );
  }
}

export default LearningRoute
