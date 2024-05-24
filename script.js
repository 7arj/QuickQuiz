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
let score = 0;
let currentQuestionIndex = 0;

// Function to display a random question
function displayRandomQuestion() {
    if (askedQuestions.length === questions.length) {
        displayEndPage();
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (askedQuestions.includes(randomIndex));

    askedQuestions.push(randomIndex);
    selectedQuestion = questions[randomIndex];
    currentQuestionIndex++;

    // Update HUD
    document.getElementById('question-number').textContent = `${currentQuestionIndex}/${questions.length}`;
    document.getElementById('score').textContent = `${score}`;
    updateProgressBar();

    // Set the question text
    document.querySelector('#question-page h1').textContent = selectedQuestion.question;

    // Set the choices text
    const choices = document.querySelectorAll('.choice');
    for (let i = 0; i < choices.length; i++) {
        if (i < selectedQuestion.choices.length) {
            choices[i].textContent = selectedQuestion.choices[i];
            choices[i].style.display = 'inline-block'; // Show choice
        } else {
            choices[i].style.display = 'none'; // Hide unused choices
        }
        choices[i].classList.remove('correct', 'incorrect'); // Reset any previous styling
        choices[i].style.pointerEvents = 'auto'; // Re-enable clicking
    }

    console.log('Displayed question:', selectedQuestion.question);
}

// Event listener for the play button
document.querySelector('.play-button').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('question-page').style.display = 'flex';
    displayRandomQuestion();
});

// Event listeners for the choice buttons
const choices = document.querySelectorAll('.choice');
choices.forEach(function(choice) {
    choice.addEventListener('click', function() {
        const isCorrect = this.textContent === selectedQuestion.correct;
        console.log('User selected:', this.textContent);
        console.log('Correct answer:', selectedQuestion.correct);

        this.classList.add(isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            score += 10;
        }

        // Disable further clicks until the next question is displayed
        choices.forEach(function(c) {
            c.style.pointerEvents = 'none';
        });

        setTimeout(function() {
            displayRandomQuestion();
        }, 500); // Wait 0.5 seconds before showing the next question
    });
});

// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Function to display the end page
function displayEndPage() {
    document.getElementById('question-page').style.display = 'none';
    document.getElementById('end-page').style.display = 'flex';
    document.getElementById('final-score').textContent = score;
}

// Event listeners for the end page buttons
document.getElementById('play-again-button').addEventListener('click', function(event) {
    event.preventDefault();
    resetQuiz();
    document.getElementById('end-page').style.display = 'none';
    document.getElementById('question-page').style.display = 'flex';
    displayRandomQuestion();
});

document.getElementById('go-home-button').addEventListener('click', function(event) {
    event.preventDefault();
    resetQuiz();
    document.getElementById('end-page').style.display = 'none';
    document.getElementById('landing-page').style.display = 'flex';
});

function resetQuiz() {
    askedQuestions = [];
    selectedQuestion = null;
    score = 0;
    currentQuestionIndex = 0;
    updateProgressBar();
}
