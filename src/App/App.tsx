import React from 'react';
import { HandlerHolder } from 'utils/HandlerHolder';
import './App.scss';
import Game from './Game/Game';

const onJumpHandler = new HandlerHolder();

function App() {
  return (
    <div
      id="App"
      tabIndex={-1} //for onKeyDown to work
      onClick={() => onClick()}
      onKeyDown={(e) => onKeyDown(e)}
    >
      <Game
        handler_onJumpAction={(callback) => onJumpHandler.add(callback)} />
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
