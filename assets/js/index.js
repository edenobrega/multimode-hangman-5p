/* jshint esversion: 8 */
let phraseTimed = false;
document.getElementById("phrase-timed").addEventListener("change", function(){
    phraseTimed = !phraseTimed;
    document.getElementById("second-play").href = 
        document.getElementById("second-play").href.replace(`timed=${!phraseTimed}`,`timed=${phraseTimed}`);
});

let timed = false;
document.getElementById("word-timed").addEventListener("change", function(){
    timed = !timed;
    document.getElementById("first-play").href = 
        document.getElementById("first-play").href.replace(`timed=${!timed}`,`timed=${timed}`);
});

let currentWordFile = "words";
document.getElementById("word-select").addEventListener("change", function(){
    let newFile = document.getElementById("word-select").value;
    document.getElementById("first-play").href = 
        document.getElementById("first-play").href.replace(`file=${currentWordFile}`, `file=${newFile}`);
    currentWordFile = newFile;
});

let currentPhraseFile = "phrases";
document.getElementById("phrase-select").addEventListener("change", function(){
    let newFile = document.getElementById("phrase-select").value;
    document.getElementById("second-play").href = 
        document.getElementById("second-play").href.replace(`file=${currentPhraseFile}`, `file=${newFile}`);
    currentPhraseFile = newFile;
});