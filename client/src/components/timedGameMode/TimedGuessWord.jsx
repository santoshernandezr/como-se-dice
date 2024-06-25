import React, { useEffect, useState } from 'react'
import { useTimer } from "react-timer-hook";
import Mario from '../../images/mario.png'
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

function playAgainReset() {
    document.getElementById('timedGameModeModal').close();

    let nextWordContainer = document.getElementById('nextWordContainer');
    let timeUpContainer = document.getElementById('timeUpContainer');
    let guessField = document.getElementById('timedModeGuessField');
    let guessButton = document.getElementById("timedModeGuessButton");
    let playAgainButton = document.getElementById("timedModePlayAgainButton");

    nextWordContainer.style.display = "inline";
    guessField.style.display = 'inline';
    guessButton.style.display = 'inline';
    timeUpContainer.style.display = 'none';
    playAgainButton.style.display = "none";
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
    // Instantiate the lives state and set it to 3.
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
        console.log("Calling from timed mode")
        const result = await fetch("/api/getWords");
        const body = await result.json();
        setWords(body);
    }

    // Async method that will be called when the react component first renders and will only render ONCE, due to the empty [].
    useEffect(() => {
        fetchWords()
    }, [])

    async function playAgain() {
        fetchWords();
        playAgainReset()
    
        setIndex(0)
        setScore(0)
        const time = new Date();
        time.setSeconds(time.getSeconds() + 20);
        restart(time)
    }


    useEffect(() => {

    if (index < words.length) {
        console.log("updating word when index changes")
        let guessField = document.getElementById('timedModeGuessField');

        setCurrentWord(words[index])
        guessField.value = '';
    }

    }, [index, words.length, words])

    function refactoredUpdateScore() {
        console.log("In the refactored update score method");
        console.log("Score: " + score + " Best Score: " + bestScore);
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
    
          nextWordContainer.style.display = "none";
          guessField.style.display = 'none';
          guessButton.style.display = 'none';
          timeUpContainer.style.display = 'inline';
          playAgainButton.style.display = "inline";
        }
    }

    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 20);

    const {
        seconds,
        minutes,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => refactoredUpdateScore() });

    const formatTime = (time) => {
        return String(time).padStart(2, '0')
    }

    async function determineInput(e) {
        // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
        e.preventDefault();
        let guessField = document.getElementById('timedModeGuessField');

        const userGuess = guessField.value.toLowerCase().trim();
        // const currentWord = Words[currentWordIndex];
        
        if(isAlphanumeric(userGuess)) {
            /* 
            The user got the correct answer, that means that there will be confetti, the background will turn green, 'correctNumberOfGuesses'
            and 'currentWordIndex' will be incremented by one. The score will be updated as well.
            */
            if (userGuess === currentWord.english.toLowerCase()) {
                confetti();
                incrementScore();
            }

            incrementIndex();
        }
    }

  return (
    <div>

        {/* Player information, passing in the score and lives states. */}
        <div>
            <main>
                {/* The users information. Users avatar, username, lives and score count. */}
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-sm ">
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-32 h-32 mt-8 rounded-full shadow-lg" alt="" src={ Mario }></img>
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

        {/* Asking the user the word to guess. */}
        <div className="flex justify-center" >
            <h2 id="nextWordContainer" className="w-1/4 flex justify-center text-center" style={{ display: 'inline' }}>
                ¿Cómo Se Dice&nbsp;<p id="currentWord" className="font-bold" style={{ display: 'inline'}}>{currentWord.spanish}({currentWord.type})?</p>
            </h2>
            <h2 id="timeUpContainer" className="w-1/4 flex justify-center text-center" style={{ display: 'none' }}>Time up!</h2>
        </div>

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
                {/* <button style={{ display: 'none' }} onClick={() => playAgain()} id="timedModePlayAgainButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Play again</button> */}
                <button style={{ display: 'none' }} onClick={() => playAgain()} id="timedModePlayAgainButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Play again</button>
            </div>
        </form>
    </div>
  )
}

export default TimedGuessWord