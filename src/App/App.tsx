import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Player from '../components/Player/Player';
import MovingStage from '../components/MovingStage/MovingStage';

function App() {
  return (
    <div
      id="App"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={"unselectable"}
      tabIndex={-1} //for onKeyDown to work
    >
      <div className='_gameContainer'>
        <Player
          clickHandler={(callback) => clickHandlerCallback = callback}
          floorYPos={81}
          onMove={() => 0}
          fps={60}
          onChangePhase={(phase) => 0}
        />
        <MovingStage
          fps={60}
        />
      </div>
    </div>
  );
}


let clickHandlerCallback: (() => void) | null = null;
function onClick() {
  clickHandlerCallback?.();
}

function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
  if (e.code === 'Space') {
    clickHandlerCallback?.();
  }
}


//todo make all screen non highligtable (cant highlight text)


export default App;
