import { Component } from 'react';
import './ScoreBoard.scss';

import scoreboardImgSrc from 'assets/gameSprites/scoreboard/board.png';

import medalBronze from 'assets/gameSprites/scoreboard/medals/bronze.png';
import medalSilver from 'assets/gameSprites/scoreboard/medals/silver.png';
import medalGold from 'assets/gameSprites/scoreboard/medals/gold.png';
import medalPlatinum from 'assets/gameSprites/scoreboard/medals/platinum.png';

import newHighscoreImgSrc from 'assets/gameSprites/scoreboard/new-highscore.png';

import digit0 from 'assets/gameSprites/digits/s/0.png';
import digit1 from 'assets/gameSprites/digits/s/1.png';
import digit2 from 'assets/gameSprites/digits/s/2.png';
import digit3 from 'assets/gameSprites/digits/s/3.png';
import digit4 from 'assets/gameSprites/digits/s/4.png';
import digit5 from 'assets/gameSprites/digits/s/5.png';
import digit6 from 'assets/gameSprites/digits/s/6.png';
import digit7 from 'assets/gameSprites/digits/s/7.png';
import digit8 from 'assets/gameSprites/digits/s/8.png';
import digit9 from 'assets/gameSprites/digits/s/9.png';
import { GameConsts, vhScaleFactor } from 'utils/GameConsts';
import { generateNumberFromDigits } from 'utils/generateNumberFromDigits';
import MedalSparks from './MedalSparks/MedalSparks';
import { fpsIntervalController } from 'utils/fpsIntervalController';
import { InOutQuadBlend } from 'utils/animationFormulas';

const digits = [digit0, digit1, digit2, digit3, digit4, digit5, digit6, digit7, digit8, digit9];


interface Props {
  score: number | null;
  highscore: number | null;
  isNewHighscore: boolean;
  medal: 'bronze' | 'silver' | 'gold' | 'platinum' | null;
}

interface State {
  animationRevealPct: number; // 0(in)--1(in)

}

export default class ScoreBoard extends Component<Props, State> {

  animationInterval = fpsIntervalController.set(() => this.animationStep());


  constructor(props: Props) {
    super(props);
    this.state = {
      animationRevealPct: 0,
    };
  }

  componentDidMount(): void {
    this.animationInterval.start();
  }

  componentWillUnmount(): void {
    this.animationInterval.stop();
  }

  render() {

    const scoreDigits = this.props.score === null ? null : generateNumberFromDigits(digits, this.props.score);
    const highscoreDigits = this.props.highscore === null ? null : generateNumberFromDigits(digits, this.props.highscore);


    return (
      <div
        id='ScoreBoard'
        style={{
          top: 100 - (62 * InOutQuadBlend(this.state.animationRevealPct)) + 'vh',
        }}
      >
        <div className='_content'>
          <img
            src={scoreboardImgSrc}
            style={{ height: (57 * vhScaleFactor) + 'vh' }}
            alt=""
          />
          {
            this.props.medal === null ? null :
              <div
                className='_medalContainer'
                style={{
                  top: (21 * vhScaleFactor) + 'vh',
                  left: (13 * vhScaleFactor) + 'vh',
                }}
              >
                <img
                  className='_medal'
                  src={getMedalImgSrc(this.props.medal)}
                  style={{
                    height: (22 * vhScaleFactor) + 'vh',
                  }}
                  alt=""
                />
                <MedalSparks />
              </div>
          }

          <Number num={this.props.score} top={17} />
          <Number num={this.props.highscore} top={38} />
          {this.props.isNewHighscore ?
            <img
              src={newHighscoreImgSrc}
              style={{
                position: 'absolute',
                height: (7 * vhScaleFactor) + 'vh',
                top: (29 * vhScaleFactor) + 'vh',
                left: (68 * vhScaleFactor) + 'vh',
              }}
              alt=""
            /> : null}
        </div>
      </div>
    )
  }

  animationStep() {
    let pct = this.state.animationRevealPct + (2 / GameConsts.fps);
    if (pct >= 1) {
      pct = 1;
      this.animationInterval.stop();
    }

    this.setState({
      animationRevealPct: pct,
    });
  }
}


function getMedalImgSrc(medal: 'bronze' | 'silver' | 'gold' | 'platinum') {
  switch (medal) {
    case 'bronze': return medalBronze;
    case 'silver': return medalSilver;
    case 'gold': return medalGold;
    case 'platinum': return medalPlatinum;
  }
}


function Number(props: { num: number | null, top: number }) {
  const numDigits = props.num === null ? null : generateNumberFromDigits(digits, props.num);

  return (
    <div
      className='_score _number'
      style={{
        top: (props.top * vhScaleFactor) + 'vh',
        right: (11 * vhScaleFactor) + 'vh',
      }}
    >

      {
        numDigits === null ? null : numDigits.map((digit, index) => {
          return (
            <img
              key={index}
              className={"_digit"}
              style={{ height: (7 * vhScaleFactor) + 'vh' }}
              src={digit}
              alt=""
            />
          );
        })
      }
    </div>
  )
}