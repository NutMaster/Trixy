// Getting the appropiate game data from the game_content folder.
async function getGameContent(gamemode = 'easy') {
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

(async () => {
    // Retrieving the game content from getGameContent
    const gameContent = await getGameContent();

    // Picking a random question from the content
    const randomQuestion = Math.floor(Math.random() * gameContent.length);

    // Adding the question to the DOM model.
    const text = document.createTextNode(gameContent[randomQuestion]['question']);
    document.getElementById('game-wrapper-question-box').appendChild(text);
})();