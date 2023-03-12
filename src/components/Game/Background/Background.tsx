import { Component } from 'react';
import './Background.scss';
import bg0 from 'assets/gameSprites/background/0.png';
import bg1 from 'assets/gameSprites/background/1.png';
import { getItemFromSeed } from 'utils/getItemFromSeed';

const bgs = [bg0, bg1];


interface Props {
  randomSeedForGraphics: number; //between 0-1
}

interface State {
}

export default class Background extends Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const bgSrc = getItemFromSeed(bgs, this.props.randomSeedForGraphics);

    return (
      <div
        id='Background'
        style={{ backgroundImage: `url(${bgSrc})` }}
      >

      </div>
    )
  }
}

