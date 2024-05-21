// Array of question objects
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["A. Paris", "B. London", "C. Rome", "D. Berlin"],
        correct: "A. Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["A. Earth", "B. Mars", "C. Jupiter", "D. Saturn"],
        correct: "B. Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["A. Atlantic Ocean", "B. Indian Ocean", "C. Arctic Ocean", "D. Pacific Ocean"],
        correct: "D. Pacific Ocean"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["A. William Shakespeare", "B. Charles Dickens", "C. Mark Twain", "D. Jane Austen"],
        correct: "A. William Shakespeare"
    }
];

let askedQuestions = [];
let selectedQuestion;

// Function to display a random question
function displayRandomQuestion() {
    if (askedQuestions.length === questions.length) {
        alert("Quiz over! You've answered all the questions.");
        // Optionally, reset the quiz here if needed
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (askedQuestions.includes(randomIndex));

    askedQuestions.push(randomIndex);
    selectedQuestion = questions[randomIndex];

    // Set the question text
    document.querySelector('#question-page h1').textContent = selectedQuestion.question;

    // Set the choices text
    const choices = document.querySelectorAll('.choice');
    for (let i = 0; i < choices.length; i++) {
        choices[i].textContent = selectedQuestion.choices[i];
        choices[i].classList.remove('correct', 'incorrect'); // Reset any previous styling
    }
}

// Event listener for the play button
document.querySelector('.play-button').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('question-page').style.display = 'flex';
    displayRandomQuestion();
});

// Event listeners for the choice buttons
var choices = document.querySelectorAll('.choice');
choices.forEach(function(choice) {
    choice.addEventListener('click', function() {
        if (this.textContent === selectedQuestion.correct) {
            this.classList.add('correct');
        } else {
            this.classList.add('incorrect');
        }

        setTimeout(function() {
            displayRandomQuestion();
        }, 1000); // Wait 1 second before showing the next question
    });
});
