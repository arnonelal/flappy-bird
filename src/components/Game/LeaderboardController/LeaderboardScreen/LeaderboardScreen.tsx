import { Component } from 'react';
import { InOutQuadBlend } from 'utils/animationFormulas';
import { fpsIntervalController } from 'utils/fpsIntervalController';
import { GameConsts } from 'utils/GameConsts';
import { scaledPxToVh } from 'utils/getVhByScaledPx';
import './LeaderboardScreen.scss';
import ContentBox from './Table/ContentBox/ContentBox';
import HighscoreLoader from './Table/HighscoreLoader/HighscoreLoader';
import playButtonImgSrc from 'assets/gameSprites/welcome/buttons/play.png';

import imgSrc_button_restart from 'assets/gameSprites/scoreboard/buttons/restart.png';
import imgSrc_button_share from 'assets/gameSprites/scoreboard/buttons/share.png';

interface Props {
  score?: number;
  onClick_restart: () => void;
  onClick_share: () => void;
}

interface State {
  animationRevealPct: number; // 0(in)--1(in)
}

export default class LeaderboardScreen extends Component<Props, State> {

  animationInterval = fpsIntervalController.set(() => this.animationStep());
  isConcealing = false;


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
    return (
      <div
        id='LeaderboardScreen'
        style={{
          top: 100 - (93 * InOutQuadBlend(this.isConcealing ? 1 - this.state.animationRevealPct : this.state.animationRevealPct)) + 'vh',
        }}
      >
        <h1>Leaderboard</h1>
        {this.props.score !== undefined && <h2>Your Score: {this.props.score}</h2>}
        <ContentBox
          innerContent={<HighscoreLoader />}
        />
        <div style={{ marginTop: '5vh' }}>
          {this.props.score === undefined ?
            <button onClick={() => this.props.onClick_restart()}>
              <img
                src={playButtonImgSrc}
                style={{
                  height: scaledPxToVh(29),
                }}
                alt=''
              />
            </button>
            :
            <>
              <button
                onClick={() => this.props.onClick_restart()}
              >
                <img
                  src={imgSrc_button_restart}
                  style={{
                    height: scaledPxToVh(14),
                  }}
                  alt=""
                />
              </button>
              <button
                onClick={() => this.props.onClick_share()}
                style={{
                  marginLeft: scaledPxToVh(6),
                }}
              >
                <img
                  src={imgSrc_button_share}
                  style={{
                    height: scaledPxToVh(14),
                  }}
                  alt=""
                />
              </button>
            </>
          }

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

