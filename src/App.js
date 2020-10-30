import React from 'react';
import './stylesheets/reset.css';
import './stylesheets/App.css';
import QUESTIONS from './Apprentice_TandemFor400_Data.json';
import DisplayAnswers from "./components/display_answers"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBrain } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import CategorySelection from './components/category_selection';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: QUESTIONS,
      idx: 0,
      score: 0,
      gameOver: false,
      categorySelection: true,
    };
  }

  componentDidMount = () => {
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    const shuffled = QUESTIONS.sort(() => 0.5 - Math.random());
    let tenQuestion = shuffled.slice(0, 10);
    this.setState({questions: tenQuestion})
  }

  displayQuestions = () => {
    const { questions, idx } = this.state;
    const question = questions[idx];
    if (!question) return null;
    return (
      <div className="question-container">
        <div className="the-question">
          <h2>{question.question}</h2>
        </div>
        <DisplayAnswers questions={questions} idx={idx} handleAnswerClk={this.handleAnswerClk} />
      </div>
    );
  };

  handleAnswerClk = (questions, idx, choice) => {
    const question = questions[idx];
    let {
      score,
      gameOver,
    } = this.state;

    if (question.correct_answer === choice) {
      score += 1;     
    } else {
      score--; 
    }
    if (idx + 1 >= questions.length) {
      gameOver = true;
    } else {
      idx++;
    }

    this.setState({
      score,
      idx,
      gameOver
    });
  };

  displayGameScreen = () => {
    let { idx, questions, score, gameOver, categorySelection } = this.state;
    return (
      <div className="game-container">
        <div className="title-container">
          <div className="left-title-container">
            <FontAwesomeIcon id="brain" icon={faBrain} />
            <h1 className="title">TRIVIA UNIVERSITY</h1>
          </div>
          {
            !categorySelection ? (
            <div className="right-title-container">
              <div className="score-container">
                <FontAwesomeIcon id="star" icon={faStar} />
                <span id="score">{score}</span>
              </div>
              <div><span>|</span></div>
              <div className="pagination">
                <h5># {idx + 1} / {questions.length}</h5>
              </div>
            </div>
            ) : ""
          }
        </div>
        <div className="middle-container">
          { categorySelection ? <CategorySelection /> : !gameOver ? this.displayQuestions() : this.displayGameOver() } 
        </div>            
      </div>
    )
  }

  displayGameOver = () => {
    return (
    <div className="game-over-container">
      <h2 id="game-over-text">Game Over!</h2>
      <div className="replay-container">
        <FontAwesomeIcon id="restart" title="Play Again" icon={faPlayCircle} onClick={ () => this.newGame()}/>
      </div>
      <div className="stats-container">
        <span>You Scored:</span>
        <span id="stats-score">{this.state.score}</span>
      </div>
    </div>
    );
  }

  newGame = () => {
    this.fetchQuestions();
    this.setState({
      gameOver: false,
      score: 0,
      idx: 0,
    })
  }


  render() {
    const { categorySelection } = this.state; 
    return (
      <div className="main-container">
       {this.displayGameScreen()}
      </div>
    )
  }
}

export default App;
