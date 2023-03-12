import { Component } from 'react';
import './Pipe.scss';
import topPipe from 'assets/gameSprites/pipe/top.png';
import bottomPipe from 'assets/gameSprites/pipe/bottom.png';
import { GameConsts } from 'utils/GameConsts';



interface Props {
  xPos: number; //vh
  yPos: number; //vh
}

interface State {
}

export default class Pipe extends Component<Props, State> {



  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }



  render() {
    return (
      <div id='Pipe' style={{ top: this.props.yPos + 'vh', left: this.props.xPos + 'vh' }}>
        <img
          src={topPipe}
          style={{
            width: GameConsts.pipe.pipeWidthVh + 'vh',
            height: GameConsts.pipe.segmentHeightVh + 'vh',
          }}
          alt=''
        ></img>
        <div
          style={{
            height: GameConsts.pipe.gateHeightVh + 'vh',
          }}
        ></div>
        <img
          src={bottomPipe}
          alt=''
          style={{
            width: GameConsts.pipe.pipeWidthVh + 'vh',
            height: GameConsts.pipe.segmentHeightVh + 'vh',
          }}
        ></img>
      </div>
    )
  }
}

