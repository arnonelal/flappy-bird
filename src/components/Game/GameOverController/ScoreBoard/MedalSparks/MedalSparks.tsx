import { Component } from 'react';
import { BasicInterval } from 'utils/BasicInterval';
import { fpsIntervalController } from 'utils/fpsIntervalController';
import { vhScaleFactor } from 'utils/GameConsts';
import './MedalSparks.scss';

import spark0 from 'assets/gameSprites/scoreboard/sparkle/0.png';
import spark1 from 'assets/gameSprites/scoreboard/sparkle/1.png';
import spark2 from 'assets/gameSprites/scoreboard/sparkle/2.png';

const sparksImgSrc = [spark0, spark1, spark2, spark1, spark0, undefined];


interface Props {

}

interface State {
  sparkPhase: number; //0-5
  sparkTopSeed: number;
  sparkLeftSeed: number;
}

export default class MedalSparks extends Component<Props, State> {

  createSparkInterval = new BasicInterval(() => this.createSpark(), 500);
  fadeSparkInterval = new BasicInterval(() => this.fadeSpark(), 95);



  constructor(props: Props) {
    super(props);
    this.state = {
      sparkPhase: 0,
      sparkTopSeed: 0,
      sparkLeftSeed: 0,
    };
  }

  componentDidMount(): void {
    this.createSparkInterval.start();
    this.fadeSparkInterval.start();
  }

  componentWillUnmount(): void {
    this.createSparkInterval.stop();
    this.fadeSparkInterval.stop();
  }



  render() {
    return (
      <div
        id='MedalSparks'
        style={{
          height: (areaDiameter * vhScaleFactor) + 'vh',
          width: (areaDiameter * vhScaleFactor) + 'vh'
        }}
      >
        <img
          className='_spark'
          style={{
            top: (Math.round(this.state.sparkTopSeed * (areaDiameter - 5)) * vhScaleFactor) + 'vh',
            left: (Math.round(this.state.sparkLeftSeed * (areaDiameter - 5)) * vhScaleFactor) + 'vh',
            height: (5 * vhScaleFactor) + 'vh',
          }}
          src={sparksImgSrc[this.state.sparkPhase]}
          alt=''
        />
      </div>
    )
  }

  createSpark() {
    this.setState({
      sparkTopSeed: Math.random(),
      sparkLeftSeed: Math.random(),
      sparkPhase: 0,
    });
    this.fadeSparkInterval.start();
  }

  fadeSpark() {
    let sparkPhase = this.state.sparkPhase + 1;
    this.setState({ sparkPhase: this.state.sparkPhase + 1 });
    if (sparkPhase === 5) {

      this.fadeSparkInterval.stop();
    }

  }
}

const areaDiameter = 22;
