import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './ScrollImage.scss';

const ScrollImage = props => {
  const ScrollItem = props => {
    const [active, setActive] = React.useState(
      props.selectedItem == props.id ? true : false
    );
    // console.log(props.selectedItem.ps, props.id)

    const chooseItem = () => {
      props.selectItem(props.id);
    };
    return (
      <div className="scroll__item" onClick={chooseItem}>
        <p>{props.id}</p>
        <img
          className={`${active ? 'selected-img' : ''}`}
          id={props.id}
          src={props.item[0].photobl}
        />
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
          {Object.keys(props.elements).map(item => (
            <ScrollItem
              key={item}
              id={item}
              item={props.elements[item]['slabs']}
              selectItem={props.selectItem}
              selectedItem={props.selectedItem}
            />
          ))}
        </div>
      </div>
    </Scrollbars>
  );
};
export default ScrollImage;
