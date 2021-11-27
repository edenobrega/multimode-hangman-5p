/* jshint esversion: 8 */
let loaded_values = [];
let currentWord;
let timer;
let timerOnscreen;
let maxTime;
let guessesLeft = 11;

let timed = true;
let active = false;
let phrase = true;
let file = "";

// Characters that should not appear in answers
let nonGuessable = [',', '!', "'", "."];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get URL params
if (urlParams.get("phrase") !== null) {
    phrase = urlParams.get("phrase") == "true";
}
if (urlParams.get("timed") !== null) {
    timed = urlParams.get("timed") == "true";
}
if (urlParams.get("file")) {
    file = urlParams.get("file");
}

// Add event listener to Play Again
document.getElementById("next").addEventListener("click", resetGame);

// Get all keys on the onscreen keyboard
let keys = document.getElementsByClassName("key-box");
// Loop through and add a onclick event to each div
for (let i = 0; i < keys.length; i++) {
    // keys[i].addEventListener("click", attemptGuess(keys[i].id.toLowerCase()));
    keys[i].addEventListener("click", function () {
        attemptGuess(keys[i].id.toLowerCase());
    });
}

// eventlistener for keyboard use
document.onkeydown = function (evt) {
    evt = evt || window.event;
    // Checks if the key that was pressed is in the alphabet, and is a single letter
    if (evt.key.match(/[a-z]/i) && evt.key.length == 1) {
        attemptGuess(evt.key.toLowerCase());
    }
    // If the game is not active and the spacebar was pressed, restart game
    else if (active === false && evt.key == " ") {
        resetGame();
    }
};

startGame();

// Load the csv file into an array
function loadValues() {
    let raw_values;
    let fileName;

    if (phrase) {
        fileName = "assets/answers/sentence/" + file + ".csv";
    } else {
        fileName = "assets/answers/non-sentence/" + file + ".csv";
    }

    return fetch(fileName)
        .then(response => response.text())
        .then(text => {
            raw_values = text.toLowerCase().split('\n');
            for (let i = 1; i < raw_values.length; i++) {
                let u = raw_values[i].split(',');
                loaded_values.push({
                    answer: u[0].trim(),
                    hint: u[1].trim(),
                    letterAnswers: Array.from(new Set(u[0].replace(/\s+/g, '').split(''))) // all the unique letters to be guessed
                        .filter(val => !nonGuessable.includes(val)), // remove nonguessables
                    guessedAnswers: [] // <
                });
            }
        });
}

// Randomly selects a word from the loaded array
function selectWord() {
    currentWord = Math.floor(Math.random() * loaded_values.length);
}

// Check to see if guessed character is correct
function attemptGuess(character) {
    // catch if not active, already guessed, or not a a-z character
    if (!active || loaded_values[currentWord].guessedAnswers.includes(character) || !character.match(/[a-z]/i) || character.length != 1) {
        return;
    }
    let ele = document.getElementById(character.toUpperCase());
    if (loaded_values[currentWord].letterAnswers.includes(character)) {
        ele = document.getElementById(character.toUpperCase());
        // Add letter to guessed answers list 
        loaded_values[currentWord].guessedAnswers.push(character);

        // Remove clickable onscreen letter and change styling to reflect that
        ele.classList.add("green-border");

        // Get every location of that letter
        let locations = [];
        let idx = loaded_values[currentWord].answer.indexOf(character.toLowerCase());
        while (idx != -1) {
            locations.push(idx);
            idx = loaded_values[currentWord].answer.indexOf(character.toLowerCase(), idx + 1);
        }

        // Use locations to set styling and contents
        for (let index = 0; index < locations.length; index++) {
            document.getElementById(`letter-${locations[index]}-text`).innerText = character.toUpperCase();
            let changeSquare = document.getElementById(`letter-${locations[index]}`);
            changeSquare.classList.remove("red-border");
            changeSquare.classList.add("green-border");
        }

        if (checkCompletion()) {
            endGame();
        }
    } else {
        ele = document.getElementById(character.toUpperCase());
        // Get the clicked letter and disable it
        ele.classList.add("red-border");
        ele.getElementsByTagName("p")[0].classList.add("strike");

        guessesLeft--;
        document.getElementById("chances").innerText = guessesLeft;
        if (guessesLeft == 0) {
            endGame();
        }
    }

    ele.classList.remove("clickable");
    ele.classList.remove("blue-border");
}
// creates/modifies needed HTML 
function buildHTML() {
    let lettersParentHTML = document.getElementById("word-container");
    let newHtml = "";

    for (let index = 0; index < loaded_values[currentWord].answer.length; index++) {
        if (loaded_values[currentWord].answer[index] === " ") {
            newHtml += "<br>";
        } else if (nonGuessable.includes(loaded_values[currentWord].answer[index])) {
            newHtml += `
            <div id="letter-${index}" class="word-inner-square green-border">
                <p id="letter-${index}-text" class="word-text">${loaded_values[currentWord].answer[index]}</p>
            </div>`;
        } else {
            newHtml += `
            <div id="letter-${index}" class="word-inner-square red-border">
                <p id="letter-${index}-text" class="word-text">?</p>
            </div>`;
        }
    }

    lettersParentHTML.innerHTML = newHtml;

    document.getElementById("hint-text").innerText = loaded_values[currentWord].hint;
    active = true;
}

