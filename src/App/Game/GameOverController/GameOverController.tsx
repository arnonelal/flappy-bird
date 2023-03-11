import { Component } from 'react';
import { Cookies } from 'react-cookie';
import DeathFlashScreen from './DeathFlashScreen/DeathFlashScreen';
import GameOverTitle from './GameOverTitle/GameOverTitle';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import Buttons from './Buttons/Buttons';
import './GameOverController.scss';
import { HandlerHolder } from 'utils/HandlerHolder';




interface Props {
  handler_setGameOver: (callback: (score: number) => void) => void;
  onClick_restart: () => void;
  onClick_share: () => void;
  onShowGameOverTitle: () => void;
  onReadyToRevealLeaderboardFlow: () => void
}

interface State {
  phase: number; //0-inactive | 1-deathflash | 2-title | 3-scoreboard | 4-scoreAndButtons | 5-concealing
  scoreData: {
    score: number,
    highscore: number,
    medal: 'bronze' | 'silver' | 'gold' | 'platinum' | null,
    isNewHighscore: boolean,
  } | null,
}

export default class GameOverController extends Component<Props, State> {

  handlerHolder_Scoreboard_conceal = new HandlerHolder();

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
        {this.state.phase >= 2 && this.state.phase !== 5 ?
          <GameOverTitle
          /> : null
        }
        {this.state.phase >= 3 ?
          <ScoreBoard
            score={this.state.scoreData?.score ?? null}
            highscore={this.state.scoreData?.highscore ?? null}
            isNewHighscore={this.state.scoreData?.isNewHighscore ?? false}
            medal={this.state.scoreData?.medal ?? null}
            handler_conceal={(callback) => this.handlerHolder_Scoreboard_conceal.add(callback)}
          /> : null
        }
        {this.state.phase === 4 ?

          <Buttons
            onClick_restart={() => this.props.onClick_restart()}
            onClick_share={() => this.props.onClick_share()}
            onCLick_addToLeaderboard={() => this.conceal()}
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

  conceal() {
    this.handlerHolder_Scoreboard_conceal.call();
    this.setState({ phase: 5 });
    setTimeout(() => this.props.onReadyToRevealLeaderboardFlow(), 600);
  }
}