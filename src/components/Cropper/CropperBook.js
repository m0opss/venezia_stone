import React, { useEffect } from 'react';
import Slide from '@material-ui/core/Slide';
import Cropper from 'react-cropper';
import axios from 'axios';


import CropperPanel from 'components/Cropper/CropperPanel';
import './CropperBook.scss';
import './CropperScale.scss';
import 'cropperjs/dist/cropper.css';

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
    <div className="dialog-cropper">
      <div className="cropper-wrapper">
        <div className="cropper-crop">
          <Cropper
            src={props.img}
            initialAspectRatio={1 / 1}
            // preview=".dialog-cropper__preview-item"
            initialAspectRatio={2}
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
            pushOnServer={pushOnServer}
            setCropData={setCropData}
            getCropData={getCropData}
            setMode={setMode}
          />
        </div>
        <div
          className={`dialog-cropper__res ${mode}`}
          onClick={getCropper()}
        >
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
