import { Component } from 'react';
import './GameOverTitle.scss';
import imgSrc from 'assets/gameSprites/titles/game-over.png'
import { GameConsts, vhScaleFactor } from 'utils/GameConsts';
import { fpsIntervalController } from 'utils/fpsIntervalController';


interface Props {
}

interface State {
  appearanceProgress: number // 0-1
}

export default class GameOverTitle extends Component<Props, State> {

  apeearInterval = fpsIntervalController.set(() => this.animationStep());


  constructor(props: Props) {
    super(props);
    this.state = {
      appearanceProgress: 0,
    };
  }

  componentDidMount(): void {
    this.apeearInterval.start();
  }


  render() {
    return (
      <div id='GameOverTitle'>
        <img
          src={imgSrc}
          style={{
            opacity: this.state.appearanceProgress,
            marginTop: (-2 + (2 * this.state.appearanceProgress)) + 'vh',
            height: (21 * vhScaleFactor) + 'vh',

          }}
          alt="" />
      </div>
    )
  }

  speed = 2;

  animationStep() {
    this.speed += (10 / GameConsts.fps)
    let prog = this.state.appearanceProgress + (this.speed / GameConsts.fps);

    if (prog >= 1) {
      prog = 1;
      this.apeearInterval.stop();
    }

    this.setState({ appearanceProgress: prog });

  }
}

