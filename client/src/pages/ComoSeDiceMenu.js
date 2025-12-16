import "../css/App.css";
import SinglePlayer from "../components/cards/SinglePlayerCard.jsx";
import DailyChallenge from "../components/cards/DailyChallengeCard.jsx";
import ComingSoonCard from "../components/cards/ComingSoonCard.jsx";
import Footer from "../components/common/Footer";

/**
 * Como se dice menu page.
 *
 * Contains the different game modes that are offered. Single player, Daily challenge, and Multiplayer.
 *
 * @returns Como se dice menu page.
 */
function ComoSeDiceMenu() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-start justify-center px-4 py-8 mt-4 sm:mt-8 md:mt-12">
        <div className="w-full max-w-7xl">
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
            <SinglePlayer
              title="Start Singleplayer"
              body="Play cómo se dice alone"
            />

            <ComingSoonCard
              title="Multiplayer"
              body="Start a room to play against friends!"
            />

            <DailyChallenge
              destination="/comosedice/dailychallenge"
              title="Start Daily Challenge"
              body="Get as many words right in the shortest time and see where you stack up against the world 🌐!"
            />

            <ComingSoonCard
              title="Join Multiplayer Room"
              body="Room code"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ComoSeDiceMenu;
