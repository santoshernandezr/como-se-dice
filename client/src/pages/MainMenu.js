import "../css/App.css";
import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import axios from "axios";

/**
 * Main menu page.
 *
 * This is the page in which the user will be greeted at. For now, this will just contain a play button.
 * The play button will redirect the user to the Como se dice main menu where all the games are listed.
 *
 * @returns Main menu page.
 */
function MainMenu() {
  // Method that will allow us to navigate to other pages.
  const navigate = useNavigate();

  // Login method that will set the user context to the user we retreive from the database.
  const { login, setGuest } = useContext(UserContext);

  axios.defaults.withCredentials = true;
  // UseEffect that's ONLY ran ONCE when the layout is rendered to verify the user has a valid session.
  useEffect(() => {
    // Call the endpoint that checks if the user has a valid session going on.
    axios
      .get("/signedIn")
      .then((response) => {
        // If the user has a valid session, then re-set the user context with 'response.data.user'.
        if (response.data.valid) {
          navigate("/comosedice/menu");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  axios.defaults.withCredentials = true;
  // Method that will make  apost call to the backend to make a guest user object so the user can continue as guest.
  async function playAsGuest(e) {
    e.preventDefault();

    axios.get("/guest").then((response) => {
      if (response.status === 200) {
        navigate("/comosedice/menu");
        login(response.data.user);
        setGuest(true);
      }
    });
  }

  return (
    <div>
      <header className="App-header">
        <h1>¿Cómo se dice? Beta</h1>
        <p id="challengeMessage">
          Challenge your language skills with our word game!
        </p>

        <div className="flex flex-row gap-x-4">
          <button
            onClick={playAsGuest}
            className="w-20 h-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 text-center hover:border-transparent rounded text-2xl"
          >
            Play
          </button>

          <NavLink
            to="/signin"
            className="w-20 h-10 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white border border-green-500 text-center hover:border-transparent rounded text-2xl"
          >
            Login
          </NavLink>
        </div>
      </header>
    </div>
  );
}

export default MainMenu;
