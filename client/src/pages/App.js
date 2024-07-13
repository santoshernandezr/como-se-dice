import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// These are all the pages that will be used for the game. All the files that are in ./pages should be here as well.
import MainMenu from "./MainMenu";
import ComoSeDiceMenu from "./ComoSeDiceMenu";
import NormalGameMode from "./NormalGameMode";
import TimedGameMode from "./TimedGameMode";
import ComingSoon from "./ComingSoon";
import DailyChallengeMode from "./DailyChallengeMode";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Main route. */}
      <Route path="/" element={<MainMenu />} />

      {/* Parent route. */}
      <Route path="/comosedice" element={<RootLayout />}>
        {/* Child routes of /comosedice path. */}
        <Route path="menu" element={<ComoSeDiceMenu />} />
        <Route path="dailychallenge" element={<DailyChallengeMode />} />
        <Route path="normalgamemode" element={<NormalGameMode />} />
        <Route path="timedgamemode" element={<TimedGameMode />} />
        <Route path="comingSoon" element={<ComingSoon />} />
      </Route>

      {/* Their own routes */}
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
