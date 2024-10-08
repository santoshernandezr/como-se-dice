import "../css/App.css";
import { NavLink } from "react-router-dom";

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
        <h1>¿Cómo se dice? Beta</h1>
        <p id="challengeMessage">
          Challenge your language skills with our word game!
        </p>
        <NavLink
          to="/comosedice/menu"
          className=" w-20 h-10 animate-bounce bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 text-center hover:border-transparent rounded text-3xl"
        >
          Play
        </NavLink>
      </header>
    </div>
  );
}

export default MainMenu;
