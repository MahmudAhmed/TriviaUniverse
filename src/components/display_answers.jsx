function DisplayAnswers({questions, idx, handleAnswerClk}) {
    const question = questions[idx];
    const choices = question.incorrect_answers.slice();
    choices.push(question.correct_answer);
    choices.sort(() => 0.5 - Math.random());
    return (
      <div className="answers-container">
        <ul className="choices-ul">
          {choices.map((option, key) => (
            <li key={key} className="choices-li">
              <button className="answer-btns" onClick={() => handleAnswerClk(questions, idx, option)}>{option}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default DisplayAnswers;
