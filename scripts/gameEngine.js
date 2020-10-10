const correctAnswerDOM = document.querySelector('.answer-right');
const wrongAnswerDOM = document.querySelector('.answer-wrong');

const attemptCount = document.getElementById('game-wrapper-attempts');
const pointCount = document.getElementById('game-wrapper-points');

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
    if (attempt === 1) {
        attemptCount.textContent = `1 attempt left.`;
    } else {
        attemptCount.textContent = `${attempt} attempts left.`;
    }
}

const pickQuestion = jsonData => {
    const randomQuestionNumber = Math.floor(Math.random() * jsonData.length);
    return jsonData[randomQuestionNumber];
}

const checkQuestion = (questionObject, attempts) => {
    // Check if the user has attempts left, if not the game should continue.
    if (attempts <= 0) {
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
    questionBox.innerHTML = '';
    updateAttemptCounter();
    inputField.focus();
    
    // Adding the question to the DOM model.
    questionBox.innerHTML = `<i class="fas fa-arrow-circle-right font-awesome-align orange-icon"></i> ${questionObject['question']}`;
}

(async () => {
        // Retrieving game content.
        const gameContent = await getGameContent('easy');

        // Initializing the game engine.
        let questionObject, attempts;
        nextQuestion();

        function nextQuestion() {
            attempts = 3;
            questionObject = pickQuestion(gameContent);
            questionDOM(questionObject);
        }

        // Moving to the next question if the button is clicked and if the answer is correct.
        answerButton.onclick = function() {
            if (inputField.value) {
                attempts--;
                updateAttemptCounter(attempts);
                const continueGame = checkQuestion(questionObject, attempts);
                if (continueGame) {
                    nextQuestion();
                }
            }
        }

        inputField.addEventListener('keyup', event => {
            if (event.keyCode === 13) {
                answerButton.click();
            }
        });
})();