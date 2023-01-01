import { Component } from 'react';
import './PlayerGraphic.scss';
import PlayerMovingSprite from './PlayerMovingSprite/PlayerMovingSprite';



interface Props {
  clickHandler: (callback: () => void) => void;
  fps: number;
}

interface State {
  playerRotation: number;
  isPlayerFlappingWings: boolean;
}

export default class PlayerGraphic extends Component<Props, State> {

  movementInverval?: NodeJS.Timer;

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
    clearInterval(this.movementInverval);
  }

  onClick() {
    clearInterval(this.movementInverval);
    this.setState({ isPlayerFlappingWings: true });
    this.setRotationTimeoutPhase0();
  }

  render() {
    return (
      <div id='PlayerGraphic' style={{ rotate: this.state.playerRotation + 'deg' }}>
        <PlayerMovingSprite isPlayerFlappingWings={this.state.isPlayerFlappingWings} />
      </div>
    )
  }




  setRotationTimeoutPhase0() {
    this.movementInverval = setInterval(() => {
      let newRotation = this.state.playerRotation - (400 / this.props.fps);
      if (newRotation <= -25) {
        clearInterval(this.movementInverval);
        this.setRotationTimeoutPhase1();
        newRotation = -25;
      }
      this.setState({ playerRotation: newRotation })
    }, 1000 / this.props.fps);
  }


  setRotationTimeoutPhase1() {
    this.movementInverval = setInterval(() => {
      clearInterval(this.movementInverval);
      this.setState({ isPlayerFlappingWings: false });
      this.setRotationTimeoutPhase2();
    }, 800);
  }

  setRotationTimeoutPhase2() {
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


