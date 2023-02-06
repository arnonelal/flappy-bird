import React, { Component, useEffect, useRef, useState } from 'react';
import { HandlerHolder } from 'utils/HandlerHolder';
import './App.scss';
import BlackTransitionScreen from '../components/BlackTransitionScreen/BlackTransitionScreen';
import Game from './Game/Game';
import { useHandlerHolder } from 'utils/hooks/useHandlerHolder';




export default function App() {

  const handlerHolder_BlackTransitionScreen_startTransition = useHandlerHolder<[completion: () => void]>();
  const handlerHolder_Game_jump = useHandlerHolder();

  const containerRef = useRef<HTMLDivElement>();

  const [gameComponentKey, setGameComponentKey] = useState(0);



  function restartGame() {
    handlerHolder_BlackTransitionScreen_startTransition.call(() => {
      setGameComponentKey(value => value + 1);
    });
  }

  function focusContainer() {
    containerRef.current?.focus();
  }



  useEffect(() => {
    focusContainer();
  }, []);





  return (
    <div
      id="App"
      ref={(ref) => containerRef.current = ref ?? undefined}
      tabIndex={-1} //for onKeyDown to work
      onMouseDown={() => handlerHolder_Game_jump.call()}
      onKeyDown={(e) => (e.code === 'Space') && handlerHolder_Game_jump.call()}
      onBlur={() => focusContainer()}
    >
      <Game
        handler_jump={(callback) => handlerHolder_Game_jump.add(callback)}
        onPressRestart={() => restartGame()}
        key={gameComponentKey}
      />
      <BlackTransitionScreen
        handler_startTransition={(callback) => handlerHolder_BlackTransitionScreen_startTransition.add(callback)}
      />
    </div>
  );
}
