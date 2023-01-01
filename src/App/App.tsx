import React from 'react';
import './App.scss';
import Player from './Player/Player';
import MovingStage from './MovingStage/MovingStage';

function App() {
  return (
    <div
      id="App"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={"unselectable"}
      tabIndex={-1} //for onKeyDown to work
    >
      <Player
        clickHandler={(callback) => clickHandlerCallback = callback}
        onMove={() => 0}
        fps={60}
        onChangePhase={(phase) => 0}
      />
      <MovingStage
        fps={60}
      />
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
