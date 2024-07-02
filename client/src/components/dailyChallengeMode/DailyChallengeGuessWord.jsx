import React from 'react'
import { useEffect, useState } from 'react';
import user from '../../images/user.png'
import confetti from "canvas-confetti"
import DailyChallengeModal from './DailyChallengeModal';
import { useStopwatch } from 'react-timer-hook';


/**
 * Validate strings are alphanumeric.
 * 
 * @param { String } string which is being validated.
 * @returns true or false whether or not the string is alphanumeric.
 */
function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

function DailyChallengeGuessWord() {
    // Instantiate the words state and set it to "loading" until it gets updated.
    const [dailyWords, setDailyWords] = useState("loading");
    // Instantiate the score state and set it to 0.
    const [score, setScore] = useState(0);
    // Instantiate the index state and set it to 0.
    const [index, setIndex] = useState(0);
    // Instantiate the current word state and set it to the first word 
    const [currentWord, setCurrentWord] = useState(dailyWords[0]);
    const [time, setTime] = useState(0);

    // Functions that will increment a state using the previous state.
    function incrementScore() {
        setScore(prevCount =>  prevCount + 1)
    }
    function incrementIndex() {
        setIndex(prevCount => prevCount + 1)
    }

    // Asyn method that calls server to get random words for the game.
    async function fetchWords() {
        const result = await fetch("/api/dailyChallengeWords");
        const body = await result.json();
        setDailyWords(body);
    }

    // Async method that will be called when the react component first renders and will only render ONCE, due to the empty [].
    useEffect(() => {
        fetchWords()
    }, [])

    // Instantiate the constants used for the 'useStopwatch'.
    const {
        seconds,
        minutes,
        pause,
    } = useStopwatch({ autoStart: true});

    const formatTime = (time) => {
        return String(time).padStart(2, '0')
    }

    /*
     Conditional useEffect. When the 'index' state is updated, if there are still words in the 'words' we got back from the server,
     update the state of the 'currentWord' using the new value of index, and clear the guess field. Else, pause the stopwatch,
     set the time state to the stopwatch time, and show the modal with the users score and time.
     */
     useEffect(() => {

        if (index < dailyWords.length) {
            let guessField = document.getElementById('dailyModeGuessField');
    
            setCurrentWord(dailyWords[index])
            guessField.value = '';
        } else {
            pause();
            let stopWatchTime = document.getElementById("stopTime").textContent;
            setTime(stopWatchTime)
            document.getElementById('dailyChallengeModal').showModal();
        }
    
    }, [index, dailyWords.length, dailyWords])

    /*
     Function that will determine if the users guess was correct or not.
     */
     async function determineInput(e) {
        // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
        e.preventDefault();

        let guessField = document.getElementById('dailyModeGuessField');
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
                                <div id="stopTime" style={{fontSize: '30px'}}>
                                    <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
                                </div>
                            </div>

                            <div className="flex mt-2">
                                <p id="dailyModeScore" className="inline-flex items-center px-4 py-2 text-m font-medium text-center dark:text-black">Score: {score}/10</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        {/* 
            Container that contains heading containers. 
            The first container, 'nextWordContainer', is asking the user the word to guess, which will show during the game.
        */}
        <div className="flex justify-center" >
            <h2 id="nextWordContainer" className="w-1/4 flex justify-center text-center" style={{ display: 'inline' }}>
                ¿Cómo Se Dice&nbsp;<p id="currentWord" className="font-bold" style={{ display: 'inline'}}>{currentWord.spanish}({currentWord.type})?</p>
            </h2>
        </div>

        {/* Modal that will appear once the user completes the daily challenge. */}
        <DailyChallengeModal 
            score={score}
            time={time}
        />

        {/* 
            This form is what allows the usage of the 'enter' key when the user wants to submit their input/guess to be verified. 
            For some reason the 'onkeydown', 'onkeyup' and other variations of binding does not work. 
        */}
        <form onSubmit={determineInput}>
            {/* Input field for the users guess. */}
            <div className="flex justify-center">
                <input autoComplete="one-time-code" type="text" id="dailyModeGuessField" className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96 "></input>
            </div>
            
            {/* Buttons that handle the submittion of the users guess. */}
            <div className="flex justify-center">
                <button style={{ display: 'inline' }} onClick={determineInput} id="dailyModeGuessButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-4">Guess</button>
            </div>
        </form>
        
    </div>
  )
}

export default DailyChallengeGuessWord