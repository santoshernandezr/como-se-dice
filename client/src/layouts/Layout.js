import React, { useContext, useState } from "react";
import "../css/App.css";
import NavigationBar from "../components/common/NavigationBar";
import Footer from "../components/common/Footer";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../pages/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const { login } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("/login").then((response) => {
      console.log("Checking if i'm logged in");
      if (response.data.loggedIn) {
        console.log("I am logged in");
        setIsLoggedIn(true);
      } else {
        console.log("I am not logged in");
        navigate("/signin");
      }
      console.log("In axios call layout");
      console.log("Logged in: " + response.data.loggedIn);
    });
  });

  return isLoggedIn ? (
    <div>
      <NavigationBar />

      <main>
        <Outlet></Outlet>
      </main>

      <Footer />
    </div>
  ) : (
    <div></div>
  );
}

export default Layout;
