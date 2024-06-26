import React, { useEffect, useState } from 'react'
import { useTimer } from "react-timer-hook";
import user from '../../images/user.png'
import confetti from "canvas-confetti"
import HighScoreModal from './HighScoreModal';

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
 * Resets the game after the 'play again' button is pressed. This will close the 'timedGameModeModal' modal, the 'timeUpContinaer' container, and show the
 * 'nextWordContainer', 'timedModeGuessField', and the 'timedModeGuessButton".
 */
function playAgainReset() {
    document.getElementById('timedGameModeModal').close();

    let nextWordContainer = document.getElementById('nextWordContainer');
    let timeUpContainer = document.getElementById('timeUpContainer');
    let guessField = document.getElementById('timedModeGuessField');
    let guessButton = document.getElementById("timedModeGuessButton");
    let playAgainButton = document.getElementById("timedModePlayAgainButton");

    // Hide the following elements.
    timeUpContainer.style.display = 'none';
    playAgainButton.style.display = "none";
    // Show the following elements.
    nextWordContainer.style.display = "inline";
    guessField.style.display = 'inline';
    guessButton.style.display = 'inline';
}

/**
 * Component that hanldes the creation of the text field that will ask the user what word is being guessed,
 * the input field for the user to guess, the button that trigger the validation of the users guess.
 * @returns 
 */
function TimedGuessWord() {
    // Instantiate the words state and set it to "loading" until it gets updated.
    const [words, setWords] = useState("loading")
    // Instantiate the score state and set it to 0.
    const [score, setScore] = useState(0)
    // Instantiate the lives state and set it to 2.
    const [bestScore, setBestScore] = useState(2)
    // Instantiate the index state and set it to 0.
    const [index, setIndex] = useState(0)
    // Instantiate the current word state and set it to the first word 
    const [currentWord, setCurrentWord] = useState(words[0])

    // Functions that will increment a state using the previous state.
    function incrementScore() {
        setScore(prevCount =>  prevCount + 1)
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
    words to use for the new game, reset the board, reset the state of the values to their original state, and restart the timer.
    */
    async function playAgain() {
        fetchWords();
        playAgainReset()
    
        setIndex(0)
        setScore(0)

        const time = new Date();
        time.setSeconds(time.getSeconds() + 60);
        restart(time)
    }

    /*
     Conditional useEffect. When the 'index' state is updated, if there are still words in the 'words' we got back from the server,
     update the state of the 'currentWord' using the new value of index, and clear the guess field.
     */
    useEffect(() => {

        if (index < words.length) {
            let guessField = document.getElementById('timedModeGuessField');

            setCurrentWord(words[index])
            guessField.value = '';
        }

    }, [index, words.length, words])

    /*
     Function that will be called when the timer is up. This will check the state of 'score' and 'bestScore'. If the 
     score is greater than the best score, then celebrate and show the 'timedGameModeModal' modal. If the score is not
     greater than the best score hide the 'nextWordContainer' container, 'timedModeGuessField' field, 'timedModeGuessButton' field,
     and show the 'timeUpContainer' container, and 'timedModePlayAgainButton' button.
     */
    function updateScore() {
        if (score > bestScore) {
          confetti();
          setBestScore(score);
          document.getElementById('timedGameModeModal').showModal();
        } else {
          let nextWordContainer = document.getElementById('nextWordContainer');
          let timeUpContainer = document.getElementById('timeUpContainer');
          let guessField = document.getElementById('timedModeGuessField');
          let guessButton = document.getElementById("timedModeGuessButton");
          let playAgainButton = document.getElementById("timedModePlayAgainButton");
    
          // Hide the following elements.
          nextWordContainer.style.display = "none";
          guessField.style.display = 'none';
          guessButton.style.display = 'none';
          // Show the following elements.
          timeUpContainer.style.display = 'inline';
          playAgainButton.style.display = "inline";
        }
    }

    // Instantiate the first timer.
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);

    // Instantiate the constants used for the 'useTimer'.
    const {
        seconds,
        minutes,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => updateScore() });

    const formatTime = (time) => {
        return String(time).padStart(2, '0')
    }

    /*
     Function that will determine if the users guess was correct or not.
     */
    async function determineInput(e) {
        // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
        e.preventDefault();

        let guessField = document.getElementById('timedModeGuessField');
        const userGuess = guessField.value.toLowerCase().trim();
        
        // Check that the users guess is Alphanumeric
        if(isAlphanumeric(userGuess)) {
            // Check if the users guess is correct. If so, increment the score.
            if (userGuess === currentWord.english.toLowerCase()) {
                confetti();
                incrementScore();
            }

            // Always increment the index.
            incrementIndex();
        }
    }

  return (
    <div>

        {/* Player information, such as thier user avatar, username, score, and best score. */}
        <div>
            <main>
                {/* The users information. Users avatar, username, lives and score count. */}
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-sm ">
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-32 h-32 mt-8 rounded-full shadow-lg" alt="" src={user}></img>
                            <h5 className="mb-0 mt-4 text-xl font-medium dark:text-black">pollo.io</h5>

                            {/* The count down timer. */}
                            <div style={{textAlign: 'center'}}>
                                <div style={{fontSize: '30px'}}>
                                    <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
                                </div>
                            </div>

                            <div className="flex mt-2">
                                <p id="timedModeScore" className="inline-flex items-center px-4 py-2 text-m font-medium text-center dark:text-black">Score: { score }</p>
                                <p id="timedModeBestScore" className="inline-flex items-center px-4 py-2 text-m font-medium text-center dark:text-black">Best score: { bestScore }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        {/* 
            Container that contains two heading containers. 
            The first container, 'nextWordContainer', is asking the user the word to guess, which will show during the game.
            The second container, 'timeUpContainer', contains the time up message the user will see at the end of the game if they lose.
        */}
        <div className="flex justify-center" >
            <h2 id="nextWordContainer" className="w-1/4 flex justify-center text-center" style={{ display: 'inline' }}>
                ¿Cómo Se Dice&nbsp;<p id="currentWord" className="font-bold" style={{ display: 'inline'}}>{currentWord.spanish}({currentWord.type})?</p>
            </h2>
            <h2 id="timeUpContainer" className="w-1/4 flex justify-center text-center" style={{ display: 'none' }}>Time up!</h2>
        </div>

        {/* Modal that the user will see if they get a new highscore. */}
        <HighScoreModal
            bestScore={bestScore}
            playAgain={playAgain}
        />

        {/* 
            This form is what allows the usage of the 'enter' key when the user wants to submit their input/guess to be verified. 
            For some reason the 'onkeydown', 'onkeyup' and other variations of binding does not work. 
        */}
        <form onSubmit={determineInput}>
            {/* Input field for the users guess. */}
            <div className="flex justify-center">
                <input autoComplete="one-time-code" type="text" id="timedModeGuessField" className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96 "></input>
            </div>
            
            {/* Buttons that handle the submittion of the users guess. */}
            <div className="flex justify-center">
                <button style={{ display: 'inline' }} onClick={determineInput} id="timedModeGuessButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-4">Guess</button>
                <button style={{ display: 'none' }} onClick={() => playAgain()} id="timedModePlayAgainButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Play again</button>
            </div>
        </form>
    </div>
  )
}

export default TimedGuessWord