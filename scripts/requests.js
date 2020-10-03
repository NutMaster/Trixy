function sendRequest(gamemode) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {            
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
        }
    };
    
    request.open('GET', 'scripts/game_content/rekenen.json', true);
    request.send();
}

const data = sendRequest('easy');