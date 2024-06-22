import '../css/App.css';
import HomeNavigationBar from '../components/NavigationBar.jsx'
import SinglePlayer from '../components/SinglePlayerCard.jsx'
import DailyChallenge from '../components/DailyChallengeCard.jsx'
import Footer from '../components/Footer.jsx';

/**
 * Como se dice menu page.
 * 
 * Contains the different game modes that are offered. Single player, Daily challenge, and Multiplayer.
 * 
 * @returns Como se dice menu page.
 */
function ComoSeDiceMenu() {
  return (
    <div className='h-full'>

      {/* Navigatin bar */}
      <HomeNavigationBar />

      {/* All four game modes. */}
      <div className='flex justify-center h-[70vh]'>
        <div className='content-center w-3/5'>
          <div className='grid gap-8 grid-cols-2'>
            
              <SinglePlayer title="Start Singleplayer" body="Play cómo se dice alone" />
            
              <DailyChallenge destination="placeHolderForWhenMultiplayerPageIsCreated" title="Multiplayer" body="Start a room to play against friends!" />
            
              <DailyChallenge destination="placeHolderForWhenDailyChallengePageIsCreated"  title="Start Daily Challenge" body="Get as many words right in the shortest time and see where you stack up against the world 🌐! " />
            
              <DailyChallenge destination="placeHolderForWhenDailyChallengePageIsCreated" title="Join Multiplayer Room" body="Room code" />
            
          </div>
        </div>
      </div>
      
      {/* Footer of the page */}
      <Footer />
    </div>
  );
}

export default ComoSeDiceMenu;
