import { Component } from 'react';
import { scaledPxToVh } from 'utils/getVhByScaledPx';
import './ContentBox.scss';

import img_edge_topLeft from 'assets/gameSprites/leaderboards/edges/top-left.png';
import img_edge_topRight from 'assets/gameSprites/leaderboards/edges/top-right.png';
import img_edge_bottomLeft from 'assets/gameSprites/leaderboards/edges/bottom-left.png';
import img_edge_bottomRight from 'assets/gameSprites/leaderboards/edges/bottom-right.png';

interface Props {
  innerContent: React.ReactNode,
}
export default function ContentBox(props: Props) {

  const heightVh = 50;
  const widthVh = 90;

  return (
    <div id='ContentBox'>
      <div style={{ width: widthVh + 'vh', height: heightVh + 'vh' }} />
      <div style={{ position: 'absolute', flexFlow: 'column', width: widthVh + 'vh' }}>
        <div style={{ height: scaledPxToVh(4) }}></div>
        <div style={{ flex: 1, flexFlow: 'row', backgroundColor: '#f1edc2' }}>
          <div style={{ height: '100%', width: scaledPxToVh(4) }}></div>
          <div className='_scrollbar' style={{ height: heightVh + 'vh', flex: 1, overflowX: 'auto' }}>
            <div style={{ margin: '2vh', fontSize: '4vh', flexGrow: 1 }}>
              {props.innerContent}
            </div>
          </div>
          <div style={{ height: '100%', width: scaledPxToVh(4) }}></div>
        </div>
        <div style={{ height: scaledPxToVh(4) }}></div>
      </div>
      <div style={{ position: 'absolute', flexFlow: 'column', width: widthVh + 'vh', pointerEvents: 'none' }}>
        <div style={{ height: scaledPxToVh(7) }}>
          <img src={img_edge_topLeft} style={{ height: scaledPxToVh(7) }} alt='' />
          <div className='_edge-top' style={{ height: scaledPxToVh(4), flex: 1 }}></div>
          <img src={img_edge_topRight} style={{ height: scaledPxToVh(7) }} alt='' />
        </div>
        <div style={{ flex: 1, flexFlow: 'row' }}>
          <div className='_edge-vertical' style={{ flexShrink: 0, width: scaledPxToVh(4) }}></div>
          <div style={{ height: (heightVh - Number(scaledPxToVh(6, true))) + 'vh', flex: 1, overflowX: 'auto' }}></div>
          <div className='_edge-vertical' style={{ flexShrink: 0, width: scaledPxToVh(4) }}></div>
        </div>
        <div style={{ height: scaledPxToVh(7), alignItems: 'end' }}>
          <img src={img_edge_bottomLeft} style={{ height: scaledPxToVh(7) }} alt='' />
          <div className='_edge-top' style={{ height: scaledPxToVh(4), flex: 1 }}></div>
          <img src={img_edge_bottomRight} style={{ height: scaledPxToVh(7) }} alt='' />
        </div>
      </div>
    </div>
  )
}

