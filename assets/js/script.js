let loaded_values = []; 
let currentWord;
let timer;
let timerOnscreen;
let maxTime;
let guessesLeft = 11;
let timed = true;
let active = false;
let phrase = true;

// loadValues("assets/answers/phrases.csv");
// selectWord();
startGame();

function loadValues(){
    var raw_values;
    var fileName;
    if(phrase){
        fileName = "assets/answers/phrases.csv"
    }
    else{
        fileName = "assets/answers/words.csv";
    }
    return fetch(fileName)
        .then(response => response.text())
        .then(text => raw_values = text.toLowerCase().split(','))
        .then(x => {
            if(phrase){
                for (let i = 1; i < raw_values.length; i+=2) {
                    loaded_values.push({
                            answer: raw_values[i].trim(), // word/phrase to guess
                            hint: raw_values[i+1].trim(), // <
                            letterAnswers: Array.from(new Set(raw_values[i].replace(/\s+/g, '').split(''))), // all the unique letters to be guessed
                            guessedAnswers: [] // <
                    });  
                }
            }
            else{
                for (let i = 1; i < raw_values.length; i++) {
                    loaded_values.push({
                            answer: raw_values[i].trim(), // word/phrase to guess
                            letterAnswers: Array.from(new Set(raw_values[i].replace(/\s+/g, '').split(''))), // all the unique letters to be guessed
                            guessedAnswers: [] // <
                    });  
                }
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
        ele.classList.remove("letter-blue");
        ele.classList.add("letter-green");
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
            changeSquare.classList.remove("letter-red");
            changeSquare.classList.add("letter-green");               
        }

        if(checkCompletion()){
            endGame();
        }
    }
    else{
        // Get the clicked letter and disable it
        var changeSquare = document.getElementById(character.toUpperCase());
        changeSquare.classList.remove("letter-blue");
        changeSquare.classList.remove("clickable");
        changeSquare.classList.add("letter-red");
        changeSquare.removeAttribute("onclick");
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
                    newHtml += `<br class="vis-flip"><div id="letter-${index}" class="letter-box vis-flip-2"><p id="letter-${index}-text" class="box-letter"> </p></div>`;
                }
                else{
                    newHtml += `<div id="letter-${index}" class="letter-box letter-red"><p id="letter-${index}-text" class="box-letter">?</p></div>`;                    
                }
            }
            lettersParentHTML.outerHTML = '<div id="answer-box" class="word-box">' + newHtml + '</div>';

            if(phrase){
                document.getElementsByClassName("parent")[0];

                var hintElement = document.createElement("div");
                hintElement.classList.add("parent");
                document.getElementsByClassName("parent")[0].parentNode.insertBefore(hintElement, document.getElementsByClassName("parent")[0].nextSibling);
                
                var textElementParent = document.createElement("div")
                textElementParent.classList.add("hint-box");
                hintElement.appendChild(textElementParent);

                var textElement = document.createElement("p");
                textElement.classList.add("hint-text");
                textElement.innerText = "Hint : " +loaded_values[currentWord].hint;
                textElementParent.appendChild(textElement);

            }

            if(timed){
                startTimer(60);                
            }
            active = true;
        });
    
    guessesLeft = 11;
    document.getElementById("guesses-text").innerText = guessesLeft;
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
    if(loaded_values[currentWord].guessedAnswers.sort().join(",") === loaded_values[currentWord].letterAnswers.sort().join(",")){
        return true;
    }
    return false;
}