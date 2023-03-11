import React, { Component } from 'react';
import './NameInput.scss';
import imgSrc_button_submit from 'assets/gameSprites/leaderboards/submit-button.png';
import { scaledPxToVh } from 'utils/getVhByScaledPx';
import { fpsIntervalController } from 'utils/fpsIntervalController';
import { GameConsts } from 'utils/GameConsts';
import { InOutQuadBlend } from 'utils/animationFormulas';


interface Props {
  onConceal: () => void;
  onSubmit: (name: string) => void;
  score: number;
}

interface State {
  input: string
  animationRevealPct: number; // 0(in)--1(in)
}

export default class NameInput extends Component<Props, State> {

  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  animationInterval = fpsIntervalController.set(() => this.animationStep());
  isConcealing = false;


  constructor(props: Props) {
    super(props);
    this.state = {
      input: '',
      animationRevealPct: 0,
    };
  }


  componentDidMount(): void {
    this.inputRef.current?.focus();
    this.animationInterval.start();
  }


  componentWillUnmount(): void {
    this.animationInterval.stop();
  }


  render() {
    return (
      <div
        id='NameInput'
        style={{
          top: -80 + (100 * InOutQuadBlend(this.isConcealing ? 1 - this.state.animationRevealPct : this.state.animationRevealPct)) + 'vh',
        }}
      >
        <h1>Enter Your Name</h1>
        {
          this.state.animationRevealPct === 1 &&
          <>
            <input
              ref={this.inputRef}
              className='_input'
              type='text'
              onChange={(e) => this.onInputChange(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter') && this.submit()}
              value={this.state.input}
            />

            <button
              onClick={() => this.submit()}
            >
              <img
                src={imgSrc_button_submit}
                style={{
                  height: scaledPxToVh(14),
                }}
                alt=""
              />
            </button>
          </>
        }

      </div>
    )
  }

  onInputChange(newInput: string) {
    newInput = newInput.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
    this.setState({ input: newInput });
  }

  animationStep() {
    let pct = this.state.animationRevealPct + (1 / GameConsts.fps);
    if (pct >= 1) {
      pct = 1;
      this.animationInterval.stop();
    }

    this.setState({
      animationRevealPct: pct,
    });
  }

  submit() {
    this.props.onSubmit(this.state.input);
    this.setState({ animationRevealPct: 0 });
    this.isConcealing = true;
    this.animationInterval.start();
    setTimeout(() => this.props.onConceal(), 500);
  }

}

