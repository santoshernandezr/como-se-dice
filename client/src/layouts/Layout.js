import React, { useContext } from "react";
import "../css/App.css";
import NavigationBar from "../components/common/NavigationBar";
import Footer from "../components/common/Footer";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../pages/UserContext";

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
  const { user } = useContext(UserContext);

  return user ? (
    <div>
      <NavigationBar />

      <main>
        <Outlet></Outlet>
      </main>

      <Footer />
    </div>
  ) : (
    <Navigate to="/signin" />
  );
}

export default Layout;
