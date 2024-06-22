import confetti from "canvas-confetti"
import Words from '../jsonData/words.json'

/**
 * Updates the container that holds the word to be guessed and clears the guess field so the user can guess again.
 * 
 * @param { number } index 
 * @param { innerHTML } container in which the message will be set.
 * @param { InputHTMLAttributes } guessField HTML input attribute.
 * @param { List } words object containing all words available.
 */
function updateWord(index, container, guessField, words) {
    container.innerHTML = "Cómo Se Dice &nbsp;"  + words[index].spanish.bold() + "&nbsp; (" + words[index].type.italics() + ")?";
    guessField.value = '';
}

function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Component that hanldes the creation of the text field that will ask the user what word is being guessed,
 * the input field for the user to guess, the button that trigger the validation of the users guess.
 * @returns 
 */
function TimedGuessWord() {

    // words already come randomized so we can start with the first index. i.e. 0
    let currentWordIndex = 0;

    let correctNumberOfGuesses = 0;

    const determineInput = (e) => {
        // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
        e.preventDefault();

        let nextWordContainer = document.getElementById('nextWordContainer');
        let guessField = document.getElementById('timedModeGuessField');
        let scoreID = document.getElementById("timedModeScore");

        const userGuess = guessField.value.toLowerCase().trim();
        const currentWord = Words[currentWordIndex];
        
        if(isAlphanumeric(userGuess)) {
            /* 
            The user got the correct answer, that means that there will be confetti, the background will turn green, 'correctNumberOfGuesses'
            and 'currentWordIndex' will be incremented by one. The score will be updated as well.
            */
            if (userGuess === currentWord.english.toLowerCase()) {
                confetti();
                
                correctNumberOfGuesses++

                scoreID.innerHTML = "Score: " + correctNumberOfGuesses.toString();
            }

            if (currentWordIndex < Words.length) {
                currentWordIndex++;
                updateWord(currentWordIndex, nextWordContainer, guessField, Words);
            }
        }
    }

  return (
    <div>

        {/* Asking the user the word to guess. */}
        <div className="flex justify-center" >
            <h2 id="nextWordContainer" className="w-1/4 flex justify-center">
                ¿Cómo Se Dice &nbsp; <b>{Words[0].spanish}</b>(<i>{Words[0].type}</i>)?
            </h2>
        </div>

        {/* 
            Dialog that will show up at the end of the game if the user got a new high score. It will inform the user
            that they got a new high score.
        */}
        <dialog id="timedGameModeModal" className="rounded-lg max-w-lg border modal fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-fit">
            <div className="modal-box max-h-full max-w-full">

                <div className="max-w-l p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New high score</h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">pollo.io</p>
                    <p id="userOficialHighScore" className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>

                    <div className="justify-center items-center flex space-x-28">
                        <a href="/comosedice" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Home
                        </a>
                        <a href="/timedgamemode" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Play again
                        </a>
                    </div>
                    
                </div>

            </div>
        </dialog>

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
                <button style={{ display: 'none' }} onClick={() => window.location.reload(false)} id="timedModePlayAgainButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Play again</button>
            </div>
        </form>
    </div>
  )
}

export default TimedGuessWord