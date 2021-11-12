let loaded_values = []; 
let currentWord;
let timer;
let timed = true;

// loadValues("assets/answers/phrases.csv");
// selectWord();
startGame("assets/answers/phrases.csv");

function loadValues(fileName){
    var raw_values;
    return fetch(fileName)
        .then(response => response.text())
        .then(text => raw_values = text.split(','))
        .then(x => {
            for (let i = 1; i < raw_values.length; i+=2) {
                console.log("running");
                loaded_values.push({
                        answer: raw_values[i].trim(),
                        hint: raw_values[i+1].trim(),
                        letterAnswers: Array.from(new Set(raw_values[i].replace(/\s+/g, '').split(''))),
                        guessedAnswers: []
                    }
                );
            }
        });
}

function selectWord(){
    currentWord = Math.floor(Math.random() * loaded_values.length);
}

function attemptGuess(character){

}

function startGame(fileName){
    loadValues(fileName)
        .then(_res => {
            selectWord();
            if(timed){
                startTimer(5);                
            }
        });
}

function endGame(){
    console.log("game over");
}

function resetGame(){

}

// In seconds
function startTimer(gameLength){
    timer = setTimeout(endGame ,gameLength * 1000);
}