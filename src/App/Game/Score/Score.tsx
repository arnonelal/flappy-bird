import { Component } from 'react';
import { generateNumberFromDigits } from 'utils/generateNumberFromDigits';
import './Score.scss';

import digit0 from 'assets/gameSprites/digits/b/0.png';
import digit1 from 'assets/gameSprites/digits/b/1.png';
import digit2 from 'assets/gameSprites/digits/b/2.png';
import digit3 from 'assets/gameSprites/digits/b/3.png';
import digit4 from 'assets/gameSprites/digits/b/4.png';
import digit5 from 'assets/gameSprites/digits/b/5.png';
import digit6 from 'assets/gameSprites/digits/b/6.png';
import digit7 from 'assets/gameSprites/digits/b/7.png';
import digit8 from 'assets/gameSprites/digits/b/8.png';
import digit9 from 'assets/gameSprites/digits/b/9.png';
import { vhScaleFactor } from 'utils/GameConsts';

const digits = [digit0, digit1, digit2, digit3, digit4, digit5, digit6, digit7, digit8, digit9];


interface Props {
  score: number //int
}

interface State {

}

export default class Score extends Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }


  render() {

    const scoreDigits = generateNumberFromDigits(digits, this.props.score);

    return (
      <div id='Score'>
        <div className='_content'>
          {
            scoreDigits.map((digit, index) => {
              return (
                <img
                  key={index}
                  className={"_digit"}
                  style={{ height: (18 * vhScaleFactor) + 'vh' }}
                  src={digit}
                  alt=""
                />
              );
            })
          }
        </div>
      </div>
    )
  }
}

