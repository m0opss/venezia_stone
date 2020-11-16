import React, { useEffect } from 'react';
import Cropper from 'react-cropper';

import CropperPanel from 'components/Cropper/CropperPanel';
import './CropperBook.scss';
import './CropperScale.scss';
import 'cropperjs/dist/cropper.css';
import { isMobile, isTablet } from 'react-device-detect';
const CropperBook = props => {
  const [cropData, setCropData] = React.useState('#');
  const [cropper, setCropper] = React.useState('');
  const [mode, setMode] = React.useState('-two');
  const [bookImg, setBookImg] = React.useState('');

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  const getCropper = () => {
    if (typeof cropper !== 'undefined') {
      // setBookImg(cropper.getCroppedCanvas().toDataURL());
    }
    console.log(cropper);
  };

  const pushOnServer = () => {
    if (typeof cropper !== 'undefined') {
      console.log('data', cropData);
      console.log(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div
      className={`dialog-cropper-crop 
      ${isMobile ? 'dialog-cropper-crop-tablet' : ''} ${!isTablet && isMobile ? 'dialog-cropper-crop-mobile' : ''}
      `}
    >
      <div className="cropper">
        <Cropper
          src={props.img}
          initialAspectRatio={1 / 1}
          initialAspectRatio={2}
          style={
            isTablet
              ? { height: 400 }
              : isMobile
              ? { height: 300 }
              : { height: 600 }
          }
          viewMode={3}
          guides={true}
          minCropBoxHeight={50}
          minCropBoxWidth={50}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={instance => {
            setCropper(instance);
          }}
        />
        <CropperPanel
          type="book"
          mode={mode}
          pushOnServer={pushOnServer}
          setCropData={setCropData}
          getCropData={getCropData}
          setMode={setMode}
        />
      </div>
      <div className="dialog-cropper__res-wrapper">
        <h2>Результат</h2>
        <div className={`dialog-cropper__res ${mode}`} onClick={getCropper()}>
          <img className="dialog-cropper__preview-item" src={cropData} />
          <img className="dialog-cropper__preview-item" src={cropData} />
          <img className="dialog-cropper__preview-item" src={cropData} />
          <img className="dialog-cropper__preview-item" src={cropData} />
          <img className="dialog-cropper__preview-item" src={cropData} />
          <img className="dialog-cropper__preview-item" src={cropData} />
        </div>
      </div>
    </div>
  );
};
export default CropperBook;
