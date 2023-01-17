import { Component } from 'react';
import { fpsIntervalController } from 'utils/fpsIntervalController';
import './PlayerGraphic.scss';
import PlayerMovingSprite from './PlayerMovingSprite/PlayerMovingSprite';
import Timeout from 'util/Timeout'


interface Props {
  clickHandler: (callback: () => void) => void;
  fps: number;
}

interface State {
  playerRotation: number;
  isPlayerFlappingWings: boolean;
}

export default class PlayerGraphic extends Component<Props, State> {

  animationInterval_phase0 = fpsIntervalController.set(() => this.animationStep_phase0());
  animationTimeout_phase1?: Timeout;
  animationInterval_phase2 = fpsIntervalController.set(() => this.animationStep_phase2());

  constructor(props: Props) {
    super(props);
    this.state = {
      playerRotation: 0,
      isPlayerFlappingWings: true,
    };
  }

  componentDidMount(): void {
    this.props.clickHandler(() => this.onClick());
  }

  componentWillUnmount(): void {
    this.stopIntervals();
  }

  onClick() {
    this.stopIntervals();
    this.setState({ isPlayerFlappingWings: true });
    this.animationInterval_phase0.start();
  }

  render() {
    return (
      <div id='PlayerGraphic' style={{ rotate: this.state.playerRotation + 'deg' }}>
        <PlayerMovingSprite isPlayerFlappingWings={this.state.isPlayerFlappingWings} />
      </div>
    )
  }


  stopIntervals() {
    this.animationInterval_phase0.stop();
    clearTimeout(this.animationTimeout_phase1);
    this.animationInterval_phase2.stop();
  }


  animationStep_phase0() {
    let newRotation = this.state.playerRotation - (400 / this.props.fps);
    if (newRotation <= -25) {
      this.animationInterval_phase0.stop();
      this
      this.animationInterval_phase1.start();
      newRotation = -25;
    }
    this.setState({ playerRotation: newRotation })
  }


  animationStep_phase1() {
    this.movementInverval = setInterval(() => {
      clearInterval(this.movementInverval);
      this.setState({ isPlayerFlappingWings: false });
      this.animationStep_phase2();
    }, 800);
  }

  animationStep_phase2() {
    this.movementInverval = setInterval(() => {
      let newRotation = this.state.playerRotation + (300 / this.props.fps);
      if (newRotation >= 90) {
        clearInterval(this.movementInverval);
        newRotation = 90;
      }
      this.setState({ playerRotation: newRotation });
    }, 1000 / this.props.fps);
  }

}


