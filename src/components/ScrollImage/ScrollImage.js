import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './ScrollImage.scss';


const ScrollImage = props => {
  const ScrollItem = props => {
    return (
      <div
        className="scroll__item"
        onClick={() => props.selectItem(props.item)}
      >
        <p>{props.item.bl}</p>
        <img src={props.photobl} />
      </div>
    );
  };
  return (
    <Scrollbars
      style={{ width: '99%', height: 440, maxWidth: 500 }}
      thumbSize={14}
      renderTrackVertical={props => (
        <div {...props} className="track-vertical" />
      )}
      renderThumbVertical={props => (
        <div {...props} className="thumb-vertical" />
      )}
    >
      <div className={`scroll-root ${props.scrollStyle}`}>
        <div id="scroll__wrapper" className="scroll__wrapper">
          {props.elements.map(item =>
            item.photobl ? (
              <ScrollItem
                key={item.ps}
                item={item}
                photobl={item.photobl}
                selectItem={props.selectItem}
              />
            ) : (
              <ScrollItem
                key={item.ps}
                item={item}
                photobl={'https://picsum.photos/id/1015/1000/600/'}
                selectItem={props.selectItem}
              />
            )
          )}
        </div>
      </div>
    </Scrollbars>
  );
};
export default ScrollImage;
