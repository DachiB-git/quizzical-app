import React from "react"
export default function Answer(props){
    const statusClass = props.isRevealed && props.correctAnswer===props.value ? "answer-correct" : props.selectedAnswer===props.value && props.isRevealed ? "answer-incorrect" : props.selectedAnswer===props.value  ? "answer-selected" : props.isRevealed && !props.isSelected && !props.isCorrect ? "answer-revealed" : ""
    const classes = `answer ${statusClass}`
    return (
        <li  className={classes} onClick={()=> props.select(props.questionId,props.value)}>{props.value}</li>
    )
}