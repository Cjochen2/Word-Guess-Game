// word bank
var randomWordArr = ["real world", "kryptonite", "good", "drops of jupiter",];

// Max number of tries
const attempts = 10;

// Stores guessed letters
var guessedLetters = [];

// Index of the current word in the array
var wordSelector; 

// This will be the word we actually build to match the current word
var guessingWord = [];

// How many tries the player has left
var remainingGuesses = 0;

// Flag for 'press any key to try again'
var hasFinished = false;

// How many wins
var wins = 0;

gameReset();

function gameReset(){
    remainingGuesses = attempts;
    wordSelector = Math.floor(Math.random() * randomWordArr.length);
    guessedLetters = [];
    guessingWord = [];
    for(var i = 0; i < randomWordArr[wordSelector].length; i++) {
         guessingWord.push(" _ ");
    }
    console.log(remainingGuesses);
    console.log(wordSelector);
    console.log(guessingWord);
    updateDisplay();
   
}

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        hasFinished = true;
    }
};



document.onkeydown = function(event) {
    if(hasFinished) {
        gameReset();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};


function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < randomWordArr[wordSelector].length; i++) {
        if(randomWordArr[wordSelector][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf(" _ ") === -1) {
        wins++;
        hasFinished = true;
    }
};

