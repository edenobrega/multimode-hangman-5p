/* jshint esversion: 8 */

// Currently selected value
let phraseTimed = false;
document.getElementById("phrase-timed").addEventListener("change", function () {
    // Flip the bool on change
    phraseTimed = !phraseTimed;
    // Replace the old text value with the new one,
    // flip the first param of the replace to match what it used to be
    document.getElementById("second-play").href =
        document.getElementById("second-play").href.replace(`timed=${!phraseTimed}`, `timed=${phraseTimed}`);
});

let timed = false;
document.getElementById("word-timed").addEventListener("change", function () {
    timed = !timed;
    document.getElementById("first-play").href =
        document.getElementById("first-play").href.replace(`timed=${!timed}`, `timed=${timed}`);
});

// Currently selected value
let currentWordFile = "words";
document.getElementById("word-select").addEventListener("change", function () {
    // Get the new select value
    let newFile = document.getElementById("word-select").value;
    // Replace the old text value with the new one
    document.getElementById("first-play").href =
        document.getElementById("first-play").href.replace(`file=${currentWordFile}`, `file=${newFile}`);
    // Replace old value with the new
    currentWordFile = newFile;
});


let currentPhraseFile = "phrases";
document.getElementById("phrase-select").addEventListener("change", function () {
    let newFile = document.getElementById("phrase-select").value;
    document.getElementById("second-play").href =
        document.getElementById("second-play").href.replace(`file=${currentPhraseFile}`, `file=${newFile}`);
    currentPhraseFile = newFile;
});
