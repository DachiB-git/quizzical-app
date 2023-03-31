import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"
export default function App() {
    const [questions, setQuestions] = React.useState([])
    const [quiz, setQuiz] = React.useState({isStarted: false, isChecked: false, isOver: false})
    React.useEffect(()=> {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=url3986")
        .then(res => res.json())
        .then(data => setQuestions(data.results.map(data => ({
            id: nanoid(),
            question: decodeURIComponent(data.question),
            correctAnswer: decodeURIComponent(data.correct_answer),
            answers: shuffle([decodeURIComponent(data.correct_answer), ...decodeURIComponent(data.incorrect_answers).split(",")]),
            selectedAnswer: "",
            isRevealed: false
        }))))}, [quiz.isOver])
        React.useEffect(()=> {
           let usersChoices = new Array(5).fill("");
           let count = 0;
           usersChoices = questions.map(question => question.selectedAnswer)
           usersChoices.forEach(choice => {
               questions.forEach(question => {
                   if(choice===question.correctAnswer){
                       count++
                   }
               })
           })
           if(quiz.isChecked){
               document.querySelector(".result").textContent = `You scored ${count}/5 correct answers`
               document.querySelector(".result").style.display = "block"
           }
        }, [questions])
    function constructQuestions() {
        return questions.map(question => 
        <Question 
          key={question.id}
          id={question.id} 
          answers={question.answers}
          correctAnswer={question.correctAnswer}
          question={question.question}
          select={select}
          selectedAnswer={question.selectedAnswer}
          isRevealed={question.isRevealed}
          />)
    }
     function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
  return array;
 }  
    function select(questionId,value) {
        if(!quiz.isChecked){
            setQuestions(prevQuestions => prevQuestions.map(question => 
         question.id===questionId ? {...question, selectedAnswer: value} : question
       ))
        }
       
    }
    function check() {
        setQuestions(prevQuestions => prevQuestions.map(question => ({...question, isRevealed: true})))
        setQuiz(prevState=> ({...prevState, isChecked: true}))
    }
    function startQuiz() {
        setQuiz(prevState=> ({...prevState, isStarted: true}))
    }
    function playAgain(){
        setQuiz(prevState=> ({...prevState,isChecked: false, isOver: !prevState.isOver}))
        document.querySelector(".result").style.display = "none"
    }
    return (quiz.isStarted ? 
           
            <main className="quiz">
                {questions.length > 0 && 
                            <div>
                            {constructQuestions()}
                            </div>}
                <div className="action">            
                    <p style={{display: "none"}}className="result"></p>
                    <button className="btn check-answers-btn" onClick={!quiz.isChecked ? check : playAgain}> {!quiz.isChecked ? "Check answers" : "Play again"}</button>
                </div>
            </main> : 
            <div className="intro">
                <h1 className="intro-title">Quizzical</h1>
                <p className="intro-description">General knowledge quiz for all ages</p>
                <button className="btn intro-btn"onClick={startQuiz}>Start quiz</button>
            </div>)
}
