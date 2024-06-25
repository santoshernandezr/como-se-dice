import '../css/App.css';

import HomeNavigationBar from '../components/common/NavigationBar.jsx';
import Footer from '../components/common/Footer.jsx';
import GuessWord from '../components/timedGameMode/TimedGuessWord.jsx';

/**
 * Timed game mode page. This page will consist of the navigation bar, the users information, so their 
 * avatar image, score and best score, the word they have to guess, the 1 minute count down timer, and 
 * a text box in which they can input their guess.
 * 
 * @returns Timed game mode page.
 */
function TimedGameMode() {
  return (
    <div className='h-full'>

        {/* Navigatin bar */}
        <HomeNavigationBar />

        {/* The area in which the user will be asked the word to guess and the input where they'll input their answer. */}
        <GuessWord />
      
        {/* Footer of the page */}
        <Footer />
    </div>
  );
}

export default TimedGameMode;
