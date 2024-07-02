import '../css/App.css';
import HomeNavigationBar from '../components/common/NavigationBar.jsx';
import Footer from '../components/common/Footer.jsx';
import DailyChallengeGuessWord from '../components/dailyChallengeMode/DailyChallengeGuessWord.jsx';

/**
 * Daily challenge page.
 * 
 * Contains the page that will be shown to the user when they choose the daily challenge.
 * 
 * @returns Daily challenge page.
 */
function DailyChallengeMode() {
    return (
        <div className='h-full'>
            {/* Navigatin bar */}
            <HomeNavigationBar />

            {/* The area in which the user will be asked the word to guess and the input where they'll input their answer. */}
            <DailyChallengeGuessWord />

            {/* Footer of the page */}
            <Footer />
        </div>
      );
}

export default DailyChallengeMode;