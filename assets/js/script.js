/* jshint esversion: 8 */
let loaded_values = []; 
let currentWord;
let timer;
let timerOnscreen;
let maxTime;
let guessesLeft = 11;

var timed = true;
let active = false;
var phrase = true;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(urlParams.get("phrase") !== null){
    phrase = urlParams.get("phrase") == "true";
}
if(urlParams.get("timed") !== null){
    timed = urlParams.get("timed") == "true";
}

document.getElementById("next").addEventListener("click", reload);

startGame();

function reload(){
    window.location.reload();
}

function loadValues(){
    var raw_values;
    var fileName;
    if(phrase){
        fileName = "assets/answers/phrases.csv";
    }
    else{
        fileName = "assets/answers/words.csv";
    }
    return fetch(fileName)
        .then(response => response.text())
        .then(text => raw_values = text.toLowerCase().split(','))
        .then(x => {
            console.log(raw_values);
            for (let i = 1; i < raw_values.length; i+=2) {
                loaded_values.push({
                        answer: raw_values[i].trim(), // word/phrase to guess
                        hint: raw_values[i+1].trim(), // <
                        letterAnswers: Array.from(new Set(raw_values[i].replace(/\s+/g, '').split(''))), // all the unique letters to be guessed
                        guessedAnswers: [] // <
                });  
            }
        });
}

function selectWord(){
    console.log(loaded_values.length);
    currentWord = Math.floor(Math.random() * loaded_values.length);
}

function attemptGuess(character){
    if(!active){
        return;
    }

    if(loaded_values[currentWord].letterAnswers.includes(character)){
        // Add letter to guessed answers list 
        loaded_values[currentWord].guessedAnswers.push(character);

        // Remove clickable onscreen letter and change styling to reflect that
        var ele = document.getElementById(character.toUpperCase());
        ele.classList.remove("clickable");
        ele.classList.remove("blue-border");
        ele.classList.add("green-border");
        ele.removeAttribute("onclick");

        // Get every location of that letter
        var locations = [];
        var idx = loaded_values[currentWord].answer.indexOf(character.toLowerCase());
        while(idx != -1){
            locations.push(idx);
            idx = loaded_values[currentWord].answer.indexOf(character.toLowerCase(), idx+1);
        }

        // Use locations to set styling and contents
        for (let index = 0; index < locations.length; index++) {
            document.getElementById(`letter-${locations[index]}-text`).innerText = character.toUpperCase();
            var changeSquare = document.getElementById(`letter-${locations[index]}`);  
            changeSquare.classList.remove("red-border");
            changeSquare.classList.add("green-border");               
        }

        if(checkCompletion()){
            endGame();
        }
    }
    else{
        // Get the clicked letter and disable it
        var changeSquare = document.getElementById(character.toUpperCase());
        changeSquare.classList.remove("blue-border");
        changeSquare.classList.remove("clickable");
        changeSquare.classList.add("red-border");
        changeSquare.removeAttribute("onclick");
        changeSquare.getElementsByTagName("p")[0].classList.add("strike");

        guessesLeft--;
        document.getElementById("chances").innerText = guessesLeft;
        if(guessesLeft == 0){
            endGame();
        }
    }
}

function startGame(fileName){
    loadValues(fileName)
        .then(_res => {
            selectWord();

            var lettersParentHTML = document.getElementById("word-container");
            var newHtml = "";
            console.log(loaded_values[currentWord].answer);
            for (let index = 0; index < loaded_values[currentWord].answer.length; index++) {
                if(loaded_values[currentWord].answer[index] === " "){
                    // newHtml += `<div class="word-inner-square"></div>`;
                    newHtml += "<br>";
                }
                else{
                    newHtml += `
                    <div id="letter-${index}" class="word-inner-square red-border">
                        <p id="letter-${index}-text" class="word-text">?</p>
                    </div>`;
                }
            }

            lettersParentHTML.innerHTML = newHtml;
            
            if(timed === true){
                startTimer(120);                
            }
            else{
                var timerParent = document.getElementById("timer-parent");
                timerParent.classList.add("hidden");
            }

            document.getElementById("hint-text").innerText = loaded_values[currentWord].hint;
            active = true;
        });
    
    guessesLeft = 11;
    document.getElementById("chances").innerText = guessesLeft;
}

function endGame(){
    active = false;
    if(timed){
        window.clearTimeout(timer);
        window.clearInterval(timerOnscreen);        
    }
    if(!(checkCompletion())){
        // get missing letters
        let missing = loaded_values[currentWord].letterAnswers.filter(val => !loaded_values[currentWord].guessedAnswers.includes(val));

        for (let index = 0; index < missing.length; index++) {
            // get each location of those missing letters
            var locations = [];
            var idx = loaded_values[currentWord].answer.indexOf(missing[index].toLowerCase());
            while(idx != -1){
                locations.push(idx);
                idx = loaded_values[currentWord].answer.indexOf(missing[index].toLowerCase(), idx+1);
            }            
            // change the text of each of those
            for (let index2 = 0; index2 < locations.length; index2++) {
                document.getElementById(`letter-${locations[index2]}-text`).innerText = missing[index].toUpperCase();
            }
        }
    }

    document.getElementById("timer-parent").classList.add("hidden");
    document.getElementById("chances-parent").classList.add("hidden");
    document.getElementById("next-parent").classList.remove("hidden");
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

function checkCompletion(){
    return loaded_values[currentWord].guessedAnswers.sort().join(",") === loaded_values[currentWord].letterAnswers.sort().join(",");
}