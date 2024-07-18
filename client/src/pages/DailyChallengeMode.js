import "../css/App.css";
import DailyChallengeGame from "../components/dailyChallenge/DailyChallengeGame.jsx";
import DailyChallengeComplete from "../components/dailyChallenge/DailyChallengeComplete.jsx";

/**
 * Daily challenge page.
 *
 * Contains the page that will be shown to the user when they choose the daily challenge.
 *
 * @returns Daily challenge page.
 */
function DailyChallengeMode() {
  return true ? (
    <DailyChallengeComplete></DailyChallengeComplete>
  ) : (
    <DailyChallengeGame></DailyChallengeGame>
  );
}

export default DailyChallengeMode;
