import { Component } from 'react';
import { fpsIntervalController } from 'utils/fpsIntervalController';
import { GameConsts } from 'utils/GameConsts';
import { Timeout } from 'utils/Timeout';
import './BlackTransitionScreen.scss';



interface Props {
  handler_startTransition: (callback: (onFinishCover: () => void) => void) => void
}

interface State {
  opacity: number; //0-1
}

export default class BlackTransitionScreen extends Component<Props, State> {

  animation_dim_interval = fpsIntervalController.set(() => this.animation_dim_step());
  animation_fade_interval = fpsIntervalController.set(() => this.animation_fade_step());
  animation_timeout?: Timeout;
  animation_onFinishCover_callback?: () => void;
  animation_isRunning = false;


  constructor(props: Props) {
    super(props);
    this.state = {
      opacity: 0,
    };
  }

  componentDidMount(): void {
    //config handlers
    this.props.handler_startTransition((onFinishCover) => this.startTransition(onFinishCover));
  }

  componentWillUnmount(): void {
    this.animation_dim_interval.stop();
    this.animation_fade_interval.stop();
    this.animation_timeout?.stop();
  }


  render() {
    return (
      <div
        id='BlackTransitionScreen'
        style={{ opacity: this.state.opacity }}
      >
      </div>
    )
  }


  startTransition(onFinishCover: () => void) {
    if (this.animation_isRunning) return;
    this.animation_isRunning = true;
    this.animation_onFinishCover_callback = onFinishCover;
    this.animation_dim_interval.start();
  }


  animation_dim_step() {
    let opacity = this.state.opacity;
    if (opacity >= 1) {
      opacity = 1;
      this.animation_dim_interval.stop();
      this.animation_timeout = new Timeout(200, () => {
        this.animation_onFinishCover_callback?.();
        this.animation_fade_interval.start();
      }
      );
    }
    opacity += (3 / GameConsts.fps);
    this.setState({ opacity });
  }

  animation_fade_step() {
    let opacity = this.state.opacity - (3 / GameConsts.fps);
    if (opacity <= 0) {
      opacity = 0;
      this.animation_fade_interval.stop();
      this.animation_isRunning = false;
    }
    this.setState({ opacity });
  }


}


