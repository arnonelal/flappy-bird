import Floor from './Floor/Floor';
import Pipes from './Pipes/Pipes';
import Player from './Player/Player';
import { Component } from 'react';
import { HandlerHolder } from 'utils/HandlerHolder';
import { Rect } from 'utils/Rect';
import './Game.scss';
import Score from './Score/Score';
import Background from './Background/Background';
import Instructions from './Instructions/Instructions';
import GameOverController from './GameOverController/GameOverController';
import BlackTransitionScreen from 'components/BlackTransitionScreen/BlackTransitionScreen';
import LeaderboardController from './LeaderboardController/LeaderboardController';
import { openSharePage } from 'utils/fetch';



interface Props {
  handler_jump: (callback: () => void) => void;
  onPressRestart: () => void;
}

interface State {
  phase: 'intro' | 'onGame' | 'dead';
  score: number;
  isMainScoreCompShowing: boolean;
  playerGatePhase: 'entering' | 'inside' | 'leavingOrOutside'; //'gate' is the gap between the pipes
}

export default class Game extends Component<Props, State> {


  handlerHolder_Player_jump = new HandlerHolder();
  handlerHolder_GameOverController_setGameOver = new HandlerHolder<[score: number]>(); //todo initiateGameOver
  handlerHolder_Instructions_dismiss = new HandlerHolder();
  handlerHolder_LeaderboardController_startFlow = new HandlerHolder();


  playerPipeCollisionData_GatesLocation?: Rect[];
  playerPipeCollisionData_playerLocation?: Rect;


  constructor(props: Props) {
    super(props);
    this.state = {
      phase: 'intro',
      playerGatePhase: 'leavingOrOutside',
      score: 0,
      isMainScoreCompShowing: true,
    };

    //init handlers
    this.props.handler_jump(() => this.onJumpAction());
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (prevState.playerGatePhase === 'entering' && (this.state.playerGatePhase === 'inside' || this.state.playerGatePhase === 'leavingOrOutside')) {
      this.setState({ score: this.state.score + 1 });
    }
  }

  render() {
    return (
      <div id='Game'>
        <Background randomSeedForGraphics={0} />

        <Pipes
          isMoving={this.state.phase === 'onGame'}
          onPipesMove={(gatesLocation) => { this.playerPipeCollisionData_GatesLocation = gatesLocation; this.checkPlayerAndGatesCollision() }}
        />
        <Player
          handler_onJump={(callback) => this.handlerHolder_Player_jump.add(callback)}
          onUpdateFlyingPos={(rect) => { this.playerPipeCollisionData_playerLocation = rect; this.checkPlayerAndGatesCollision() }}
          onCrashFloor={() => this.endGame()}
        />
        <Floor
          isMoving={this.state.phase !== 'dead'}
        />
        {this.state.isMainScoreCompShowing ?
          <Score
            score={this.state.score}
          />
          : null}
        <Instructions
          handler_dismiss={(callback) => this.handlerHolder_Instructions_dismiss.add(callback)}
        />
        <GameOverController
          handler_setGameOver={(callback) => this.handlerHolder_GameOverController_setGameOver.add(callback)}
          onShowGameOverTitle={() => this.setState({ isMainScoreCompShowing: false })}
          onClick_restart={() => this.props.onPressRestart()}
          onClick_share={() => openSharePage()}
          onReadyToRevealLeaderboardFlow={() => this.handlerHolder_LeaderboardController_startFlow.call()}
        />
        <LeaderboardController
          handler_startFlow={(callback) => this.handlerHolder_LeaderboardController_startFlow.add(callback)}
          score={this.state.score}
          onClick_restart={() => this.props.onPressRestart()}
          onClick_share={() => openSharePage()}
        />
      </div>
    )
  }


  private checkPlayerAndGatesCollision() {
    if (this.playerPipeCollisionData_GatesLocation === undefined || this.playerPipeCollisionData_playerLocation === undefined) return;
    if (this.state.phase !== 'onGame') return;

    const player = this.playerPipeCollisionData_playerLocation;

    for (let gate of this.playerPipeCollisionData_GatesLocation) {
      if ((player.x2 > gate.x1 && player.x1 < gate.x2) && //player intersects gateX
        (player.y1 < gate.y1 || player.y2 > gate.y2)) { //but does not fit inside it at Y
        this.endGame();
        break;
      }

      if (player.x2 >= gate.x1 && player.x1 < gate.x1) {
        this.setState({ playerGatePhase: 'entering' });
      }
      else if (player.x1 >= gate.x1 && player.x2 < gate.x2) {
        this.setState({ playerGatePhase: 'inside' });
      }
      else if (player.x2 > gate.x2 && player.x1 <= gate.x2) {
        this.setState({ playerGatePhase: 'leavingOrOutside' });
      }
    }
  }

  private startGame() {
    this.setState({ phase: 'onGame' });
  }

  private endGame() {
    if (this.state.phase === 'dead') return;
    this.handlerHolder_GameOverController_setGameOver.call(this.state.score);
    this.setState({ phase: 'dead' });
  }

  private onJumpAction() {
    if (this.state.phase === 'intro') {
      this.handlerHolder_Instructions_dismiss.call();
      this.startGame();
    }
    if (this.state.phase !== 'dead') {
      this.handlerHolder_Player_jump.call();
    }
  }

}

