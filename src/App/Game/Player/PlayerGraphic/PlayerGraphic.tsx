import { Component } from 'react';
import { fpsIntervalController } from 'utils/fpsIntervalController';
import './PlayerGraphic.scss';
import PlayerMovingSprite from './PlayerMovingSprite/PlayerMovingSprite';
import { Timeout } from 'utils/Timeout';


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
    this.animationTimeout_phase1?.stop();
    this.animationInterval_phase2.stop();
  }


  animationStep_phase0() {
    let newRotation = this.state.playerRotation - (400 / this.props.fps);
    if (newRotation <= -16) {
      newRotation = -16;

      this.animationInterval_phase0.stop();
      this.animationTimeout_phase1 = new Timeout(500, () => this.animationTimeoutCallback_phase1());
    }
    this.setState({ playerRotation: newRotation })
  }

  animationTimeoutCallback_phase1() {
    this.setState({ isPlayerFlappingWings: false });
    this.animationSpeed_phase2 = 0;
    this.animationInterval_phase2.start();
  }

  animationSpeed_phase2 = 150;
  animationStep_phase2() {
    this.animationSpeed_phase2 += 1000 / this.props.fps;
    let newRotation = this.state.playerRotation + (this.animationSpeed_phase2 / this.props.fps);
    if (newRotation >= 90) {
      this.animationInterval_phase2.stop();
      newRotation = 90;
    }
    this.setState({ playerRotation: newRotation });
  }

}


