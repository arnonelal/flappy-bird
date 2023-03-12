import React, { Component } from 'react';
import { HandlerHolder } from 'utils/HandlerHolder';
import './App.scss';
import BlackTransitionScreen from '../components/BlackTransitionScreen/BlackTransitionScreen';
import Game from 'components/Game/Game';
import 'assets/fonts/flappy.ttf';
import ContentBox from 'components/Game/LeaderboardController/LeaderboardScreen/Table/ContentBox/ContentBox';
import Table from 'components/Game/LeaderboardController/LeaderboardScreen/Table/Table';
import Welcome from 'components/Welcome/Welcome';
import LeaderboardScreen from 'components/Game/LeaderboardController/LeaderboardScreen/LeaderboardScreen';
import ImagesLoader from 'components/ImagesLoader/ImagesLoader';



interface Props {
}

interface State {
  gameComponentKey: number;
  phase: 'welcome' | 'game' | 'leaderboards';
}


export default class App extends Component<Props, State> {

  handlerHolder_BlackTransitionScreen_startTransition = new HandlerHolder<[completion: () => void]>();
  handlerHolder_Game_jump = new HandlerHolder();

  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      gameComponentKey: 0, //for restarting Game component
      phase: 'welcome',
    };
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this.tryToFocusContainer();
  }

  render() {
    return (
      <div
        id="App"
        ref={this.containerRef}
        tabIndex={-1} //for onKeyDown to work
        onMouseDown={() => this.onMouseDown()}
        onKeyDown={(e) => this.onKeyDown(e)}
        onBlur={() => this.tryToFocusContainer()}
      >
        <ImagesLoader />
        {(this.state.phase === 'welcome' || this.state.phase === 'leaderboards') && <Welcome
          onPressLeaderboards={() => this.setState({ phase: 'leaderboards' })}
          onPressPlay={() => this.startGame()}
        />}
        {this.state.phase === 'leaderboards' && <LeaderboardScreen
          onClick_restart={() => this.startGame()}
          onClick_share={() => 0}
        />}
        {this.state.phase === 'game' && <Game
          handler_jump={(callback) => this.handlerHolder_Game_jump.add(callback)}
          onPressRestart={() => this.restartGame()}
          key={this.state.gameComponentKey}
        />}

        <BlackTransitionScreen
          handler_startTransition={(callback) => this.handlerHolder_BlackTransitionScreen_startTransition.add(callback)}
        />
      </div>
    );
  }


  private onMouseDown() {
    this.handlerHolder_Game_jump.call();
  }

  private onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.code === 'Space') {
      this.handlerHolder_Game_jump.call();
    }
  }

  private startGame() {
    this.handlerHolder_BlackTransitionScreen_startTransition.call(() => {
      this.setState({ phase: 'game' });
    });
  }

  private restartGame() {
    this.handlerHolder_BlackTransitionScreen_startTransition.call(() => {
      this.setState({ gameComponentKey: this.state.gameComponentKey + 1 });
    });
  }

  private tryToFocusContainer() {
    setTimeout(() => {
      if (document.activeElement?.tagName.toLowerCase() === 'input') {
        return;
      }
      this.containerRef.current?.focus();
    }, 1);

  }
}
