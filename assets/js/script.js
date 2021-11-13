let loaded_values = []; 
let currentWord;
let timer;
let timerOnscreen;
let maxTime;
let guessesLeft = 11;
let timed = true;

// loadValues("assets/answers/phrases.csv");
// selectWord();
startGame("assets/answers/phrases.csv");

function loadValues(fileName){
    var raw_values;
    return fetch(fileName)
        .then(response => response.text())
        .then(text => raw_values = text.toLowerCase().split(','))
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
    if(loaded_values[currentWord].letterAnswers.includes(character)){
        loaded_values[currentWord].guessedAnswers.push(character);
        var ele = document.getElementById(character.toUpperCase());
        ele.classList.remove("clickable");
        ele.classList.remove("letter-blue");
        ele.classList.add("letter-green");

        var locations = [];
        var idx = loaded_values[currentWord].answer.indexOf(character.toLowerCase());
        while(idx != -1){
            locations.push(idx);
            idx = loaded_values[currentWord].answer.indexOf(character.toLowerCase(), idx+1);
        }

        for (let index = 0; index < locations.length; index++) {
            document.getElementById(`letter-${locations[index]}-text`).innerText = character.toUpperCase();
            var changeSquare = document.getElementById(`letter-${locations[index]}`);  
            changeSquare.classList.remove("letter-red");
            changeSquare.classList.add("letter-green");               
        }
    }
    else{
        var changeSquare = document.getElementById(character.toUpperCase());
        changeSquare.classList.remove("letter-blue");
        changeSquare.classList.remove("clickable");
        changeSquare.classList.add("letter-red");
        changeSquare.getElementsByTagName("p")[0].style.textDecoration = "line-through";


        guessesLeft--;
        document.getElementById("guesses-text").innerText = guessesLeft;
        if(guessesLeft == 0){
            endGame();
        }
    }
}

function startGame(fileName){
    loadValues(fileName)
        .then(_res => {
            selectWord();

            var lettersParentHTML = document.getElementById("answer-box");
            var newHtml = "";
            console.log(loaded_values[currentWord].answer);
            for (let index = 0; index < loaded_values[currentWord].answer.length; index++) {
                if(loaded_values[currentWord].answer[index] === " "){
                    newHtml += `<div id="letter-${index}" class="letter-box"><p id="letter-${index}-text" class="box-letter"> </p></div>`;
                }
                else{
                    newHtml += `<div id="letter-${index}" class="letter-box letter-red"><p id="letter-${index}-text" class="box-letter">?</p></div>`;                    
                }
            }
            lettersParentHTML.outerHTML = '<div id="answer-box" class="word-box">' + newHtml + '</div>';

            if(timed){
                startTimer(5);                
            }
        });
    
    guessesLeft = 11;
    document.getElementById("guesses-text").innerText = guessesLeft;
}

function endGame(){
    window.clearTimeout(timer);
    window.clearInterval(timerOnscreen);
}

function resetGame(){

}

// In seconds
function startTimer(gameLength){
    maxTime = gameLength;
    timer = setTimeout(endGame ,(gameLength * 1000)+1000);
    document.getElementById("timer-text").innerText = gameLength;
    timerOnscreen = setInterval(updateOnScreenTimer ,1000);
}

function updateOnScreenTimer(){
    maxTime--;
    document.getElementById("timer-text").innerText = maxTime;
    if(maxTime == -1){
        window.clearInterval(timerOnscreen);
    }
}