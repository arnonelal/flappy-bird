import Floor from '../Game/Floor/Floor';
import Player from '../Game/Player/Player';
import { Component } from 'react';

import './Welcome.scss';
import Background from '../Game/Background/Background';
import { scaledPxToVh } from 'utils/getVhByScaledPx';

import wellcomeImgSrc from 'assets/gameSprites/welcome/welcome.png';
import leaderboardButtonImgSrc from 'assets/gameSprites/welcome/buttons/leaderboard.png';
import playButtonImgSrc from 'assets/gameSprites/welcome/buttons/play.png';


interface Props {
  onPressLeaderboards: () => void;
  onPressPlay: () => void;
}

interface State {
}

export default class Welcome extends Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
      playerGatePhase: 'leavingOrOutside',
      score: 0,
      isMainScoreCompShowing: true,
    };
  }

  render() {
    return (
      <div id='Welcome'>

        <Background randomSeedForGraphics={0} />

        <Player
          handler_onJump={(callback) => 0}
          onUpdateFlyingPos={(rect) => 0}
          onCrashFloor={() => 0}
          startingLeftPosVw={50}
          startingTopPosVh={44}
        />
        <Floor
          isMoving={true}
        />
        <div className='_staticContainer'>
          <img
            src={wellcomeImgSrc}
            style={{
              height: scaledPxToVh(24),
              marginTop: '24vh',
              marginBottom: '20vh',
            }}
            alt=''
          />
          <div>
            <button onClick={() => this.props.onPressPlay()}>
              <img
                src={playButtonImgSrc}
                style={{
                  height: scaledPxToVh(29),
                }}
                alt=''
              />
            </button>
            <span style={{ width: '5vh' }} />
            <button onClick={() => this.props.onPressLeaderboards()}>
              <img
                src={leaderboardButtonImgSrc}
                style={{
                  height: scaledPxToVh(29),
                }}
                alt=''
              />
            </button>
          </div>
        </div>

      </div>
    )
  }

}

