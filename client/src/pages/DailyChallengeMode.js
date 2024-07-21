import "../css/App.css";
import DailyChallengeGame from "../components/dailyChallenge/DailyChallengeGame.jsx";
import DailyChallengeComplete from "../components/dailyChallenge/DailyChallengeComplete.jsx";
import { useEffect, useState } from "react";

/**
 * Daily challenge page.
 *
 * Contains the page that will be shown to the user when they choose the daily challenge.
 *
 * @returns Daily challenge page.
 */
function DailyChallengeMode() {
  const [user, setUser] = useState();
  const [completed, setCompleted] = useState();
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const result = await fetch("/dailyMode/getUser/pollo");
      const body = await result.json();
      setUser(body);
      setCompleted(body.dailyChallengeMode.dailyChallengeCompleted);
      setUsername(body.username);
    }

    fetchUser();
  }, []);

  return completed ? (
    <DailyChallengeComplete userData={user}></DailyChallengeComplete>
  ) : (
    <DailyChallengeGame userData={username}></DailyChallengeGame>
  );
}

export default DailyChallengeMode;
