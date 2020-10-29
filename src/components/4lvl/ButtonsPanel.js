import React from 'react';

import MyModal from 'components/Modal/Modal';
import ImageGallery from 'react-image-gallery';

import './ButtonsPanel.scss';
import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile
} from 'react-device-detect';

const imagess = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/'
  }
];

const ButtonsPanel = props => {
  const [visiblePhotos, setVisiblePhotos] = React.useState(false);
  const [visibleVideo, setVisibleVideo] = React.useState(false);
  const [visibleComments, setVisibleComments] = React.useState(false);

  const changePhotoButton = () => {
    setVisiblePhotos(!visiblePhotos);
  };

  const PhotoContent = () => {
    return (
      <div className="buttons-panel__modal buttons-panel__modal-photos">
        <ImageGallery items={imagess} thumbnailPosition="right" />
      </div>
    );
  };

  return (
    <div className={`buttons-panel ${isMobile && !isTablet ? "buttons-panel_mob" : ''}`}>
      <div
        className="button button-text slab-item-info__button"
        onClick={changePhotoButton}
      >
        Больше фото
        <MyModal visible={visiblePhotos} onCancel={changePhotoButton}>
          <PhotoContent />
        </MyModal>
      </div>
      <div className="button button-text slab-item-info__button">
        Видео
        <MyModal />
      </div>
      <div className="button button-text slab-item-info__button">
        Комментарии
        <MyModal />
      </div>
      <div className="button button-text slab-item-info__button">Отправить</div>
    </div>
  );
};

export default ButtonsPanel;
