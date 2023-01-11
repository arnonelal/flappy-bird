import { Component } from 'react';
import { FpsIntervalController, fpsIntervalController } from 'utils/fpsIntervalController';
import { GameConsts } from 'utils/GameConsts';
import './DeathFlashScreen.scss';



interface Props {
}

interface State {
  opacity: number; //0-1
}

export default class DeathFlashScreen extends Component<Props, State> {

  flashInterval = fpsIntervalController.add(() => this.flashIntervalStep());


  constructor(props: Props) {
    super(props);
    this.state = {
      opacity: 0,
    };
  }

  componentDidMount(): void {
    this.flashInterval.start();
  }

  componentWillUnmount(): void {
    this.flashInterval.stop();
  }


  render() {
    return (
      <div
        id='DeathFlashScreen'
        style={{ opacity: this.state.opacity }}
      >
      </div>
    )
  }


  entersDim = true;
  flashIntervalStep() {
    let opacity: number;
    if (this.entersDim) {
      opacity = this.state.opacity + (6 / GameConsts.fps);
      if (opacity >= 1) {
        opacity = 1;
        this.entersDim = false;
      }
    } else {
      opacity = this.state.opacity - (3 / GameConsts.fps);
      if (opacity <= 0) {
        opacity = 0;
        this.entersDim = true;
        this.flashInterval.stop();
      }
    }

    this.setState({ opacity });
  }
}


const dimPerSec = 2;

