import '../css/App.css';
import Mario from '../images/mario.png';

import HomeNavigationBar from '../components/NavigationBar.jsx';
import Footer from '../components/Footer.jsx';
import GuessWord from '../components/TimedGuessWord.jsx';
import Counter from '../components/TimedModeCounter.jsx';

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

        <main>
            {/* The users information. Users avatar, username, lives and score count. */}
            <div className="flex flex-col items-center">
                <div className="w-full max-w-sm ">
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-32 h-32 mt-8 rounded-full shadow-lg" alt="" src={ Mario }></img>
                        <h5 className="mb-0 mt-4 text-xl font-medium dark:text-black">pollo.io</h5>

                        {/* The count down timer. */}
                        <Counter />

                        <div className="flex mt-2">
                            <p id="timedModeScore" className="inline-flex items-center px-4 py-2 text-m font-medium text-center dark:text-black">Score: 0</p>
                            <p id="timedModeBestScore" className="inline-flex items-center px-4 py-2 text-m font-medium text-center dark:text-black">Best score: 2</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/* The area in which the user will be asked the word to guess and the input where they'll input their answer. */}
        <GuessWord />
      
        {/* Footer of the page */}
        <Footer />
    </div>
  );
}

export default TimedGameMode;
