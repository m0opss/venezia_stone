import React from 'react';

import './ColorRange.scss';

const ColorRange = props => {
  if(props.colors) {
    if(props.colors.color_range) {
      const re = /'/g;
      const colors = JSON.parse(props.colors.color_range.replace(re, "\""))
      return (
        <div className="color-range">
          <p>Цветовой диапазон</p>
          <div className="color-range__colors">
            <div style={{ backgroundColor : colors[0] }} className="color-range__color" />
            <div style={{ backgroundColor : colors[1] }} className="color-range__color" />
            <div style={{ backgroundColor : colors[2] }} className="color-range__color" />
            <div style={{ backgroundColor : colors[3] }} className="color-range__color" />
            <div style={{ backgroundColor : colors[4] }} className="color-range__color" />
            <div style={{ backgroundColor : colors[5] }} className="color-range__color" />
            <div style={{ backgroundColor : colors[6] }} className="color-range__color" />
            <div style={{ backgroundColor : colors[7] }} className="color-range__color" />
            <div style={{ backgroundColor : colors[8] }} className="color-range__color" />
          </div>
        </div>
      );
    }   else {
      return <></>
    }
  } 
  else {
    return <></>
  }
};
export default ColorRange
