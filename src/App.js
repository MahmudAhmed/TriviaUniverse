import React from 'react';
import './stylesheets/reset.css';
import './stylesheets/App.css';
import QUESTIONS from './Apprentice_TandemFor400_Data.json';
import DisplayAnswers from "./components/display_answers"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBrain } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { faGithub, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons'
import './stylesheets/categories.css';
const axios = require("axios");


const CATAGORIES = [
  { "id": 1, "category": "Tandem: Random"},
  { "id": 9, "category": "General Knowledge"},
  { "id": 10, "category": "Entertainment: Books"},
  { "id": 11, "category": "Entertainment: Films"},
  { "id": 12, "category": "Entertainment: Music"},
  { "id": 14, "category": "Entertainment: Television"},
  { "id": 15, "category": "Entertainment: Video Games"},
  { "id": 17, "category": "Entertainment: Science & Nature"},
  { "id": 20, "category": "Mythology"},
  { "id": 21, "category": "Sports"},
  { "id": 22, "category": "Geography"},
  { "id": 23, "category": "History"},
  { "id": 24, "category": "Politics"},
  { "id": 25, "category": "Art"},
  { "id": 26, "category": "Celebrities"},
]

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categoryId: 1,
      questions: [],
      categorySelection: true,
      highScore: parseInt(localStorage.getItem('triviaScore') || 0),
    };
  }

  // componentDidMount = () => {
  //   this.fetchQuestions();
  // }

  fetchQuestions = () => {
    const { categoryId } = this.state; 
    if ( categoryId === 1) {
      const shuffled = QUESTIONS.sort(() => 0.5 - Math.random());
      let tenQuestion = shuffled.slice(0, 10);
      this.setState({questions: tenQuestion})
    } else {
      axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}`).then((data) => {
        this.setState({ questions: data.data.results });
      });
    }
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
    debugger
    let {
      score,
      gameOver,
      highScore,
    } = this.state;

    if (question.correct_answer === choice) {
      score += 1;     
    } else {
      score--; 
    }
    if (idx + 1 >= questions.length) {
      gameOver = true;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('triviaScore', highScore)
      }
    } else {
      idx++;
    }

    this.setState({
      score,
      idx,
      gameOver, 
      highScore
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
          { categorySelection ? this.categorySelection() : ( !gameOver ? this.displayQuestions() : this.displayGameOver()) } 
        </div>            
      </div>
    )
  }

  displayGameOver = () => {
    return (
    <div className="game-over-container">
      <h2 id="game-over-text">Play Again!</h2>
      <div className="replay-container">
        <FontAwesomeIcon id="restart" title="Play Again" icon={faPlayCircle} onClick={ () => this.setState({ categorySelection: true})}/>
      </div>
      <div className="stats-container">
        <span>You Scored:</span>
        <span id="stats-score">{this.state.score}</span>
        {
          this.state.highScore > 0 ? (
            <div>
              <span>Your Highest Score:</span>
              <span id="stats-score">{this.state.highScore}</span>
            </div>
          ) : ""
        }
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

  categorySelection = () => {
    return (
      <div className="category-container">
        <h2 id="category-title">Select A Category to Begin</h2>
        <ul className="category-list">
          {
            CATAGORIES.map( (topic) => {
              return (
              <li className="categories" onClick={ () => {
                this.setState({ categorySelection: false, categoryId: topic.id}, () => this.newGame());              
              }}>
                {topic.category}
              </li>
              )
            })
          }
        </ul>
      </div>
    );
};


  render() {
    return (
      <div className="main-container">
       {this.displayGameScreen()}
       <div class="social-icon-container">
               <a href="https://www.linkedin.com/in/mahmud-ahmed/" target="_black"><FontAwesomeIcon className="social-icons" icon={faLinkedin} /></a>
               <a href="https://github.com/mahmudahmed" target="_black"><FontAwesomeIcon className="social-icons" icon={faGithub} /></a>
               <a href="https://medium.com/@moe.purplefox" target="_black"><FontAwesomeIcon className="social-icons" icon={faMedium} /></a>
        </div>
      </div>
    )
  }
}

export default App;
