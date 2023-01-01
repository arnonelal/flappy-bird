import { Component } from 'react';
import './Floor.scss';
import floorImgSrc from 'assets/gameSprites/floor.png';

const tileWidth = 4.6875; //vh //12/256


interface Props {
  fps: number;
}

interface State {
  firstTileWidth: number,
}

const tileSpeed = 1 //tiles/sec 

export default class Floor extends Component<Props, State> {

  movementInverval?: NodeJS.Timer;

  constructor(props: Props) {
    super(props);
    this.state = {
      firstTileWidth: tileWidth,
    };
  }

  componentDidMount() {
    this.movementInverval = this.getMovementInterval();
  }

  componentWillUnmount(): void {
    clearInterval(this.movementInverval);
  }

  getMovementInterval() {

    return setInterval(() => {

      const a = (tileSpeed * tileWidth) / this.props.fps; //tile length in pct
      let newWidth = this.state.firstTileWidth - a;
      if (newWidth < 0) {
        newWidth = tileWidth;
      }
      this.setState({ firstTileWidth: newWidth });

    }, 1000 / this.props.fps);
  }


  render() {
    return (
      <div id='Floor'>
        <img
          className='_firstTile'
          src={floorImgSrc}
          alt=""
          style={{ width: this.state.firstTileWidth + 'vh' }}
        />
        <div className='_restOfTiles'></div>
      </div>
    )
  }
}

