import Floor from './Floor/Floor';
import Pipes from './Pipes/Pipes';
import Player from './Player/Player';
import { useEffect, useRef } from 'react';
import { HandlerHolder } from 'utils/HandlerHolder';
import { Rect } from 'utils/Rect';
import './Game.scss';
import Score from './Score/Score';
import Background from './Background/Background';
import Instructions from './Instructions/Instructions';
import GameOverController from './GameOverController/GameOverController';
import LeaderboardController from './LeaderboardController/LeaderboardController';
import { openSharePage } from 'utils/fetch';
import { useLazyRef } from 'hooks/useLazyRef';
import { useMergedState } from 'hooks/useMergedState';
import { useChanged } from 'hooks/useChanged';
import { useTriggerEffect } from 'hooks/useTrigger';



interface Props {
  handler_jump: number;
  onPressRestart: () => void;
}

interface State {
  phase: 'intro' | 'onGame' | 'dead';
  score: number;
  isMainScoreComponentShowing: boolean;
  playerGatePhase: 'entering' | 'inside' | 'leavingOrOutside'; //'gate' is the gap between the pipes
}



export default function Game(props: Props) {

  const handlerHolder_Player_jump = useLazyRef(() => new HandlerHolder());
  const handlerHolder_GameOverController_setGameOver = useLazyRef(() => new HandlerHolder<[score: number]>()); //todo initiateGameOver
  const handlerHolder_Instructions_dismiss = useLazyRef(() => new HandlerHolder());
  const handlerHolder_LeaderboardController_startFlow = useLazyRef(() => new HandlerHolder());


  const playerPipeCollisionData_GatesLocation = useRef<Rect[]>();
  const playerPipeCollisionData_playerLocation = useRef<Rect>();


  function checkPlayerAndGatesCollision() {
    if (playerPipeCollisionData_GatesLocation.current === undefined || playerPipeCollisionData_playerLocation.current === undefined) return;
    if (state.phase !== 'onGame') return;

    const player = playerPipeCollisionData_playerLocation.current;

    for (let gate of playerPipeCollisionData_GatesLocation.current) {
      if ((player.x2 > gate.x1 && player.x1 < gate.x2) && //player intersects gateX
        (player.y1 < gate.y1 || player.y2 > gate.y2)) { //but does not fit inside it at Y
        endGame();
        break;
      }

      if (player.x2 >= gate.x1 && player.x1 < gate.x1) {
        setState({ playerGatePhase: 'entering' });
      }
      else if (player.x1 >= gate.x1 && player.x2 < gate.x2) {
        setState({ playerGatePhase: 'inside' });
      }
      else if (player.x2 > gate.x2 && player.x1 <= gate.x2) {
        setState({ playerGatePhase: 'leavingOrOutside' });
      }
    }
  }

  function startGame() {
    setState({ phase: 'onGame' });
  }

  function endGame() {
    if (state.phase === 'dead') return;
    handlerHolder_GameOverController_setGameOver.current.call(state.score);
    setState({ phase: 'dead' });
  }

  function onJumpAction() {
    if (state.phase === 'intro') {
      handlerHolder_Instructions_dismiss.current.call();
      startGame();
    }
    if (state.phase !== 'dead') {
      handlerHolder_Player_jump.current.call();
    }
  }

  const [state, setState] = useMergedState<State>({
    phase: 'intro',
    playerGatePhase: 'leavingOrOutside',
    score: 0,
    isMainScoreComponentShowing: true,
  });


  useTriggerEffect(() => onJumpAction(), props.handler_jump);

  useChanged(prev => {
    if (prev.state.playerGatePhase === 'entering' && (state.playerGatePhase === 'inside' || state.playerGatePhase === 'leavingOrOutside')) {
      setState({ score: state.score + 1 });
    }
  }, { state });



  console.log(state.phase);
  return (
    <div id='Game'>
      <Background randomSeedForGraphics={0} />

      <Pipes
        isMoving={state.phase === 'onGame'}
        onPipesMove={(gatesLocation) => { playerPipeCollisionData_GatesLocation.current = gatesLocation; checkPlayerAndGatesCollision() }}
      />
      <Player
        handler_onJump={(callback) => handlerHolder_Player_jump.current.add(callback)}
        onUpdateFlyingPos={(rect) => { playerPipeCollisionData_playerLocation.current = rect; checkPlayerAndGatesCollision() }}
        onCrashFloor={() => endGame()}
      />
      <Floor
        isMoving={state.phase !== 'dead'}
      />
      {state.isMainScoreComponentShowing ?
        <Score
          score={state.score}
        />
        : null}
      <Instructions
        handler_dismiss={(callback) => handlerHolder_Instructions_dismiss.current.add(callback)}
      />
      <GameOverController
        handler_setGameOver={(callback) => handlerHolder_GameOverController_setGameOver.current.add(callback)}
        onShowGameOverTitle={() => setState({ isMainScoreComponentShowing: false })}
        onClick_restart={() => props.onPressRestart()}
        onClick_share={() => openSharePage()}
        onReadyToRevealLeaderboardFlow={() => handlerHolder_LeaderboardController_startFlow.current.call()}
      />
      <LeaderboardController
        handler_startFlow={(callback) => handlerHolder_LeaderboardController_startFlow.current.add(callback)}
        score={state.score}
        onClick_restart={() => props.onPressRestart()}
        onClick_share={() => openSharePage()}
      />
    </div>
  )

}

