import React, { useEffect, useState } from 'react'
import PlayerInfo from './PlayerInfo';
import confetti from "canvas-confetti"

/**
 * Determines the message that the will go in the 'decidingContainer' which the user will see, either that they
 * won or they lost. Hides the 'wordContainer', 'guessField', and 'guessButton', and shows the 'decidingContainer,
 * and 'playButton'. 
 * 
 * @param { innerHTML } container in which the win or lose message will be set.
 * @param { innerHTML } container in which the word is in.
 * @param { InputHTMLAttributes } guessField HTML input attribute.
 * @param { ButtonHTMLAttributes } guessButton HTML button attribute.
 * @param { String } message that will be posted in the container.
 * @param { ButtonHTMLAttributes } playAgainButton HTML button attribute.
 */
function determineOutcome(decidingContainer, wordContainer, guessField, guessButton, message, playAgainButton) {
    decidingContainer.innerHTML = message;
    // Hide the following elements.
    wordContainer.style.display = 'none'
    guessField.style.display = 'none';
    guessButton.style.display = 'none';
    // Show the following elements.
    decidingContainer.style.display = 'inline'
    playAgainButton.style.display = "inline";
}

/**
 * Validate strings are alphanumeric.
 * 
 * @param { String } string which is being validated.
 * @returns true or false whether or not the string is alphanumeric.
 */
function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Resets the game after the 'play again' button is pressed. This will show the 'decidingContainer' and 'playAgainButton' and hide the 'guessButton', 'guessField',
 * 'nextWordContainer', and clear the 'guessField'.
 */
function playAgainReset() {
    let guessButton = document.getElementById('guessButton');
    let playAgainButton = document.getElementById('playAgainButton');
    let guessField = document.getElementById('guessField');
    let nextWordContainer = document.getElementById('nextWordContainer');
    let decidingContainer = document.getElementById('decidingContainer');

    // Hide the following elements.
    decidingContainer.style.display = 'none'
    playAgainButton.style.display = 'none';
    // Show the following elements.
    guessButton.style.display = 'inline'
    guessField.style.display = 'inline';
    nextWordContainer.style.display = 'inline'
    guessField.value = ''
}


/**
 * Component that handles the creation of the text field that will ask the user what word is being guessed,
 * the input field for the user to guess, and the button that triggers the validation of the users guess.
 * 
 * @returns Component that handles the users guess.
 */
