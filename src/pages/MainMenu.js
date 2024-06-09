import '../css/App.css';
import { useNavigate } from 'react-router-dom';

function MyButton({ buttonName }) {
    const navigate = useNavigate();
  return (
    <div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => navigate('normalGameMode')}>
        { buttonName }
      </button>
    </div>
  );
}

function MainMenu() {
  return (
    <div className="mainMenu">
      <header className="App-header">
        <p>Play como se dice!</p>
        <MyButton buttonName="Play" />
      </header>
    </div>
  );
}

export default MainMenu;
