import React from 'react';


import { MobileView, BrowserView, isTablet } from 'react-device-detect';

const ButtonsPanel = () => {
  return (
    <div className="buttons-panel">
      <div className="button button-text slab-item-info__button">
        Больше фото
      </div>
      <div className="button button-text slab-item-info__button">Видео</div>
      <div className="button button-text slab-item-info__button">
        Комментарии
      </div>
      <div className="button button-text slab-item-info__button">Отправить</div>
    </div>
  );
};

export default ButtonsPanel;
