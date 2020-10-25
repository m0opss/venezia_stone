import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './ScrollImage.scss';

const ScrollImage = props => {
  // let styleScroll = {
  //   height: '90%',
  //   display: 'flex',
  //   alignItems: 'center',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-between',
  // }

  const ScrollItem = props => {
    return (
      <div className="scroll__item">
        <p>{props.title}</p>
        <img src={props.img} />
      </div>
    );
  };

  let im = 'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg';
  return (
    <Scrollbars
      style={{ width: '99%', height: 440 }}
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
          <ScrollItem title="123123" img={im} />
          <ScrollItem title="12312312" img={im} />
          <ScrollItem title="1311231" img={im} />
          <ScrollItem title="1231" img={im} />
          <ScrollItem title="1123" img={im} />
          <ScrollItem title="1 12312314124 12341" img={im} />
          <p>Some great content...</p>
        </div>
      </div>
    </Scrollbars>
  );
};
export default ScrollImage;
