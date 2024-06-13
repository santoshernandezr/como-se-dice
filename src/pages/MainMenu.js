import '../css/App.css';
import { useNavigate } from 'react-router-dom';

/**
 * Main menu page.
 * 
 * This is the page in which the user will be greeted at. For now, this will just contain a play button.
 * The play button will redirect the user to the Como se dice main menu where all the games are listed.
 * 
 * @returns Main menu page.
 */
function MainMenu() {

  // Used to help us redirect the user when performing the 'onClick' action.
  const navigate = useNavigate();

  return (
    <div>
      <header className="App-header">
        <p>Play como se dice!</p>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => navigate('comoSeDice')}>
            play
          </button>
      </header>
    </div>
  );
}

export default MainMenu;
