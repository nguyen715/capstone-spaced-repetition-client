import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageService from '../../services/language-api-service'

class LearningRoute extends Component {
  static contextType = LanguageContext;

  state = {
    guess: ''
  }

  componentDidMount () {    
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

  guessChanged = e => {
    this.setState({ guess: e.target.value })
  }

  handleSubmitClick = e => {
    e.preventDefault();
    LanguageService.postGuess(this.state.guess)
    .then()
  }

  render() {
    const word = this.context.nextWord;
    console.log(word);
    return (
      <section id="learning">
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
        <form>
          <label htmlFor="guess">Enter your guess: </label>
          <input type="text" id="guess" onChange={this.guessChanged} value={this.state.guess}></input>
          <input type="submit" onClick={this.handleSubmitClick} value="Submit"></input>
        </form>
      </section>
    );
  }
}

export default LearningRoute
