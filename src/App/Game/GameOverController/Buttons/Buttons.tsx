import { Component } from 'react';
import './Buttons.scss';


import imgSrc_button_restart from 'assets/gameSprites/scoreboard/buttons/restart.png';
import imgSrc_button_share from 'assets/gameSprites/scoreboard/buttons/share.png';
import imgSrc_button_addToLeaderboard from 'assets/gameSprites/scoreboard/buttons/add-to-leaderboard.png';
import { scaledPxToVh as getVhByScaledPx } from 'utils/getVhByScaledPx';



interface Props {
  onClick_restart: () => void;
  onClick_share: () => void;
  onCLick_addToLeaderboard: () => void;
}

interface State {

}

export default class Buttons extends Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div id='Buttons'>
        <>
          <div>
            <button
              onClick={() => this.props.onClick_restart()}
            >
              <img
                src={imgSrc_button_restart}
                style={{
                  height: getVhByScaledPx(14),
                }}
                alt=""
              />
            </button>
            <button
              onClick={() => this.props.onClick_share()}
              style={{
                marginLeft: getVhByScaledPx(6),
              }}
            >
              <img
                src={imgSrc_button_share}
                style={{
                  height: getVhByScaledPx(14),
                }}
                alt=""
              />
            </button>
          </div>
          <div>
            <button
              onClick={() => this.props.onCLick_addToLeaderboard()}
              style={{
                marginTop: getVhByScaledPx(4),
              }}
            >
              <img
                src={imgSrc_button_addToLeaderboard}
                style={{
                  height: getVhByScaledPx(14),
                }}
                alt=""
              />
            </button>
          </div>
        </>
      </div>
    )
  }
}

