import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";
import UserContext from "./UserContext";

// These are all the pages that will be used for the game. All the files that are in ./pages should be here as well.
import MainMenu from "./MainMenu";
import ComoSeDiceMenu from "./ComoSeDiceMenu";
import NormalGameMode from "./NormalGameMode";
import TimedGameMode from "./TimedGameMode";
import ComingSoon from "./ComingSoon";
import DailyChallengeMode from "./DailyChallengeMode";
import Leaderboard from "./Leaderboard";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Layout from "../layouts/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Main route. */}
      <Route path="/" element={<MainMenu />} />

      {/* Their own routes */}
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />

      {/* 
        Parent route. 
        These routes will be protected routes. Meaning that they will only be able to be viewed by users that are logged in.
        In the 'Layout' component we will check if the user state exists. If it is then we will get to these routes, otherwise send them to the sign in page.
       */}
      <Route path="/comosedice" element={<Layout />}>
        {/* Child routes of /comosedice path. */}
        <Route path="menu" element={<ComoSeDiceMenu />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="dailychallenge" element={<DailyChallengeMode />} />
        <Route path="normalgamemode" element={<NormalGameMode />} />
        <Route path="timedgamemode" element={<TimedGameMode />} />
        <Route path="comingSoon" element={<ComingSoon />} />
      </Route>
    </Route>
  )
);

function App() {
  // Instantiate the user state that will be the user context.
  const [user, setUser] = useState(null);

  // Function to be called to set the user in the 'sign in' page.
  const login = (userData) => {
    setUser(userData);
  };

  // Function to be called to set the user to null in the 'sign out' page.
  const logout = () => {
    setUser(null);
  };

  // Updating the users timed game mode score when they're logged in.
  const updateTimedModeBestScore = (value) => {
    setUser({
      ...user,
      timedGameMode: {
        bestScore: value,
      },
    });
  };

  return (
    // Wrapping the Router Provider by the User Context Provider so that all the routes have access to the user context.
    <UserContext.Provider
      // Passing in the user context and other methods related to the user, so they are available to the routes.
      value={{ user, login, logout, updateTimedModeBestScore }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
