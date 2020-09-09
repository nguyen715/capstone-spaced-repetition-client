import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageService from '../../services/language-api-service'
import './FeedbackRoute.css'

class LearningRoute extends Component {
  static contextType = LanguageContext;

  state = {
    shouldRedirect: false
  }

  renderRedirect = () => {
    return (
      <Redirect to="/learn" />
    )
  }

  // componentDidMount = () => {    
  //   LanguageService.getLanguageAndWords()
  //   .then(data => {
  //     this.context.setLanguage(data.language);
  //     this.context.setWords(data.words);
  //   })
    
  //   LanguageService.getNextWord()
  //   .then(word => {
  //     this.context.setNextWord(word);
  //   })
  // }

  handleButtonClick = e => {
    e.preventDefault();
    this.setState({ shouldRedirect: true });
  }

  render() {
    const word = this.context.nextWord;
    const isCorrect = word.translation === this.context.guess;
    return (
      <section id="feedback">
        {this.state.shouldRedirect && this.renderRedirect()}
        <div className="word-feedback-info">
          <div>
            Your word is: {word.nextWord}
          </div>
          <div>
            You guessed: {this.context.guess}
          </div>
          <div>
            Your guess is... {
              (isCorrect)
              ? 'Correct!'
              : `Incorrect! The correct answer is: ${word.translation}.`
            }
          </div>
          <div>
            Correct guesses: {
              (isCorrect)
              ? word.wordCorrectCount + 1
              : word.wordCorrectCount
              }
          </div>
          <div>
            Incorrect guesses: {
              (isCorrect)
              ? word.wordIncorrectCount
              : word.wordIncorrectCount + 1
              }
          </div>
          <div>
            Current total score: {
              (isCorrect)
              ? word.totalScore + 1
              : word.totalScore
            }
          </div>
        </div>
        <button onClick={this.handleButtonClick}>Next word</button>
      </section>
    );
  }
}

export default LearningRoute
