import "../css/App.css";
import React, { useEffect, useState, useContext } from "react";
import { useTimer } from "react-timer-hook";
import { isAlphanumeric } from "../typescript/HelperFunctions.ts";
import HighScoreModal from "../components/modals/HighScoreModal.jsx";
import confetti from "canvas-confetti";
import UserContext from "./UserContext";
import axios from "axios";

/**
 * Timed game mode page. This page will consist of the navigation bar, the users information, so their
 * avatar image, score and best score, the word they have to guess, the 1 minute count down timer, and
 * a text box in which they can input their guess.
 *
 * @returns Timed game mode page.
 */
function TimedGameMode() {
  const { user, updateTimedModeBestScore } = useContext(UserContext);

  // Instantiate the words states.
  // Words will contain the words used during the game and the current word will hold the current word the user needs to guess.
  const [words, setWords] = useState("loading");
  const [currentWord, setCurrentWord] = useState(words[0]);

  // Instantiate the users states. Their guess, score, and index.
  const [userGuess, setUserGuess] = useState("");
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  /* 
     Instantiate two states, 'gameContainers' and 'decideGameContainers'.
     - 'gameContainers' will be the state of the game containers. These are the containers that will be shown when the user is playing the games. Such as
       'nextWordContainer', 'guessField', and 'guessButton'.
     - 'decideGameContainers' will be the state of the deciding game containers. These are the containers that will be shown when the user is done playing
       the game. Such as 'timeUpContainer' and 'playAgainButton'.
    */
  const [gameContainers, setGameContainers] = useState(true);
  const [decideGameContainers, setDecideGameContainers] = useState(false);

  // Asyn method that calls server to get random words for the game.
  async function fetchWords() {
    axios.get("/words/normalGameWords").then((response) => {
      setWords(response.data);
    });
  }

  // Async method that will be called when the react component first renders and will only render ONCE, due to the empty [].
  useEffect(() => {
    fetchWords();
  }, []);

  /* 
     Async function that will be called when the user clicks the 'play again' button. Will call the server to get a new set of 
     words to use for the new game, reset the board, reset the state of the values to their original state, and restart the timer.
     */
  async function playAgain() {
    // Fetch new words for new game.
    fetchWords();

    // Close the modal that shows the user their new highscore.
    document.getElementById("timedGameModeModal").close();

    // Reset the containers. Show the game and hide the deciding containers.
    setGameContainers(true);
    setDecideGameContainers(false);

    // Reset the game to start at the first word of the new words fetched and set the score to 0.
    setIndex(0);
    setScore(0);

    // Reset the timer to 60 seconds.
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60);
    restart(time);
  }

  /*
     Conditional useEffect. When the 'index' state is updated, if there are still words in the 'words' we got back from the server,
     update the state of the 'currentWord' using the new value of index, and clear the guess field.
     */
  useEffect(() => {
    if (index < words.length) {
      setCurrentWord(words[index]);
      document.getElementById("timedModeGuessField").value = "";
    }
  }, [index, words.length, words]);

  /*
     Function that will be called when the timer is up. This will check the state of 'score' and 'bestScore'. If the 
     score is greater than the best score, then celebrate and show the 'timedGameModeModal' modal. If the score is not
     greater than the best score hide then hide the game containers and show the decide game containers.
     */
  function updateScore() {
    if (score > user.timedGameMode.bestScore) {
      confetti();

      axios.put("/timedMode/updateBestScore/" + user.username, {
        score: score,
      });

      updateTimedModeBestScore(score);

      document.getElementById("timedGameModeModal").showModal();
    } else {
      setGameContainers(false);
      setDecideGameContainers(true);
    }
  }

  // Instantiate the first timer.
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);

  // Instantiate the constants used for the 'useTimer'.
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => updateScore(),
  });

  // Function that will determine if the users guess was correct or not.
  async function determineInput(e) {
    // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
    e.preventDefault();

    // Check that the users guess is Alphanumeric
    if (isAlphanumeric(userGuess)) {
      // Check if the users guess is correct. If so, increment the score.
      if (userGuess.toLowerCase() === currentWord.english.toLowerCase()) {
        confetti();
        setScore((prevCount) => prevCount + 1);
      }

      // Always increment the index.
      setIndex((prevCount) => prevCount + 1);
    }
  }
  return (
    <div className="h-full">
      {/* Player information, such as thier user avatar, username, score, and best score. */}
      <div>
        <main>
          {/* The users information. Users avatar, username, lives and score count. */}
          <div className="mt-8 flex flex-col items-center">
            <div className="w-full max-w-sm ">
              <div className="flex flex-col items-center pb-4">
                <img
                  className="w-32 h-32 mt-8 rounded-full shadow-lg"
                  alt=""
                  src={user.profilePicture}
                ></img>
                <h5 className="mb-0 mt-4 text-xl font-medium dark:text-black">
                  {user.username}
                </h5>

                {/* The count down timer. */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "30px" }}>
                    <span>{String(minutes).padStart(2, "0")}</span>:
                    <span>{String(seconds).padStart(2, "0")}</span>
                  </div>
                </div>

                <div className="flex mt-2">
                  <p
                    id="timedModeScore"
                    className="inline-flex items-center px-4 py-2 text-m font-medium text-center dark:text-black"
                  >
                    Score: {score}
                  </p>
                  <p
                    id="timedModeBestScore"
                    className="inline-flex items-center px-4 py-2 text-m font-medium text-center dark:text-black"
                  >
                    Best score: {user.timedGameMode.bestScore}
                  </p>
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
      <div className="flex justify-center">
        <h2
          id="nextWordContainer"
          className="w-1/4 flex justify-center text-center"
          style={{ display: gameContainers ? "inline" : "none" }}
        >
          ¿Cómo Se Dice&nbsp;
          <p className="font-bold">
            {currentWord.spanish}({currentWord.type})?
          </p>
        </h2>
        <h2
          id="timeUpContainer"
          className="w-1/4 flex justify-center text-center"
          style={{ display: decideGameContainers ? "inline" : "none" }}
        >
          Time up!
        </h2>
      </div>

      {/* Modal that the user will see if they get a new highscore. */}
      <HighScoreModal
        bestScore={user.timedGameMode.bestScore}
        playAgain={playAgain}
      />

      {/* 
        This form is what allows the usage of the 'enter' key when the user wants to submit their input/guess to be verified. 
        For some reason the 'onkeydown', 'onkeyup' and other variations of binding does not work. 
        */}
      <form onSubmit={determineInput}>
        {/* Input field for the users guess. */}
        <div className="flex justify-center">
          <input
            style={{ display: gameContainers ? "inline" : "none" }}
            onChange={(e) => setUserGuess(e.target.value)}
            autoComplete="one-time-code"
            type="text"
            id="timedModeGuessField"
            className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96 "
          ></input>
        </div>

        {/* Buttons that handle the submittion of the users guess. */}
        <div className="flex justify-center">
          <button
            style={{ display: gameContainers ? "inline" : "none" }}
            onClick={determineInput}
            id="timedModeGuessButton"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-4"
          >
            Guess
          </button>
          <button
            style={{ display: decideGameContainers ? "inline" : "none" }}
            onClick={() => playAgain()}
            id="timedModePlayAgainButton"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Play again
          </button>
        </div>
      </form>
    </div>
  );
}

export default TimedGameMode;
