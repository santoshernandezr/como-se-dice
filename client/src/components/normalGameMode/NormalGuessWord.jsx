import React, { useEffect, useState } from 'react'
import { isAlphanumeric } from '../common/HelperFunctions.ts';
import PlayerInfo from './PlayerInfo';
import confetti from "canvas-confetti"

/**
 * Component that handles the creation of the text field that will ask the user what word is being guessed,
 * the input field for the user to guess, and the button that triggers the validation of the users guess.
 * 
 * @returns Component that handles the users guess.
 */
function GuessWord() {
    // Instantiate the words states.
    // Words will contain the words used during the game and the current word will hold the current word the user needs to guess.
    const [words, setWords] = useState("loading")
    const [currentWord, setCurrentWord] = useState(words[0])

    // Instantiate the users states. Their guess, score, lives, and index.
    const [userGuess, setUserGuess] = useState("")
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [index, setIndex] = useState(0)

    // Instantiate the components states.
    // Each component that can be shown or hidden depending if the user wins or loses.
    const [nextWordContainer, setNextWordContainer] = useState(true);
    const [guessField, setGuessField] = useState(true);
    const [guessButton, setGuessButton] = useState(true);

    const [decidingContainer, setDecidingContainer] = useState(false);
    const [playAgainButton, setPlayAgainButton] = useState(false);

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
        setNextWordContainer(true);
        setGuessField(true);
        setGuessButton(true);
        
        setDecidingContainer(false);
        setPlayAgainButton(false);
        document.getElementById('guessField').value = '';

        setIndex(0);
        setLives(3);
        setScore(0);
    }

    /*
     Conditional useEffect. When the 'index' state is updated, if there are still words in the 'words' we got back from the server,
     update the state of the 'currentWord' using the new value of index, and clear the guess field.
     */
    useEffect(() => {

    if (index < words.length) {
        setCurrentWord(words[index])
        document.getElementById('guessField').value = '';
    }

    }, [index, words.length, words])

    /*
     Conditional useEffect. When the 'score' or 'lives' state is updated, if the score is 10 or if the user
     ran out of lives, update the 'nextWordContianer', 'guessField', and 'guessButton' to 'false', and 'decidingContainer'
     and 'playAgainButton' state to 'true'.
     */
    useEffect(() => {

    if (score == 10 || lives == 0) {
        setNextWordContainer(false);
        setGuessField(false);
        setGuessButton(false);
        
        setDecidingContainer(true);
        setPlayAgainButton(true);
    }

    }, [score, lives])

    /*
     Function that will determine if the users guess was correct or not.
     */
    async function determineInput(e) {
        // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
        e.preventDefault();

        // Check that the users guess is Alphanumeric
        if(isAlphanumeric(userGuess)) {
            // Check if the users guess is correct. If so, increment the score and the index.
            if (userGuess.toLowerCase() === currentWord.english.toLowerCase()) {
                confetti();
                incrementScore();
                incrementIndex();
            } else { // If they users guess is incorrect, decrement the lives and increment the index.
                decrementLives();
                incrementIndex();
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
            <h2 id="nextWordContainer" className="w-1/4 flex justify-center text-center" style={{ display: nextWordContainer ? 'inline': 'none' }}>
                ¿Cómo Se Dice&nbsp;<p className="font-bold" >{currentWord.spanish}({currentWord.type})?</p>
            </h2>
            <h2 id="decidingContainer" className="w-1/4 flex justify-center text-center" style={{ display: decidingContainer ? 'inline': 'none' }}>
                {score == 10 ? "You win!" : "You ran out of lives, try again."}
            </h2>
        </div>

        {/* 
            This form is what allows the usage of the 'enter' key when the user wants to submit their input/guess to be verified. 
            For some reason the 'onkeydown', 'onkeyup' and other variations of binding does not work. 
        */}
        <form onSubmit={determineInput}>
            {/* Input field for the users guess. */}
            <div className="flex justify-center">
                <input style={{ display: guessField ? 'inline': 'none' }} onChange={(e) => setUserGuess(e.target.value)} autoComplete="one-time-code" type="text" id="guessField" className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96 "></input>
            </div>
            
            {/* 
                Container that contains two buttons.
                First button is the guessButton which the user can press to guess the word, which will be shown during the game.
                Second button is the playAgainButton which is the button that the user will press if they want to play again, which will be shown at the end of the game.
            */}
            <div className="flex justify-center">
                <button style={{ display: guessButton ?'inline': 'none' }} onClick={determineInput} id="guessButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-4">Guess</button>
                
                <button style={{ display: playAgainButton ? 'inline' : 'none' }} onClick={() => {playAgain()}} id="playAgainButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Play again</button>
            </div>
            
        </form>
    </div>
  )
}

export default GuessWord