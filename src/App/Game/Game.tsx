import Floor from './Floor/Floor';
import Pipes from './Pipes/Pipes';
import Player from './Player/Player';
import { Component } from 'react';
import { BasicHandler as CallbackHandler } from 'utils/BasicHandler';
import { Rect } from 'utils/Rect';
import './Game.scss';
import Score from './Score/Score';
import Background from './Background/Background';
import DeathScreenFlash from './DeathScreenFlash/DeathScreenFlash';



interface Props {
  handler_onJumpAction: (callback: () => void) => void;
}

interface State {
  phase: 'intro' | 'onGame' | 'dead';

  isPlayerTouchingGate: boolean;
  score: number;
}

export default class Game extends Component<Props, State> {


  handler_jump = new CallbackHandler();
  handler_flash = new CallbackHandler();

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
          handler_onJump={(callback) => this.handler_jump.addCallback(callback)}
          onUpdateFlyingPos={(rect) => { this.collisionData_player = rect; this.checkCollision() }}
          onCrashFloor={() => this.endGame()}
        />
        <Floor
          isMoving={this.state.phase !== 'dead'}
        />
        <Score
          score={this.state.score}
        />
        <DeathScreenFlash
          handler_flash={(callback) => this.handler_flash.addCallback(callback)}
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
    this.handler_flash.call();
    this.setState({
      phase: 'dead',
    });
  }

  onJumpAction() {
    if (this.state.phase === 'intro') {
      this.startGame();
    }
    if (this.state.phase !== 'dead') {
      this.handler_jump.call();
    }
  }

}

