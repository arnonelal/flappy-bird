import { Component } from 'react';
import './PlayerMovingSprite.scss';
import bird0 from 'assets/gameSprites/bird/bird0.png';
import bird1 from 'assets/gameSprites/bird/bird1.png';
import bird2 from 'assets/gameSprites/bird/bird2.png';



interface Props {
  isPlayerFlappingWings: boolean;
}

interface State {
  spriteIndex: number;
}

export default class PlayerMovingSprite extends Component<Props, State> {

  movementInverval?: NodeJS.Timer;

  constructor(props: Props) {
    super(props);
    this.state = {
      spriteIndex: 0,
    };
  }

  componentDidMount() {
    this.setMovementInterval();
  }

  componentWillUnmount(): void {
    this.clearMovementInterval();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (prevProps.isPlayerFlappingWings !== this.props.isPlayerFlappingWings) {
      if (this.props.isPlayerFlappingWings) {
        this.setMovementInterval();
      } else {
        this.clearMovementInterval();
        this.setState({ spriteIndex: 1 })
      }
    }
  }


  render() {
    return (
      <img id='PlayerMovingSprite' src={this.getSprite()} alt='' />
    )
  }

  getSprite() {
    switch (this.state.spriteIndex) {
      case 0:
        return bird0;
      case 1:
        return bird1;
      case 2:
        return bird2;
      case 3:
        return bird1;
    }
  }



  setMovementInterval() {
    this.movementInverval = setInterval(() => {
      this.setState({
        spriteIndex: (this.state.spriteIndex + 1) % 4,
      });
    }, 300);
  }

  clearMovementInterval() {
    clearInterval(this.movementInverval);
  }
}

