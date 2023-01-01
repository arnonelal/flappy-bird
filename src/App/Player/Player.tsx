import React, { Component } from "react";
import './Player.scss';
import PlayerGraphic from "./PlayerGraphic/PlayerGraphic";


const playerGravity = 180; //vh/sec^2
const playerJumpVelocity = -70; //vh/sec
const playerYPosOnStart = 30 //vh
const maskDiameter = 4.6875; //vh 12/256
const floorYPos = 78.125;  //vh 200/256

interface Props {
  onMove: (XPos: number) => void;
  fps: number;
  clickHandler: (callback: () => void) => void;
  onChangePhase: (phase: 'preGame' | 'onGame' | 'dead') => void;
}

interface State {
  playerYPos: number; //vh
  phase: 'preGame' | 'onGame' | 'dead';
}

export default class Player extends Component<Props, State> {

  movementInverval?: NodeJS.Timer;

  playerSpeed = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      playerYPos: playerYPosOnStart,
      phase: 'preGame',
    };
  }

  componentDidMount(): void {
    this.props.clickHandler(() => this.onClick());

    this.playerSpeed = 10;
    this.movementInverval = this.getPreGameInterval();
  }

  componentWillUnmount(): void {
    clearInterval(this.movementInverval);
  }

  getPreGameInterval() {
    const ms = 1000 / this.props.fps;

    return setInterval(() => {

      let distance = this.state.playerYPos - playerYPosOnStart;


      const centerGravityFactor = 0.2;

      this.playerSpeed -= (distance / (centerGravityFactor)) / this.props.fps;


      let yPos = this.state.playerYPos + (this.playerSpeed / this.props.fps);

      this.setState({ playerYPos: yPos });

    }, ms);
  }

  getOnGameInterval() {
    const ms = 1000 / this.props.fps;

    return setInterval(() => {
      this.playerSpeed += playerGravity / this.props.fps;
      let newPlayerYPos = this.state.playerYPos + (this.playerSpeed / this.props.fps);

      if (newPlayerYPos >= floorYPos - maskDiameter) { //if player touched or passed through the floor

        this.setState({
          phase: 'dead',
          playerYPos: floorYPos - maskDiameter
        });

        clearInterval(this.movementInverval);

      } else {

        this.setState({ playerYPos: this.state.playerYPos + (this.playerSpeed / this.props.fps) });

      }
    }, ms);
  }

  onClick() {
    if (this.state.phase === 'dead') return;

    if (this.state.playerYPos > 0) {
      this.makePlayerJump();
    }


    if (this.state.phase === 'preGame') {
      clearInterval(this.movementInverval);
      this.movementInverval = this.getOnGameInterval();
      this.setState({ phase: 'onGame' });
    }


    this.clickHandlerCallback?.();

  }

  makePlayerJump() {
    this.playerSpeed = playerJumpVelocity;
  }

  clickHandlerCallback: (() => void) | null = null;


  render() {

    return (
      <div
        id="Player"
        style={{
          width: maskDiameter + 'vh',
          height: maskDiameter + 'vh',
          top: this.state.playerYPos + 'vh',
          left: playerYPosOnStart + 'vh',
        }}
      >
        <PlayerGraphic
          clickHandler={(callback) => this.clickHandlerCallback = callback}
          fps={this.props.fps}
        />
      </div>
    );
  }
}
