

function shuffleAnswers(array){
  array.sort((a, b) => a - b);
};

function DisplayAnswers({questions, idx}) {
    const question = questions[idx];
    const choices = question.incorrect_answers.slice();
    choices.push(question.correct_answer);
    shuffleAnswers(choices);
    
    return (
      <div className="answers-container">
        <ul className="choices-ul">
          {choices.map((option, idx) => {
            <li>
              <button>{option}</button>
            </li>
          })}
        </ul>
      </div>
    );
  };

export default DisplayAnswers;
