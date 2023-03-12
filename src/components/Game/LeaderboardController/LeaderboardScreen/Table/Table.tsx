import { Component } from 'react';
import './Table.scss';
import ContentBox from './ContentBox/ContentBox';
import HighscoreLoader from './HighscoreLoader/HighscoreLoader';



interface Props {

}

interface State {

}

export default class Table extends Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div id='Table'>
        <ContentBox
          innerContent={<HighscoreLoader />}
        />
      </div>
    )
  }
}

