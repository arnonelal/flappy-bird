import React, { Component } from "react";
import { FpsIntervalController, fpsIntervalController } from "utils/fpsIntervalController";
import { GameConsts } from "utils/GameConsts";
import { Rect } from "utils/Rect";
import './Player.scss';
import PlayerGraphic from "./PlayerGraphic/PlayerGraphic";


interface Props {
  onUpdateFlyingPos: (rect: Rect) => void;
  onCrashFloor: () => void;

  handler_onJump: (callback: () => void) => void;
}

interface State {
  playerTopPos: number; //vh
  phase: 'preGame' | 'onGame' | 'dead';
}

export default class Player extends Component<Props, State> {

  glideInverval = fpsIntervalController.add((_this) => this.glideStep(_this));
  flyInverval = fpsIntervalController.add((_this) => this.flyStep(_this));

  playerSpeed = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      playerTopPos: GameConsts.player.glidingMechanics.topOnStartVh,
      phase: 'preGame',
    };
  }

  componentDidMount(): void {
    this.props.handler_onJump(() => this.onClick());

    this.playerSpeed = 10;
    this.glideInverval.start();
  }

  componentWillUnmount(): void {
    this.glideInverval.stop();
    this.flyInverval.stop();
  }

  glideStep(interval: FpsIntervalController) {
    let distance = this.state.playerTopPos - GameConsts.player.glidingMechanics.speed;
    this.playerSpeed -= (distance / (GameConsts.player.glidingMechanics.centricGravity)) / GameConsts.fps;
    let yPos = this.state.playerTopPos + (this.playerSpeed / GameConsts.fps);
    this.setState({ playerTopPos: yPos });
  }

  flyStep(interval: FpsIntervalController) {

    this.playerSpeed += GameConsts.player.flyingMechanics.gravity / GameConsts.fps;
    let newPlayerYPos = this.state.playerTopPos + (this.playerSpeed / GameConsts.fps);

    if (newPlayerYPos >= (100 - GameConsts.floor.heightVh) - GameConsts.player.diameterVh) { //if player touched or passed through the floor

      this.setState({
        phase: 'dead',
        playerTopPos: (100 - GameConsts.floor.heightVh) - GameConsts.player.diameterVh
      });

      this.props.onCrashFloor();

      this.flyInverval.stop();

    } else {
      const topPos = this.state.playerTopPos + (this.playerSpeed / GameConsts.fps);
      this.setState({ playerTopPos: topPos });
      this.props.onUpdateFlyingPos({
        x1: GameConsts.player.leftVh,
        y1: topPos,
        x2: GameConsts.player.leftVh + GameConsts.player.diameterVh,
        y2: topPos + GameConsts.player.diameterVh,
      });
    }
  }

  onClick() {
    if (this.state.phase === 'dead') return;

    if (this.state.playerTopPos > 0) {
      this.makePlayerJump();
    }


    if (this.state.phase === 'preGame') {
      this.glideInverval.stop();
      this.flyInverval.start();
      this.setState({ phase: 'onGame' });
    }


    this.clickHandlerCallback?.();

  }

  makePlayerJump() {
    this.playerSpeed = GameConsts.player.flyingMechanics.jumpVelocity;
  }

  clickHandlerCallback: (() => void) | null = null;


  render() {

    return (
      <div
        id="Player"
        style={{
          width: GameConsts.player.diameterVh + 'vh',
          height: GameConsts.player.diameterVh + 'vh',
          top: this.state.playerTopPos + 'vh',
          left: GameConsts.player.leftVh + 'vh',
        }}
      >
        <PlayerGraphic
          clickHandler={(callback) => this.clickHandlerCallback = callback}
          fps={GameConsts.fps}
        />
      </div>
    );
  }
}
