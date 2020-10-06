function init(gamemode = 'normal') {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {            
        if (this.readyState == 4 && this.status == 200) {
            const jsonData = JSON.parse(this.responseText)[gamemode]['questions'];
            changeGame(jsonData);
        }
    };

    request.open('GET', 'scripts/game_content/rekenen.json', true);
    request.send();
}

function changeGame(arrayOfQuestions) {
    // Selecting a random question from the arrayOfQuestions array.
    const randomQuestion = Math.floor(Math.random() * arrayOfQuestions.length);

    // Adding the question to the DOM model.
    const question = `${arrayOfQuestions[randomQuestion]['question']}`;
    const paragraph = document.getElementById('question-box');
    const text = document.createTextNode(question);
    paragraph.appendChild(text);
}

init('easy');