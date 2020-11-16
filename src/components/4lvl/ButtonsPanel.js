import React, { useEffect } from 'react';

import MyModal from 'components/Modal/Modal';
import ImageGallery from 'react-image-gallery';

import './ButtonsPanel.scss';
import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile
} from 'react-device-detect';



const ButtonsPanel = props => {
  const [visiblePhotos, setVisiblePhotos] = React.useState(false);
  const [visibleVideo, setVisibleVideo] = React.useState(false);
  const [visibleComments, setVisibleComments] = React.useState(false);
  const [visibleOrder, setVisibleOrder] = React.useState(false);
  
  const changePhotoCancel = () => {
    setVisiblePhotos(!visiblePhotos);
  };

  const changeCommentButton = () => {
    setVisibleComments(!visibleComments);
  };
  const changeOrderButton = () => {
    setVisibleOrder(!visibleOrder);
  };

  const PhotoContent = () => {
    return (
      <div className="buttons-panel__modal buttons-panel__modal-photos">
        <ImageGallery items={props.images} thumbnailPosition="right" />
      </div>
    );
  };
  const CommentsContent = () => {
    return <div className="">{props.komment}</div>;
  };
  const OrderModalContent = () => {
    return <div className="">Отправить</div>;
  };

  return (
    <div
      className={`buttons-panel ${
        isMobile && !isTablet ? 'buttons-panel_mob' : ''
      }`}
    >
      <div
        className="button button-text slab-item-info__button"
        onClick={() => setVisiblePhotos(true)}
      >
        Больше фото
        <MyModal visible={visiblePhotos} onCancel={changePhotoCancel}>
          <PhotoContent />
        </MyModal>
      </div>
      <div className="button button-text slab-item-info__button">
        Видео
        <MyModal visible={visibleVideo}>
          <div className=""></div>
        </MyModal>
      </div>
      <div
        className="button button-text slab-item-info__button"
        onClick={changeCommentButton}
      >
        Комментарии
        <MyModal visible={visibleComments} onCancel={changeCommentButton}>
          <CommentsContent />
        </MyModal>
      </div>
      <div
        className="button button-text slab-item-info__button"
        onClick={changeOrderButton}
      >
        Отправить
        <MyModal visible={visibleOrder} onCancel={changeOrderButton}>
          <OrderModalContent />
        </MyModal>
      </div>
    </div>
  );
};

export default ButtonsPanel;
