import React, { useEffect } from 'react';

import OrderModal from 'components/Modal/OrderModal';
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
      </div>
      <div className="button button-text slab-item-info__button">Видео</div>
      <div
        className="button button-text slab-item-info__button"
        onClick={() => setVisibleComments(true)}
      >
        Комментарии
      </div>
      <div
        className="button button-text slab-item-info__button"
        onClick={() => setVisibleOrder(true)}
      >
        Отправить
      </div>
      <MyModal visible={visiblePhotos} onCancel={() => setVisiblePhotos(false)}>
        <PhotoContent />
      </MyModal>
      <MyModal visible={visibleVideo} onCancel={() => setVisibleVideo(false)}>
        <div className=""></div>
      </MyModal>
      <MyModal
        visible={visibleComments}
        onCancel={() => setVisibleComments(false)}
      >
        <CommentsContent />
      </MyModal>
      <OrderModal
        setVisible={setVisibleOrder}
        visible={visibleOrder}
        onCancel={() => setVisibleOrder(false)}
      />
    </div>
  );
};

export default ButtonsPanel;
