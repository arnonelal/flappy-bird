import React, { Component, ReactElement, useEffect, useId, useRef } from 'react';
import './Pipes.scss';
import Pipe from './Pipe/Pipe';
import { BasicInterval } from 'utils/BasicInterval';
import { GameConsts } from 'utils/GameConsts';
import { Rect } from 'utils/Rect';
import { FpsIntervalController, fpsIntervalController } from 'utils/fpsIntervalController';
import { useLazyRef } from 'hooks/useLazyRef';
import { useMergedState } from 'hooks/useMergedState';
import { useChanged } from 'hooks/useChanged';
import { FpsIntervalControllerNew, fpsIntervalControllerNew } from 'utils/fpsIntervalControllerNew';

interface Props {
  isMoving: boolean,
  onPipesMove: (gatesLocation: Rect[]) => void,
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


export default function Pipes(props: Props) {

  const movePipesInterval = fpsIntervalControllerNew.set(useId(), (_this) => movePipes(_this));

  const currentPipePos = useRef(0);

  const [state, setState] = useMergedState<State>({
    startingPipeIndex: 0,
    pipesData: [],
    pipesXPos: 0,
  });

  useEffect(() => {
    updateStartingPipePos();
    window.addEventListener('resize', () => updateStartingPipePos());
    updateMovingPipesInterval();

    return () => {
      movePipesInterval.stop();
    }
  }, []);

  useChanged((prev) => {
    if (prev.props.isMoving !== props.isMoving) {
      updateMovingPipesInterval();
    }
    if (prev.state.pipesXPos !== state.pipesXPos) {
      notifyOnGatesMove(state.pipesXPos, state.pipesData);
    }
  }, { props, state });




  function updateMovingPipesInterval() {
    if (props.isMoving) {
      movePipesInterval.start();
    } else {
      movePipesInterval.stop();
    }
  }

  function updateStartingPipePos() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const distanceBetweenPipesInPx = windowHeight * (GameConsts.pipe.distanceVh / 100);
    const distanceBetweenPipesInVw = (distanceBetweenPipesInPx / windowWidth) * 100;

    const startingPipeXIndex = Math.floor(100 / distanceBetweenPipesInVw) + 1;

    setState({ startingPipeIndex: startingPipeXIndex });
  }


  function reducePipes() {
    let pipes = [...state.pipesData]; //create a clone array so the state will update correctly. it doesnt matter that the items remain the same objects

    pipes.forEach(pipe => {
      pipe.index--;
    });
    pipes = pipes.filter(pipe => pipe.index >= 0);

    const startingPipeXIndex = state.startingPipeIndex;

    if (pipes.length === 0
      || pipes[pipes.length - 1].index < startingPipeXIndex
    ) {
      pipes.push({
        index: startingPipeXIndex,
        yPct: Math.floor(Math.random() * 101),
      });
    }

    setState({ pipesData: pipes });

  }

  function movePipes(interval: FpsIntervalControllerNew) {
    let newXPos = state.pipesXPos - (GameConsts.pipe.speed / GameConsts.fps);
    if (newXPos <= -GameConsts.pipe.distanceVh) {
      newXPos += GameConsts.pipe.distanceVh;
      reducePipes();
    }
    setState({ pipesXPos: newXPos });
  }

  function notifyOnGatesMove(pipesXPos: number, pipes: PipeData[]) {

    function getGateAreaForPipe(pipe: PipeData): Rect {
      const x1 = (pipe.index * GameConsts.pipe.distanceVh) + pipesXPos;
      const x2 = x1 + GameConsts.pipe.pipeWidthVh;
      const y1 = getPipeYPos(pipe.yPct) + GameConsts.pipe.segmentHeightVh;
      const y2 = y1 + GameConsts.pipe.gateHeightVh;
      return { x1, y1, x2, y2 };
    }

    const gates: Rect[] = [];

    for (let i = 0; i < cLosestPipesToPlayer.length; i++) {
      const pipe = pipes.find(pipe => pipe.index === cLosestPipesToPlayer[i]);
      if (pipe === undefined) continue;
      gates.push(getGateAreaForPipe(pipe));
    }

    props.onPipesMove(gates);
  }


  return (
    <div id='Pipes' style={{ left: state.pipesXPos + 'vh' }}>
      {state.startingPipeIndex === 0 ? [] : state.pipesData.map((pipeData, i) => {
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


const cLosestPipesToPlayer = (() => {
  const firstPipe = Math.floor((GameConsts.player.leftVh + GameConsts.player.diameterVh) / (GameConsts.pipe.pipeWidthVh + GameConsts.pipe.distanceVh));
  return [firstPipe, firstPipe + 1];
})();



function getPipeYPos(yPosAsPct: number) {
  return GameConsts.pipe.minTopVh + (GameConsts.pipe.maxTopVh - GameConsts.pipe.minTopVh) * (yPosAsPct / 100);
}
