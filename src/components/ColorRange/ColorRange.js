import React from 'react';

import './ColorRange.scss';

const ColorRange = props => {
  return (
    <div className="color-range">
      <p>Цветовой диапазон</p>
      <div className="color-range__colors">
        <div style={{ backgroundColor : props.colors[0] }} className="color-range__color" />
        <div style={{ backgroundColor : props.colors[1] }} className="color-range__color" />
        <div style={{ backgroundColor : props.colors[2] }} className="color-range__color" />
        <div style={{ backgroundColor : props.colors[3] }} className="color-range__color" />
        <div style={{ backgroundColor : props.colors[4] }} className="color-range__color" />
        <div style={{ backgroundColor : props.colors[5] }} className="color-range__color" />
        <div style={{ backgroundColor : props.colors[6] }} className="color-range__color" />
        <div style={{ backgroundColor : props.colors[7] }} className="color-range__color" />
        <div style={{ backgroundColor : props.colors[8] }} className="color-range__color" />
      </div>
    </div>
  );
};
export default ColorRange
