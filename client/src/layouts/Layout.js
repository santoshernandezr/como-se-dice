import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import NavigationBar from "../components/common/NavigationBar";
import Footer from "../components/common/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../pages/UserContext";
import axios from "axios";

/**
 * Component responsible for the creation of the skeleton of the entire game. It consists of the Navigation bar and the
 * Footer. The 'Outlet' component is where the child components will go i.e. Normal game mode, timed game mode, etc.
 *
 * Before this coomponent is rendered, we check if the user exists in the user context. If the user in the user context
 * doesn't exist, this means the user is not logged in. So, if the user is not defined (i.e. null), then redirect (Navigate)
 * the user to the signin page.
 *
 * @returns Layout component.
 */
function Layout() {
  // Importing the 'login' method to set the user context once we verify the user has a session going on.
  const { login } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);

  // Method that will allow us to navigate to other pages.
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  // UseEffect that's ONLY ran ONCE when the layout is rendered to verify the user has a valid session.
  useEffect(() => {
    // Call the endpoint that checks if the user has a valid session going on.
    axios
      .get("/signedIn")
      .then((response) => {
        // If the user has a valid session, then re-set the user context with 'response.data.user'.
        if (response.data.valid) {
          console.log("session is valid");
          console.log("username: " + response.data.user.username);
          login(response.data.user);
          setLoggedIn(true);
        }
        // If the user DOES NOT have a valid session, then navigate to the signed in page.
        else {
          console.log("Session is not valid");
          setLoggedIn(false);
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return loggedIn ? (
    <div>
      <NavigationBar />

      <main>
        <Outlet></Outlet>
      </main>

      <Footer />
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default Layout;
