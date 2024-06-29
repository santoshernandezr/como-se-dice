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

            <DailyChallengeGuessWord />

            {/* Footer of the page */}
            <Footer />
        </div>
      );
}

export default DailyChallengeMode;