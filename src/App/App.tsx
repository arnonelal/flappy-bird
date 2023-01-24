import React, { Component } from 'react';
import { HandlerHolder } from 'utils/HandlerHolder';
import './App.scss';
import BlackTransitionScreen from '../components/BlackTransitionScreen/BlackTransitionScreen';
import Game from './Game/Game';


interface Props {
}

interface State {
  gameComponentKey: number;
}


export default class App extends Component<Props, State> {

  handlerHolder_BlackTransitionScreen_startTransition = new HandlerHolder<[completion: () => void]>();
  handlerHolder_Game_jump = new HandlerHolder();

  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      gameComponentKey: 0, //for restarting Game component
    };
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this.focusContainer();
  }

  render() {
    return (
      <div
        id="App"
        ref={this.containerRef}
        tabIndex={-1} //for onKeyDown to work
        onMouseDown={() => this.onMouseDown()}
        onKeyDown={(e) => this.onKeyDown(e)}
        onBlur={() => this.focusContainer()}
      >
        <Game
          handler_jump={(callback) => this.handlerHolder_Game_jump.add(callback)}
          onPressRestart={() => this.restartGame()}
          key={this.state.gameComponentKey}
        />
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

  private restartGame() {
    this.handlerHolder_BlackTransitionScreen_startTransition.call(() => {
      this.setState({ gameComponentKey: this.state.gameComponentKey + 1 });
    });
  }

  private focusContainer() {
    this.containerRef.current?.focus();
  }
}
