import React from 'react';
import './Word.css';

export default function Word(props) {
  return (
    <div className="word-card">
      <div>Word: {props.word.original}</div>
      <div>Translation: {props.word.translation}</div>
      <div>Correct guesses so far: {props.word.correct_count}</div>
      <div>Incorrect guesses so far: {props.word.incorrect_count}</div>
    </div>
  )
}