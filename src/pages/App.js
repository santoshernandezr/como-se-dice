
import { Routes, Route } from 'react-router-dom';

// These are all the pages that will be used for the game. All the files that are in ./pages should be here as well.
import MainMenu from './MainMenu';
import ComoSeDiceMenu from './ComoSeDiceMenu';
import NormalGameMode from './NormalGameMode';

const App = () => {
  return (
     <>
        <Routes>
           <Route path="/" element={<MainMenu />} />
           <Route path="/comosedice" element={<ComoSeDiceMenu />} />
           <Route path="/normalgamemode" element={<NormalGameMode/>} />
        </Routes>
     </>
  );
 };
 
 export default App;