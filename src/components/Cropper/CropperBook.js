import React, { useEffect } from 'react';
import Cropper from 'react-cropper';

import CropperPanel from 'components/Cropper/CropperPanel';
import './CropperBook.scss';
import './CropperScale.scss';
import 'cropperjs/dist/cropper.css';
import { isMobile, isTablet } from 'react-device-detect';
import axios from 'axios';
const CropperBook = props => {
  const [imgData, setImgData] = React.useState('');
  useEffect(() => {
    axios
      .post(`https://catalog-veneziastone.ru/api_v0/get_photo_bytes/`, {
        ps: props.item.ps
      })
      .then(response => {
        setImgData(response.data.bytes);
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log(1, err.response);
          // props.setAuth(false);
        } else if (err.request) {
          // client never received a response, or request never left
          console.log(2, err.request);
        } else {
          // anything else
          console.log(3, err);
        }
      });
  }, []);
  const [cropData, setCropData] = React.useState('#');
  const [cropper, setCropper] = React.useState('');
  const [mode, setMode] = React.useState('-two');

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  const getCropper = () => {
    if (typeof cropper !== 'undefined') {
      // setBookImg(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const pushOnServer = () => {
    if (typeof cropper !== 'undefined') {
      let mod = mode == '-two' ? 2 : mode == '-four' ? 4 : 2;
      axios
        .post(`https://catalog-veneziastone.ru/api_v0/Bookmatch/`, {
          bytes: cropData,
          mode: mod
        })
        .then(response => {
          var a = document.createElement('a');
          a.href = 'data:application/octet-stream;base64,' + response.data;
          a.download = 'bookmatch.jpg';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(1, err.response);
          } else if (err.request) {
            // client never received a response, or request never left
            console.log(2, err.request);
          } else {
            // anything else
            console.log(3, err);
          }
        });
    }
  };

  return (
    <div
      className={`dialog-cropper-crop 
      ${isMobile ? 'dialog-cropper-crop-tablet' : ''} ${
        !isTablet && isMobile ? 'dialog-cropper-crop-mobile' : ''
      }
      `}
    >
      <div className="cropper">
        <Cropper
          src={`data:image/jpg;base64,${imgData}`}
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
