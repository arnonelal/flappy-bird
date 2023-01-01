import { Component } from 'react';
import './Floor.scss';
import floorImgSrc from '../../../assets/gameSprites/floor.png';


interface Props {
  fps: number;
}

interface State {
  firstTileWidth: number,
}

const tileSpeed = 4 //tiles/sec 

export default class Floor extends Component<Props, State> {

  movementInverval?: NodeJS.Timer;

  constructor(props: Props) {
    super(props);
    this.state = {
      firstTileWidth: 3.25,
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

      const a = (tileSpeed * 3.25) / this.props.fps; //tile length in pct
      let newWidth = this.state.firstTileWidth - a;
      if (newWidth < 0) {
        newWidth += 3.25;
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
          style={{ width: this.state.firstTileWidth + '%' }}
        />
        <div className='_restOfTiles'></div>
      </div>
    )
  }
}

