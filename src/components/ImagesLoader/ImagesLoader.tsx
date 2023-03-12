import { Component } from 'react';
import './ImagesLoader.scss';



export default class ImagesLoader extends Component {



  render() {
    let paths = require.context('assets', true, /\.(png|jpe?g|svg)$/).keys();
    paths = paths.map(path => {
      if (path[0] === '.')
        return 'assets' + path.substring(1);
      else
        return path;
    })
    console.log(paths[0]);
    console.log(paths[0] === 'assets/gameSprites/background/0.png');

    return (
      <div id='ImagesLoader'>
        {paths.map((path, index) =>
          <img src={require('../../' + path)} key={index} />
        )}
      </div>
    )
  }
}

