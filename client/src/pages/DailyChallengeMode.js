import "../css/App.css";
import DailyChallengeGame from "../components/dailyChallenge/DailyChallengeGame.jsx";
import DailyChallengeComplete from "../components/dailyChallenge/DailyChallengeComplete.jsx";
import UserContext from "./UserContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

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

  /*
   Instantiate the history and completed state where we'll store the history and the boolean
   that indicates whether the user has completed the daily challenge of the day.
   */
  const [history, setHistory] = useState();
  const [completed, setCompleted] = useState();

  /*
   useEffect that will ONLY render ONCE and will get the users daily challenge information, their daily
   challenge history and the boolean indicating whether they have completed the daily challenge of the day.
   */
  useEffect(() => {
    axios
      .get("/dailyMode/getUserDailyInfo/" + user.username)
      .then((response) => {
        setHistory(response.data.history);
        setCompleted(response.data.completed);
      });
  }, []);

  /*
   Check if the user completed the daily challenge. If they have, render the 'DailyChallengeComplete' component
   otherwise render the 'DailyChallengeGame' component.
   */
  return completed ? (
    <DailyChallengeComplete userHistory={history}></DailyChallengeComplete>
  ) : (
    <DailyChallengeGame></DailyChallengeGame>
  );
}

export default DailyChallengeMode;
