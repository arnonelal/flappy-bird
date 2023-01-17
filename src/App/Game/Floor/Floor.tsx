import { Component } from 'react';
import './Floor.scss';
import floorImgSrc from 'assets/gameSprites/floor.png';
import { GameConsts } from 'utils/GameConsts';
import { BasicInterval } from 'utils/BasicInterval';
import { FpsIntervalController, fpsIntervalController } from 'utils/fpsIntervalController';

interface Props {
  isMoving: boolean;
}

interface State {
  xPos: number,
}


export default class Floor extends Component<Props, State> {

  movementInverval = fpsIntervalController.set((_this) => this.moveFloor(_this));

  constructor(props: Props) {
    super(props);
    this.state = {
      xPos: 0,
    };
  }

  componentDidMount() {
    this.setMovementInterval();
  }

  componentWillUnmount(): void {
    this.movementInverval.stop();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (prevProps.isMoving !== this.props.isMoving) {
      this.setMovementInterval();
    }
  }

  setMovementInterval() {
    if (this.props.isMoving) {
      this.movementInverval.start();
    } else {
      this.movementInverval.stop();
    }
  }

  moveFloor(interval: FpsIntervalController) {
    let xPos = this.state.xPos - (GameConsts.floor.speed / GameConsts.fps);
    if (xPos < - GameConsts.floor.tileWidthVh) {
      xPos += GameConsts.floor.tileWidthVh;
    }
    this.setState({ xPos });
  }


  render() {
    return (
      <div
        id='Floor'
        style={{
          height: GameConsts.floor.heightVh + 'vh',
          left: this.state.xPos + 'vh',
        }}
      >
      </div>
    )
  }
}

