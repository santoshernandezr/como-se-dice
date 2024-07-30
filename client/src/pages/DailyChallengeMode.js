import "../css/App.css";
import DailyChallengeGame from "../components/dailyChallenge/DailyChallengeGame.jsx";
import DailyChallengeComplete from "../components/dailyChallenge/DailyChallengeComplete.jsx";
import UserContext from "./UserContext";
import { useEffect, useState, useContext } from "react";

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

  // Instantiate the userData state where we'll store the
  const [userData, setUserData] = useState();
  const [completed, setCompleted] = useState();

  useEffect(() => {
    async function fetchUser() {
      const result = await fetch("/dailyMode/getUser/" + user.username);
      const body = await result.json();
      setUserData(body);
      setCompleted(body.dailyChallengeMode.dailyChallengeCompleted);
    }

    fetchUser();
  }, []);

  return completed ? (
    <DailyChallengeComplete userData={userData}></DailyChallengeComplete>
  ) : (
    <DailyChallengeGame></DailyChallengeGame>
  );
}

export default DailyChallengeMode;
