import { Component } from 'react';
import { submitHighscore } from 'utils/fetch';
import './LeaderboardController.scss';
import LeaderboardScreen from './LeaderboardScreen/LeaderboardScreen';
import NameInput from './NameInput/NameInput';



interface Props {
  score: number,
  handler_startFlow: (callback: () => void) => void;
  onClick_restart: () => void;
  onClick_share: () => void;
}

interface State {
  phase: number //0-inactive 1-nameInput 2-leaderboard
}

export default class LeaderboardController extends Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
      phase: 0,
    };

    //config props
    props.handler_startFlow(() => this.startFlow());
  }


  render() {
    return (
      <div id='LeaderboardController'>
        {this.state.phase === 1 ?
          <NameInput
            score={this.props.score}
            onSubmit={(name) => this._submitHighscore(name)}
            onConceal={() => this.setState({ phase: 2 })}
          />
          : null}
        {this.state.phase === 2 ?
          <LeaderboardScreen
            onClick_restart={() => this.props.onClick_restart()}
            onClick_share={() => this.props.onClick_share()}
            score={this.props.score}
          />
          : null}

      </div>
    )
  }

  _submitHighscore(name: string) {
    submitHighscore(name, this.props.score);
  }

  startFlow() {
    this.setState({ phase: 1 });
  }
}

