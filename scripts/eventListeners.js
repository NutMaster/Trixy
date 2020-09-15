// function loadJSON() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         console.log(this.responseText);
//       }
//     };
//     xhttp.open("GET", "../php/sendJSON.php", true);
//     xhttp.send();
// }

// loadJSON();


var questions = ['9 x 2', '18 - 3', '15 + 30', '3 x 4', '9 - 5'];
var answers = [18, 15, 45, 12, 4];
var currentQuestion = 0;

loadQuestion();

document.getElementById('player-submit').addEventListener('click', function() {
    var answer = document.getElementById('player-answer').value;
    answer = parseInt(answer);

    var consoleDOM = document.getElementById('console-answer');

    if (answer === answers[currentQuestion]) {
        currentQuestion++;
        consoleDOM.classList.toggle('player-correct');
        consoleDOM.textContent = 'Goed gedaan!';
        loadQuestion();
    } else {
        consoleDOM.classList.toggle('player-false');
        consoleDOM.textContent = 'Niet goed, probeer het nog een keer';
    }
});

function init() {
    
}

function loadQuestion() {
    console.log(questions);
    document.getElementById('console-question').textContent = questions[currentQuestion] + ' = ';
}