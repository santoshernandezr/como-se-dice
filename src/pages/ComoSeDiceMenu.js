import '../css/App.css';
import HomeNavigationBar from '../components/NavigationBar.jsx'
import GameModeCard from '../components/CardWithGameModes.jsx'

function Home() {
  return (
    <div>
      <HomeNavigationBar></HomeNavigationBar>

      <div className='flex justify-center'>
        <div className='w-5/6'>
          <div className='grid grid-rows-2 grid-flow-col gap-4'>
            <div>
              <GameModeCard
                title="Start Singleplayer" 
                body="Play Cómo Se Dice Alone">
              </GameModeCard>
            </div>
            <div className='h-20'>02</div>
            <div className='h-20'>03</div>
            <div className='h-20'>04</div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
