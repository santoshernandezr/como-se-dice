import '../css/App.css';
import HomeNavigationBar from '../components/common/NavigationBar.jsx';
import Footer from '../components/common/Footer.jsx';
import GuessWord from '../components/normalGameMode/NormalGuessWord.jsx';

/**
 * Normal game mode page. This page will consist of the navigation bar, the users information, so their 
 * avatar image, score and lives count, the word they have to guess, and a text box in which they can
 * input their guess.
 * 
 * @returns Normal game mode page.
 */
function NormalGameMode() {

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

export default NormalGameMode;
