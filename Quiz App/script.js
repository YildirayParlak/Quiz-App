const questions = [
    {
        question: "What is the world's most populated country?",
        answers: [
            { text: "India", correct: false },
            { text: "USA", correct: false },
            { text: "China", correct: true },
            { text: "Russia", correct: false },
        ]
    },
    {
        question: "What is the world's smallest country?",
        answers: [
            { text: "Liechtenstein", correct: false },
            { text: "Vatican City", correct: true },
            { text: "Monaco", correct: false },
            { text: "Luxembourg", correct: false },
        ]
    },
    {
        question: "What is the capital of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Adelaide", correct: false },
            { text: "Canberra", correct: true },
            { text: "Melbourne", correct: false },
        ]
    },
    {
        question: "Where was the hottest temperature ever recorded?",
        answers: [
            { text: "India", correct: false },
            { text: "Libya", correct: true },
            { text: "Mexico", correct: false },
            { text: "Peru", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "What is the longest river in the world?",
        answers: [
            { text: "Amazon River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Yangtze River", correct: false },
            { text: "Mississippi River", correct: false },
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Claude Monet", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Pb", correct: false },
            { text: "Fe", correct: false },
        ]
    },
    {
        question: "Which ocean is the largest by surface area?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false },
        ]
    }
];


const question = document.getElementById("question");
const answerBtn = document.getElementById("answer-btns");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion()
}

function showQuestion(){
    resetPrev();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    question.innerHTML = questionNumber + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetPrev(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("false");
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });

    nextBtn.style.display = "block";

}

function showScore(){
    resetPrev();
    question.innerHTML = `You answered ${score} question(s) correctly!`
    nextBtn.innerHTML = "Play Again"
    nextBtn.style.display = "block";
}

function showNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length){
        showNextButton()
    } else {
        startQuiz();
    }
})

startQuiz();
