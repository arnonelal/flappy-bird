import Floor from './Floor/Floor';
import Pipes from './Pipes/Pipes';
import Player from './Player/Player';
import { Component } from 'react';
import { HandlerHolder } from 'utils/HandlerHolder';
import { Rect } from 'utils/Rect';
import './Game.scss';
import Score from './Score/Score';
import Background from './Background/Background';
import DeathFlashScreen from './GameOverController/DeathFlashScreen/DeathFlashScreen';
import Instructions from './Instructions/Instructions';
import GameOverTitle from './GameOverController/GameOverTitle/GameOverTitle';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import GameOverController from './GameOverController/GameOverController';



interface Props {
  handler_onJumpAction: (callback: () => void) => void;
}

interface State {
  phase: 'intro' | 'onGame' | 'dead';

  isPlayerTouchingGate: boolean;
  score: number;
}

export default class Game extends Component<Props, State> {


  handlerHolder_Player_jump = new HandlerHolder();
  handlerHolder_GameOverController_setGameOver = new HandlerHolder<[score: number]>();
  handlerHolder_Instructions_dismiss = new HandlerHolder();

  collisionData_pipeGates?: Rect[];
  collisionData_player?: Rect;


  constructor(props: Props) {
    super(props);
    this.state = {
      phase: 'intro',
      isPlayerTouchingGate: false,
      score: 0,
    };

    this.props.handler_onJumpAction(() => this.onJumpAction());
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (prevState.isPlayerTouchingGate && !this.state.isPlayerTouchingGate
      && this.state.phase === 'onGame') { //this condition is for hotfixing scorebug
      this.setState({ score: this.state.score + 1 });
    }
  }



  render() {
    return (
      <div
        id='Game'
      >
        <Background graphicsSeed={0} />
        <Pipes
          isMoving={this.state.phase === 'onGame'}
          onPipesMove={(rects) => { this.collisionData_pipeGates = rects; this.checkCollision() }}
        />
        <Player
          handler_onJump={(callback) => this.handlerHolder_Player_jump.add(callback)}
          onUpdateFlyingPos={(rect) => { this.collisionData_player = rect; this.checkCollision() }}
          onCrashFloor={() => this.endGame()}
        />
        <Floor
          isMoving={this.state.phase !== 'dead'}
        />
        <Score
          score={this.state.score}
        />
        <Instructions
          handler_dismiss={(callback) => this.handlerHolder_Instructions_dismiss.add(callback)}
        />
        <GameOverController
          handler_setGameOver={(callback) => this.handlerHolder_GameOverController_setGameOver.add(callback)}
          onRestart={() => 0}
        />

      </div>
    )
  }


  checkCollision() {
    if (this.collisionData_pipeGates === undefined || this.collisionData_player === undefined) return;

    const player = this.collisionData_player;

    for (let gate of this.collisionData_pipeGates) {
      if (player.x2 > gate.x1 && player.x1 < gate.x2) { //player intersects gateX
        if (player.y1 < gate.y1 || player.y2 > gate.y2) { //but does not fit inside it at Y
          this.endGame();
          break;
        } else {
          this.setState({ isPlayerTouchingGate: true });
        }
      } else {
        if (this.state.isPlayerTouchingGate) {
          this.setState({ isPlayerTouchingGate: false });
        }
      }
    }
  }

  startGame() {
    this.setState({ phase: 'onGame' });
  }

  endGame() {
    if (this.state.phase === 'dead') return;
    this.handlerHolder_GameOverController_setGameOver.call(this.state.score);
    this.setState({
      phase: 'dead',
    });
  }

  onJumpAction() {
    if (this.state.phase === 'intro') {
      this.handlerHolder_Instructions_dismiss.call();
      this.startGame();
    }
    if (this.state.phase !== 'dead') {
      this.handlerHolder_Player_jump.call();
    }
  }

}

