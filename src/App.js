import React from 'react';
import './reset.css';
import './App.css';
import QUESTIONS from './Apprentice_TandemFor400_Data.json';
import DisplayAnswers from "./components/display_answers"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: QUESTIONS,
      idx: 0,

    };
  }

  displayQuestions = () => {
    const { questions, idx } = this.state;
    const question = questions[idx];
    if (!question) return null;
    return (
      <div>
        <h2 className="the-question">{question.question}</h2>
        {<DisplayAnswers questions={questions} idx={idx} handleAnswerClk={this.handleAnswerClk} />}
      </div>
    );
  };


  render() {
    let { idx, questions } = this.state;
    return (
      <div className="main-container">
       <div className="game-container">
            <div className="title-container">
              <div className="left-title-container">
                <h1 className="title">Trivia Universe</h1>
              </div>
              <div className="right-title-container">
                <div className="score-container">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="pagination">
                  <h5>
                    {idx + 1}/{questions.length}
                  </h5>
                </div>
              </div>
              
            </div>
            {/* <div className="details-container">
              {this.displayQuestions()}

              <div className="prev-next-btns">
                {idx > 0 ? (
                  <button onClick={() => this.setState({ idx: idx - 1 })}>
                    {"<"}
                  </button>
                ) : (
                  <button disabled>{"<"}</button>
                )}
                {idx < questions.length - 1 ? (
                  <button onClick={() => this.setState({ idx: idx + 1 })}>
                    {">"}
                  </button>
                ) : (
                  <button disabled>{">"}</button>
                )}
              </div>
            </div> */}
        </div>
      </div>
    )
  }
}

export default App;
