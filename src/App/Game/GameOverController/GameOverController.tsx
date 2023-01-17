import { Component } from 'react';
import { Cookies } from 'react-cookie';
import { openSharePage, redirectToScoreSubmittionPage } from 'utils/openUrls';
import DeathFlashScreen from './DeathFlashScreen/DeathFlashScreen';
import GameOverTitle from './GameOverTitle/GameOverTitle';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import Buttons from './Buttons/Buttons';
import './GameOverController.scss';




interface Props {
  handler_setGameOver: (callback: (score: number) => void) => void;
  onPressRestart: () => void;
  onShowGameOverTitle: () => void;
}

interface State {
  phase: number; //0-4 0-inactive | 1-deathflash | 2-title | 3-scoreboard | 4-scoreAndButtons
  scoreData: {
    score: number,
    highscore: number,
    medal: 'bronze' | 'silver' | 'gold' | 'platinum' | null,
    isNewHighscore: boolean,
  } | null,
}

export default class GameOverController extends Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
      phase: 0,
      scoreData: null,
    };

    //config props
    props.handler_setGameOver((score) => this.setGameOver(score));
  }


  render() {
    return (
      <div id='GameOverController'>
        {this.state.phase >= 1 ?
          <DeathFlashScreen
          /> : null
        }
        {this.state.phase >= 2 ?
          <GameOverTitle
          /> : null
        }
        {this.state.phase >= 3 ?
          <ScoreBoard
            score={this.state.scoreData?.score ?? null}
            highscore={this.state.scoreData?.highscore ?? null}
            isNewHighscore={this.state.scoreData?.isNewHighscore ?? false}
            medal={this.state.scoreData?.medal ?? null}
          /> : null
        }
        {this.state.phase >= 4 ?

          <Buttons
            onClick_restart={() => this.props.onPressRestart()}
            onClick_share={() => openSharePage()}
            onCLick_addToLeaderboard={() => redirectToScoreSubmittionPage()}
          /> : null
        }
      </div>
    )
  }

  setGameOver(score: number) {
    this.setState({ phase: 1 });
    setTimeout(() => {
      this.setState({ phase: 2 });
      this.props.onShowGameOverTitle();
      setTimeout(() => {
        this.setState({ phase: 3 });
        setTimeout(() => {
          this.setScoreData(score);
          this.setState({ phase: 4 });
        }, 1000);
      }, 1000);
    }, 1000);
  }


  setScoreData(score: number) {

    //get local highscore
    const cookies = new Cookies();
    const cookieName = 'flappybird-highscore';
    let highscore = cookies.get(cookieName);
    let isNewHighscore = false;
    if (highscore === undefined || !Number.isInteger(Number(highscore)) || Number(highscore) < score) {
      isNewHighscore = true;
      highscore = score;
      cookies.set(cookieName, score, { path: '/' });
    } else {
      highscore = Number(highscore);
    }

    //get medal
    let medal: 'bronze' | 'silver' | 'gold' | 'platinum' | null = null;
    if (score >= 40) {
      medal = 'platinum';
    } else if (score >= 30) {
      medal = 'gold';
    } else if (score >= 20) {
      medal = 'silver';
    } else if (score >= 10) {
      medal = 'bronze';
    }

    this.setState({
      scoreData: {
        score,
        highscore,
        isNewHighscore,
        medal,
      }
    });
  }
}