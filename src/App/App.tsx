import React from 'react';
import { BasicHandler } from 'utils/BasicHandler';
import './App.scss';
import Game from './Game/Game';

const onJumpHandler = new BasicHandler();

function App() {
  return (
    <div
      id="App"
      tabIndex={-1} //for onKeyDown to work
      onClick={() => onClick()}
      onKeyDown={(e) => onKeyDown(e)}
    >
      <Game
        handler_onJumpAction={(callback) => onJumpHandler.addCallback(callback)} />
    </div>
  );
}

function onClick() {
  onJumpHandler.call();
}

function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
  if (e.code === 'Space') {
    onJumpHandler.call();
  }
}


//todo make all screen non highligtable (cant highlight text)


export default App;
