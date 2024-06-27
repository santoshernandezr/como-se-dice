import '../css/App.css';

/**
 * Main menu page.
 * 
 * This is the page in which the user will be greeted at. For now, this will just contain a play button.
 * The play button will redirect the user to the Como se dice main menu where all the games are listed.
 * 
 * @returns Main menu page.
 */
function MainMenu() {

  return (
    <div>
      <header className="App-header">
        <h1>¿Cómo se dice?</h1>
        <p id="challengeMessage">Challenge your language skills with our word game!</p>
        <a href="/comosedice" id="playButton" className="animate-bounce bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Play
        </a>
      </header>
    </div>
  );
}

export default MainMenu;
