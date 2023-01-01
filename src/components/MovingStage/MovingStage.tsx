import { Component } from 'react';
import './MovingStage.scss';
import Floor from './Floor/Floor';



interface Props {
  fps: number;
}

interface State {

}

export default class MovingStage extends Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }


  render() {
    return (
      <div id='MovingStage'>
        <Floor
          fps={this.props.fps}
        />
      </div>
    )
  }
}