function GuessWord() {
    // Instantiate the words state and set it to "loading" until it gets updated.
    const [words, setWords] = useState("loading")
    // Instantiate the score state and set it to 0.
    const [score, setScore] = useState(0)
    // Instantiate the lives state and set it to 3.
    const [lives, setLives] = useState(3)
    // Instantiate the index state and set it to 0.
    const [index, setIndex] = useState(0)
    // Instantiate the current word state and set it to the first word 
    const [currentWord, setCurrentWord] = useState(words[0])

    // Functions that will increment or decrement a state using the previous state.
    function incrementScore() {
    setScore(prevCount =>  prevCount + 1)
    }
    function decrementLives() {
    setLives(prevCount => prevCount - 1)
    }
    function incrementIndex() {
    setIndex(prevCount => prevCount + 1)
    }
 
    // Asyn method that calls server to get random words for the game.
    async function fetchWords() {
        const result = await fetch("/api/getWords");
        const body = await result.json();
        setWords(body);
    }
 
    // Async method that will be called when the react component first renders and will only render ONCE, due to the empty [].
    useEffect(() => {
        fetchWords()
    }, [])

    /* 
    Async function that will be called when the user clicks the 'play again' button. Will call the server to get a new set of 
    words to use for the new game, reset the board, and reset the state of the values to their original state.
    */
    async function playAgain() {
    fetchWords();
    playAgainReset()

    setIndex(0)
    setLives(3)
    setScore(0)
    }

    /*
     Conditional useEffect. When the 'index' state updated, if there are still words in the 'words' we got back from the server,
     update the state of the 'currentWord' using the new value of index, and clear the guess field.
     */
    useEffect(() => {

    if (index < words.length) {
        let guessField = document.getElementById('guessField');

        setCurrentWord(words[index])
        guessField.value = '';
    }

    }, [index, words.length, words])

    /*
     Conditional useEffect. When the 'score' state is updated, if the score is 10, they have won the game so call the 
     determineOutcome method to clear out the board and let the user know they won.
     */
    useEffect(() => {

    if (score == 10) {
        let nextWordContainer = document.getElementById('nextWordContainer');
        let decidingContainer = document.getElementById('decidingContainer');
        let guessField = document.getElementById('guessField');
        let guessButton = document.getElementById("guessButton");
        let playAgainButton = document.getElementById("playAgainButton");
        determineOutcome(decidingContainer, nextWordContainer, guessField, guessButton, "You Win!", playAgainButton);
    }

    }, [score])

    /*
     Conditional useEffect. When the 'lives' state is udpated, if the lives is 0, they have lost the game so call the
     determineOutcome method to clear out the board and let the user know they lost.
     */
    useEffect(() => {

    if (lives == 0) {
        let nextWordContainer = document.getElementById('nextWordContainer');
        let decidingContainer = document.getElementById('decidingContainer');
        let guessField = document.getElementById('guessField');
        let guessButton = document.getElementById("guessButton");
        let playAgainButton = document.getElementById("playAgainButton");
        determineOutcome(decidingContainer, nextWordContainer, guessField, guessButton, "You ran out of lives, try again.", playAgainButton);
    }

    }, [lives])

    async function determineInput(e) {
        // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
        e.preventDefault();

        let guessField = document.getElementById('guessField');
        const userGuess = guessField.value.toLowerCase().trim();

        // Check that the users guess is Alphanumeric
        if(isAlphanumeric(userGuess)) {
            // Check if the users guess is correct. If so, increment the score and the index.
            if (userGuess === currentWord.english.toLowerCase()) {
                confetti();
                incrementScore()
                incrementIndex()
            } else { // If they users guess is incorrect, decrement the lives and increment the index.
                decrementLives()
                incrementIndex()
            }
        }
    }

  return (
    <div>

        {/* Player information, passing in the score and lives states. */}
        <PlayerInfo 
            score={score}
            lives={lives} 
        />

        {/* 
            Container that contains two heading containers. 
            The first container, 'nextWordContainer', is asking the user the word to guess, which will show during the game.
            The second container, 'decidingContainer', contains the win or lose message the user will see at the end of the game.
        */}
        <div className="flex justify-center" >
            <h2 id="nextWordContainer" className="w-1/4 flex justify-center text-center" style={{ display: 'inline' }}>
                ¿Cómo Se Dice&nbsp;<p id="currentWord" className="font-bold" style={{ display: 'inline'}}>{currentWord.spanish}({currentWord.type})?</p>
            </h2>
            <h2 id="decidingContainer" className="w-1/4 flex justify-center text-center" style={{ display: 'none' }}>
            </h2>
        </div>

        {/* 
            This form is what allows the usage of the 'enter' key when the user wants to submit their input/guess to be verified. 
            For some reason the 'onkeydown', 'onkeyup' and other variations of binding does not work. 
        */}
        <form onSubmit={determineInput}>
            {/* Input field for the users guess. */}
            <div className="flex justify-center">
                <input autoComplete="one-time-code" type="text" id="guessField" className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96 "></input>
            </div>
            
            
            {/* 
                Container that contains two buttons.
                First button is the guessButton which the user can press to guess the word, which will be shown during the game.
                Second button is the playAgainButton which is the button that the user will press if they want to play again, which will be shown at the end of the game.
            */}
            <div className="flex justify-center">
                <button style={{ display: 'inline' }} onClick={determineInput} id="guessButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-4">Guess</button>
                
                <button style={{ display: 'none' }} onClick={() => {playAgain()}} id="playAgainButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Play again</button>
            </div>
            
        </form>
    </div>
  )
}

export default GuessWord