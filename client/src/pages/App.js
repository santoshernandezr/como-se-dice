import { Routes, Route } from 'react-router-dom';

// These are all the pages that will be used for the game. All the files that are in ./pages should be here as well.
import MainMenu from './MainMenu';
import ComoSeDiceMenu from './ComoSeDiceMenu';
import NormalGameMode from './NormalGameMode';
import TimedGameMode from './TimedGameMode';
import ComingSoon from './ComingSoon';
import DailyChallengeMode from './DailyChallengeMode';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => {
  return (
     <>
        <Routes>
           <Route path="/" element={<MainMenu />} />
           <Route path="/comosedice" element={<ComoSeDiceMenu />} />
           <Route path="/normalgamemode" element={<NormalGameMode/>} />
           <Route path="/timedgamemode" element={<TimedGameMode />} />
           <Route path="/comingSoon" element={<ComingSoon />} />
           <Route path="/dailychallengemode" element={<DailyChallengeMode />} />
           <Route path="/signin" element={<SignIn />} />
           <Route path="/signup" element={<SignUp />} />
        </Routes>
     </>
  );
 };
 
 export default App;