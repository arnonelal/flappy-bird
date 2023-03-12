import React, { Component, ReactElement } from 'react';
import './Pipes.scss';
import Pipe from './Pipe/Pipe';
import { BasicInterval } from 'utils/BasicInterval';
import { GameConsts } from 'utils/GameConsts';
import { Rect } from 'utils/Rect';
import { FpsIntervalController, fpsIntervalController } from 'utils/fpsIntervalController';
import { vwToVh } from 'utils/vhToVw';

interface Props {
  isMoving: boolean,
  onPipesMove: (gatesLocation: Rect[]) => void,
  playerLeftPosVw: number,
}

interface State {
  startingPipeIndex: number;
  pipesData: PipeData[];
  pipesXPos: number; //vh
}

interface PipeData {
  yPct: number, //1-100. represents the pipe's y position
  index: number,
}


export default class Pipes extends Component<Props, State> {

  movePipesInterval = fpsIntervalController.set((_this) => this.movePipes(_this));

  currentPipePos: number = 0;


  constructor(props: Props) {
    super(props);
    this.state = {
      startingPipeIndex: 0,
      pipesData: [],
      pipesXPos: 0,
    };
  }

  componentDidMount(): void {
    this.updateStartingPipePos();
    window.addEventListener('resize', () => this.updateStartingPipePos());

    this.updateMovingPipesInterval();
  }

  componentWillUnmount(): void {
    this.movePipesInterval.stop();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (prevProps.isMoving !== this.props.isMoving) {
      this.updateMovingPipesInterval();
    }
    if (prevState.pipesXPos !== this.state.pipesXPos) {
      this.notifyOnGatesMove(this.state.pipesXPos, this.state.pipesData);
    }
  }

  render() {
    return (
      <div id='Pipes' style={{ left: this.state.pipesXPos + 'vh' }}>
        {this.state.startingPipeIndex === 0 ? [] : this.state.pipesData.map((pipeData, i) => {
          return (
            <Pipe
              key={i}
              yPos={getPipeYPos(pipeData.yPct)}
              xPos={pipeData.index * GameConsts.pipe.distanceVh}
            />
          );
        })}
      </div>
    );
  }

  private updateMovingPipesInterval() {
    if (this.props.isMoving) {
      this.movePipesInterval.start();
    } else {
      this.movePipesInterval.stop();
    }
  }

  private updateStartingPipePos() {
    console.log('a');
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const distanceBetweenPipesInPx = windowHeight * (GameConsts.pipe.distanceVh / 100);
    const distanceBetweenPipesInVw = (distanceBetweenPipesInPx / windowWidth) * 100;

    const startingPipeXIndex = Math.floor(100 / distanceBetweenPipesInVw) + 1;

    this.setState({ startingPipeIndex: startingPipeXIndex });
  }


  private reducePipes() {
    console.log('reduce');
    let pipes = [...this.state.pipesData]; //create a clone array so the state will update correctly. it doesnt matter that the items remain the same objects

    pipes.forEach(pipe => {
      pipe.index--;
    });
    pipes = pipes.filter(pipe => pipe.index >= 0);

    const startingPipeXIndex = this.state.startingPipeIndex;

    if (pipes.length === 0
      || pipes[pipes.length - 1].index < startingPipeXIndex
    ) {
      pipes.push({
        index: startingPipeXIndex,
        yPct: Math.floor(Math.random() * 101),
      });
    }

    this.setState({ pipesData: pipes });

  }

  private movePipes(interval: FpsIntervalController) {
    let newXPos = this.state.pipesXPos - (GameConsts.pipe.speed / GameConsts.fps);
    if (newXPos <= -GameConsts.pipe.distanceVh) {
      newXPos += GameConsts.pipe.distanceVh;
      this.reducePipes();
    }
    this.setState({ pipesXPos: newXPos });
  }

  private notifyOnGatesMove(pipesXPos: number, pipes: PipeData[]) {

    function getGateAreaForPipe(pipe: PipeData): Rect {
      const x1 = (pipe.index * GameConsts.pipe.distanceVh) + pipesXPos;
      const x2 = x1 + GameConsts.pipe.pipeWidthVh;
      const y1 = getPipeYPos(pipe.yPct) + GameConsts.pipe.segmentHeightVh;
      const y2 = y1 + GameConsts.pipe.gateHeightVh;
      return { x1, y1, x2, y2 };
    }

    const gates: Rect[] = [];

    for (let i = 0; i < this.cLosestPipesToPlayer.length; i++) {
      const pipe = pipes.find(pipe => pipe.index === this.cLosestPipesToPlayer[i]);
      if (pipe === undefined) continue;
      gates.push(getGateAreaForPipe(pipe));
    }

    this.props.onPipesMove(gates);
  }

  cLosestPipesToPlayer = (() => {
    const firstPipe = Math.floor((vwToVh(this.props.playerLeftPosVw) + GameConsts.player.diameterVh) / (GameConsts.pipe.pipeWidthVh + GameConsts.pipe.distanceVh));
    return [firstPipe, firstPipe + 1];
  })();

}






function getPipeYPos(yPosAsPct: number) {
  return GameConsts.pipe.minTopVh + (GameConsts.pipe.maxTopVh - GameConsts.pipe.minTopVh) * (yPosAsPct / 100);
}
