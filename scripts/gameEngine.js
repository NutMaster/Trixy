// Game variables
let questionObject, attempts, pointCount;

// DOM Objects
const correctAnswerDOM = document.querySelector('.answer-right');
const wrongAnswerDOM = document.querySelector('.answer-wrong');
const attemptCount = document.getElementById('game-wrapper-attempts');
const pointCountDOM = document.getElementById('game-wrapper-points');
const inputField = document.getElementById('game-wrapper-input');
const questionBox = document.getElementById('game-wrapper-question-box');
const answerButton = document.getElementById('game-wrapper-check');

async function getGameContent(gamemode = 'normal') {
    const data = new Promise(resolve => {
        const request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open('GET', 'scripts/game_content/maths.json', true);
    
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == "200") {
                resolve(JSON.parse(this.responseText)[gamemode]['questions']);
            }
        }
        request.send();
    });

    return await data;
}

const wrongAnswer = () => {
    // Showing the wrong message and hiding the correct message.
    correctAnswerDOM.style.display = 'none';
    wrongAnswerDOM.style.display = 'block';
    inputField.value = '';

    // Removing the message after 1 second.
    setTimeout(() => {
        wrongAnswerDOM.style.display = 'none';
    }, 1000);
}

const correctAnswer = () => {
    // Showing the correct message and hiding the wrong message.
    correctAnswerDOM.style.display = 'block';
    wrongAnswerDOM.style.display = 'none';

    // Removing the message after 1 second.
    setTimeout(() => {
        correctAnswerDOM.style.display = 'none';
    }, 1000);
}

const updateAttemptCounter = (attempt = 3) => {
    attemptCount.textContent = `${attempt} attempt(s) left.`;
}

const pickQuestion = jsonData => {
    const randomQuestionNumber = Math.floor(Math.random() * jsonData.length);
    return jsonData[randomQuestionNumber];
}

const checkQuestion = (questionObject, attempts) => {
    // Check if the user has attempts left, if not the game should continue.
    console.log(attempts);
    if (attempts < 1) {
        return true;
    }

    // If the user has attempts left, the answer will be checked.
    const answer = parseInt(inputField.value);
    if (questionObject['correctAnswer'] == answer) {
        // The answer is correct, the game should continue.
        correctAnswer();
        return true;
    } else {
        wrongAnswer();
    }
}

const questionDOM = questionObject => {
    // Changing DOM model back to default values.
    inputField.value = '';
    inputField.focus();
    updateAttemptCounter();
    
    // Adding the question to the DOM model.
    questionBox.innerHTML = `<i class="fas fa-arrow-circle-right font-awesome-align orange-icon"></i> ${questionObject['question']}`;
}

const loadQuestion = gameContent => {
    attempts = 3;
    questionObject = pickQuestion(gameContent);
    questionDOM(questionObject);
}

const continueGame = gameContent => {
    const continueGame = checkQuestion(questionObject, attempts);
    if (continueGame) {
        loadQuestion(gameContent);

        /*
        This should become an algorithm to determine the points given.
        pointCount += 40;

        Update the DOM.
        pointCountDOM.textContent = `${pointCount} points`;
        */
    } else {
        attempts--;
        updateAttemptCounter(attempts);
    }
}

(async () => {
        // Retrieving game content.
        const gameContent = await getGameContent('easy');

        // Initializing the game engine.
        loadQuestion(gameContent);

        // Moving to the next question if the button is clicked and if the answer is correct.
        answerButton.onclick = function() {
            if (inputField.value) {
                continueGame(gameContent);
            }
        }

        inputField.addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                answerButton.click();
            }
        });
})();