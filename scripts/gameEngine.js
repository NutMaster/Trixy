// Getting the appropiate game data from the game_content folder.
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

function pickQuestion(object) {
    const randomQuestionNumber = Math.floor(Math.random() * object.length);
    return object[randomQuestionNumber];
}

(async () => {
        // Retrieving the game content from getGameContent
        const gameContent = await getGameContent('easy');

        // Initializing required DOM objects
        const correctAnswerDOM = document.querySelector('.answer-right');
        const wrongAnswerDOM = document.querySelector('.answer-wrong');
        const inputField = document.getElementById('game-wrapper-input');
        const questionBox = document.getElementById('game-wrapper-question-box');
        const answerButton = document.getElementById('game-wrapper-check');

        function nextQuestion() {
            // Changing DOM model back to default values
            correctAnswerDOM.style.display = 'none';
            wrongAnswerDOM.style.display = 'none';
            questionBox.innerHTML = '';

            // Picking a random question from the content
            const question = pickQuestion(gameContent);

            // Adding the question to the DOM model.
            questionBox.innerHTML = `<i class="fas fa-arrow-circle-right font-awesome-align"></i> ${question['question']}`;
            
            // Checking
            function check() {
                if (inputField.value) {
                    const answer = parseInt(inputField.value);
                    if (question['correctAnswer'] === answer) {
                        console.log('Correct');
                        correctAnswerDOM.style.display = 'block';
                        nextQuestion();
                    } else {
                        console.log('Wrong');
                        wrongAnswerDOM.style.display = 'block';
                    }
                }
            }
        }

        // Setting up the event listener
        answerButton.addEventListener('click', check);

        nextQuestion();
})();