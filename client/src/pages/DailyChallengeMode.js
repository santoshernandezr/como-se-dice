import "../css/App.css";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { useStopwatch } from "react-timer-hook";
import { isAlphanumeric } from "../typescript/HelperFunctions.ts";
import DailyChallengeModal from "../components/modals/DailyChallengeModal.jsx";
import confetti from "canvas-confetti";
import userPicture from "../images/user.png";
import UserContext from "./UserContext";

/**
 * Daily challenge page.
 *
 * Contains the page that will be shown to the user when they choose the daily challenge.
 *
 * @returns Daily challenge page.
 */
function DailyChallengeMode() {
  // Getting the user context.
  const { user } = useContext(UserContext);

  // Instantiate the words states.
  // Daily words will contain the words used during the game and the current word will hold the current word the user needs to guess.
  const [dailyWords, setDailyWords] = useState("loading");
  const [currentWord, setCurrentWord] = useState(dailyWords[0]);

  // Instantiate the users states. Their guess, score, best score, and index.
  const [userGuess, setUserGuess] = useState("");
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(0);

  // Asyn method that calls server to get random words for the game.
  async function fetchWords() {
    const result = await fetch("/words/dailyChallengeWords");
    const body = await result.json();
    setDailyWords(body);
  }

  // Async method that will be called when the react component first renders and will only render ONCE, due to the empty [].
  useEffect(() => {
    fetchWords();
  }, []);

  // Instantiate the constants used for the 'useStopwatch'.
  const { seconds, minutes, pause } = useStopwatch({ autoStart: true });

  /*
    Conditional useEffect. When the 'index' state is updated, if there are still words in the 'words' we got back from the server,
    update the state of the 'currentWord' using the new value of index, and clear the guess field. Else, pause the stopwatch,
    set the time state to the stopwatch time, and show the modal with the users score and time.
    */
  useEffect(() => {
    if (index < dailyWords.length) {
      setCurrentWord(dailyWords[index]);
      document.getElementById("dailyModeGuessField").value = "";
    } else {
      pause();
      let stopWatchTime = document.getElementById("stopTime").textContent;
      setTime(stopWatchTime);
      document.getElementById("dailyChallengeModal").showModal();
    }
  }, [index, dailyWords.length, dailyWords]);

  /*
    Function that will determine if the users guess was correct or not.
    */
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
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm ">
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-32 h-32 mt-8 rounded-full shadow-lg"
                  alt=""
                  src={userPicture}
                ></img>
                <h5 className="mb-0 mt-4 text-xl font-medium dark:text-black">
                  {user.username}
                </h5>

                {/* The count down timer. */}
                <div style={{ textAlign: "center" }}>
                  <div id="stopTime" style={{ fontSize: "30px" }}>
                    <span>{String(minutes).padStart(2, "0")}</span>:
                    <span>{String(seconds).padStart(2, "0")}</span>
                  </div>
                </div>

                <div className="flex mt-2">
                  <p
                    id="dailyModeScore"
                    className="inline-flex items-center px-4 py-2 text-m font-medium text-center dark:text-black"
                  >
                    Score: {score}/10
                  </p>
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
      <div className="flex justify-center">
        <h2
          id="nextWordContainer"
          className="w-1/4 flex justify-center text-center"
          style={{ display: "inline" }}
        >
          ¿Cómo Se Dice&nbsp;
          <p
            id="currentWord"
            className="font-bold"
            style={{ display: "inline" }}
          >
            {currentWord.spanish}({currentWord.type})?
          </p>
        </h2>
      </div>

      {/* Modal that will appear once the user completes the daily challenge. */}
      <DailyChallengeModal score={score} time={time} />

      {/* 
        This form is what allows the usage of the 'enter' key when the user wants to submit their input/guess to be verified. 
        For some reason the 'onkeydown', 'onkeyup' and other variations of binding does not work. 
        */}
      <form onSubmit={determineInput}>
        {/* Input field for the users guess. */}
        <div className="flex justify-center">
          <input
            onChange={(e) => setUserGuess(e.target.value)}
            autoComplete="one-time-code"
            type="text"
            id="dailyModeGuessField"
            className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96 "
          ></input>
        </div>

        {/* Buttons that handle the submittion of the users guess. */}
        <div className="flex justify-center">
          <button
            style={{ display: "inline" }}
            onClick={determineInput}
            id="dailyModeGuessButton"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-4"
          >
            Guess
          </button>
        </div>
      </form>
    </div>
  );
}

export default DailyChallengeMode;