// Runs all functions needed in correct order, and 
function startGame(fileName) {
    if (loaded_values.length == 0) {
        loadValues(fileName)
            .then(_res => {
                selectWord();
                buildHTML();
            });
    } else {
        selectWord();
        buildHTML();
    }

    if (timed === true) {
        startTimer(120);
    } else {
        let timerParent = document.getElementById("timer-parent");
        timerParent.classList.add("hidden");
    }

    guessesLeft = 11;
    document.getElementById("chances").innerText = guessesLeft;
}

// Reveal remaining letters and enable play again button
function endGame() {
    active = false;
    if (timed) {
        window.clearTimeout(timer);
        window.clearInterval(timerOnscreen);
        document.getElementById("timer-parent").classList.add("hidden");
    }
    // Check if player failed to complete
    if (!(checkCompletion())) {
        // get missing letters
        let missing = loaded_values[currentWord].letterAnswers.filter(val => !loaded_values[currentWord].guessedAnswers.includes(val));

        for (let index = 0; index < missing.length; index++) {
            // get each location of those missing letters
            let locations = [];
            let idx = loaded_values[currentWord].answer.indexOf(missing[index].toLowerCase());
            while (idx != -1) {
                locations.push(idx);
                idx = loaded_values[currentWord].answer.indexOf(missing[index].toLowerCase(), idx + 1);
            }
            // change the text of each of those
            for (let index2 = 0; index2 < locations.length; index2++) {
                document.getElementById(`letter-${locations[index2]}-text`).innerText = missing[index].toUpperCase();
            }
        }
    }

    document.getElementById("chances-parent").classList.add("hidden");
    document.getElementById("next-parent").classList.remove("hidden");
}

// Reset the game and html
function resetGame() {
    let keys = document.getElementsByClassName("key-box");
    for (let i = 0; i < keys.length; i++) {
        keys[i].classList.remove("blue-border");
        keys[i].classList.remove("red-border");
        keys[i].classList.remove("green-border");
        keys[i].getElementsByTagName("p")[0].classList.remove("strike");

        keys[i].classList.add("blue-border");
        keys[i].classList.add("clickable");
    }

    if (timed) {
        document.getElementById("timer-parent").classList.remove("hidden");
    }
    document.getElementById("chances-parent").classList.remove("hidden");
    document.getElementById("next-parent").classList.add("hidden");
    loaded_values[currentWord].guessedAnswers = [];
    startGame();
}

// Begins the timer | In seconds
function startTimer(gameLength) {
    maxTime = gameLength;
    timer = setTimeout(endGame, (gameLength * 1000) + 1000);
    document.getElementById("timer-text").innerText = gameLength;
    timerOnscreen = setInterval(updateOnScreenTimer, 1000);
}

// Updates the html element that holds the timer
function updateOnScreenTimer() {
    maxTime--;
    document.getElementById("timer-text").innerText = maxTime;
    if (maxTime == -1) {
        window.clearInterval(timerOnscreen);
    }
}

// Check if all correct letters have been guessed
function checkCompletion() {
    // Sort the lists and then turn into them into strings so that they can be compared
    return loaded_values[currentWord].guessedAnswers.sort().join(",") === loaded_values[currentWord].letterAnswers.sort().join(",");
}
