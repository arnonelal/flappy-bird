import { Component } from 'react';
import { FpsIntervalController, fpsIntervalController } from 'utils/fpsIntervalController';
import { GameConsts } from 'utils/GameConsts';
import './Instructions.scss';



interface Props {
  handler_flash: (callback: () => void) => void;
}

interface State {
  opacity: number; //0-1
}

export default class Instructions extends Component<Props, State> {

  flashInterval = fpsIntervalController.add(() => this.flashIntervalStep());


  constructor(props: Props) {
    super(props);
    this.state = {
      opacity: 0,
    };
    this.props.handler_flash(() => this.flash())
  }

  componentWillUnmount(): void {
    this.flashInterval.stop();
  }


  render() {
    return (
      <div
        id='Instructions'
        style={{ opacity: this.state.opacity }}
      >
      </div>
    )
  }

  entersDim = true;


  flash() {
    this.flashInterval.start();
  }


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

