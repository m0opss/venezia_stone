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

  const images = props.item.map(el => ({
    src: el.photo_product,
    title: '',
    description: el.ps
  }));

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
        {images.map(e => (
          <Lightbox key={e.description} images={[e]} />
        ))}
      </Slider>
    </div>
  );
};
export default ImageGallery;
