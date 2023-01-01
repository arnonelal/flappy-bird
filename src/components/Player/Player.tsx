import React, { Component } from "react";
import './Player.scss';
import PlayerGraphic from "./PlayerGraphic/PlayerGraphic";


const playerGravity = 180; //pct/sec^2
const playerJumpVelocity = -70; //pct/sec
const playerYPosOnStart = 30 //pct
const maskDiameter = 6; //pct


interface Props {
  onMove: (XPos: number) => void;
  floorYPos: number;
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

      if (newPlayerYPos >= this.props.floorYPos - maskDiameter) { //if player touched or passed through the floor

        this.setState({
          phase: 'dead',
          playerYPos: this.props.floorYPos - maskDiameter
        });

        clearInterval(this.movementInverval);

      } else {

        this.setState({ playerYPos: this.state.playerYPos + (this.playerSpeed / this.props.fps) });

      }
    }, ms);
  }

  onClick() {
    if (this.state.phase === 'dead') return;

    if (this.state.playerYPos > 10) {
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
          // width: maskDiameter + '%'
        }}>
        <div
          style={{
            height: this.state.playerYPos + '%',
          }}
        >
        </div>
        <div
          className='_mask'
          style={{
            height: maskDiameter + '%',
          }}
        >

          <PlayerGraphic
            clickHandler={(callback) => this.clickHandlerCallback = callback}
            fps={this.props.fps}
          />
        </div>
      </div>
    );
  }
}
