import React from "react"
import Answer from "./Answer"
import {nanoid} from "nanoid"
export default function Question(props) {
    function constructAnswers() {
        return props.answers.map(answer => 
        <Answer 
            selectedAnswer={props.selectedAnswer}
            correctAnswer={props.correctAnswer}
            questionId={props.id} 
            select={props.select} 
            value={answer} 
            key={nanoid()}
            isRevealed={props.isRevealed}
            />)
            
    }
    return (
        <div className="question">
          <h3 className="question-title">{props.question}</h3>
           <ul className="question-answers">
             {constructAnswers()}
           </ul>
        </div>
    )
}