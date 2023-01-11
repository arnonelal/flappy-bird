import { Component } from 'react';
import { FpsIntervalController, fpsIntervalController } from 'utils/fpsIntervalController';
import { GameConsts, vhScaleFactor } from 'utils/GameConsts';
import './Instructions.scss';
import instructions_imgSrc from 'assets/gameSprites/instructions.png';
import title_imgSrc from 'assets/gameSprites/titles/get-ready.png';


interface Props {
  handler_dismiss: (callback: () => void) => void;
}

interface State {
  opacity: number; //0-1
}

export default class Instructions extends Component<Props, State> {

  flashInterval = fpsIntervalController.add(() => this.animationStep());


  constructor(props: Props) {
    super(props);
    this.state = {
      opacity: 0,
    };
    this.props.handler_dismiss(() => this.onDismiss());
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
        id='Instructions'
        style={{
          opacity: this.state.opacity,
          top: 28.5 + 'vh',
        }}
      >
        <img
          src={title_imgSrc}
          style={{
            height: (25 * vhScaleFactor) + 'vh',
            paddingBottom: (10 * vhScaleFactor) + 'vh',
          }}
          alt=""
        />
        <img
          src={instructions_imgSrc}
          style={{ height: (49 * vhScaleFactor) + 'vh' }}
          alt=""
        />
      </div>
    )
  }

  isDismissing = false;

  onDismiss() {
    this.isDismissing = true;
    this.flashInterval.start();
  }


  animationStep() {
    let opacity: number;
    if (!this.isDismissing) {
      opacity = this.state.opacity + (2 / GameConsts.fps);
      if (opacity >= 1) {
        opacity = 1;
        this.isDismissing = true;
        this.flashInterval.stop();
      }
    } else {
      opacity = this.state.opacity - (2 / GameConsts.fps);
      if (opacity <= 0) {
        opacity = 0;
        this.flashInterval.stop();
      }
    }

    this.setState({ opacity });
  }
}
