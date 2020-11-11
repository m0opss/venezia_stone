import React from 'react';
import Lightbox from 'react-lightbox-component';
import Slider from 'react-slick';
import 'react-lightbox-component/build/css/index.css';
import { isMobile, isTablet } from 'react-device-detect';

const ImageGallery = props => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    className: 'image-gallery-slick'
  };
  return (
    <div
      className={`image-gallery ${
        isTablet
          ? 'image-gallery-tablet'
          : isMobile && !isTablet
          ? 'image-gallery-mobile'
          : ''
      }`}
    >
      <Slider {...settings}>
        <div>
          <div className="num-gr-item__labels">
            {props.item.prs && props.item.prs.nw != 0 ? (
              <div className="item-label item-label-new">Новинка</div>
            ) : (
              <></>
            )}
            {props.item.prs && props.item.prs.onSale != 0 ? (
              <div className="item-label item-label-sale">Распродажа</div>
            ) : (
              <></>
            )}
            {props.item.prs && props.item.prs.pz != 0 ? (
              <div className="item-label item-label-order">Под заказ</div>
            ) : (
              <></>
            )}
          </div>
          <Lightbox
            images={[
              {
                src: props.item.prs ? props.item.prs.photo_product : '',
                title: 'image title',
                description: 'image description'
              }
            ]}
          />
        </div>
      </Slider>
    </div>
  );
};
export default ImageGallery;
