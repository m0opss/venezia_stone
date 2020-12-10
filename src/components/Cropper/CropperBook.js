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
  const cropperRef = React.useRef(null);
  const [cropData, setCropData] = React.useState('#');
  const [cropper, setCropper] = React.useState();
  const [mode, setMode] = React.useState('-eight');
  const [sides, setSides] = React.useState({
    1: 'right',
    2: 'down'
  });

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

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const onCrop = e => {
    const imageElement =
      cropperRef === null || cropperRef === void 0
        ? void 0
        : cropperRef.current;
    const cropper =
      imageElement === null || imageElement === void 0
        ? void 0
        : imageElement.cropper;

    // setCropData(cropper.getCroppedCanvas().toDataURL());
  };

  const pushOnServer = obj => {
    const imageElement =
      cropperRef === null || cropperRef === void 0
        ? void 0
        : cropperRef.current;
    const cropper =
      imageElement === null || imageElement === void 0
        ? void 0
        : imageElement.cropper;
    if (typeof cropper !== 'undefined') {
      axios
        .post(`https://catalog-veneziastone.ru/api_v0/Bookmatch/`, {
          image: cropper.getCroppedCanvas().toDataURL(),
          sides: obj
        })
        .then(response => {
          var a = document.createElement('a');
          a.href = 'data:application/octet-stream;base64,' + response.data;
          setCropData('data:application/octet-stream;base64,' + response.data);
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
      className={`dialog-cropper-crop ${
        isTablet ? 'dialog-cropper-crop-tablet' : ''
      } ${!isTablet && isMobile ? 'dialog-cropper-crop-mobile' : ''}`}
    >
      <div className="cropper">
        <Cropper
          src={`data:image/jpg;base64,${imgData}`}
          style={
            isTablet
              ? { height: 300, width: 470 }
              : isMobile
              ? { height: 200, width: 300 }
              : { height: 400, width: 470 }
          }
          ref={cropperRef}
          viewMode={2}
          crop={onCrop}
          guides={true}
          background={false}
          responsive={true}
          autoCropArea={1}
          preview=".dialog-cropper__preview-item"
          checkOrientation={false}
          onInitialized={instance => {
            setCropper(instance);
          }}
        />
        <CropperPanel
          type="book"
          sides={sides}
          mode={mode}
          setSides={setSides}
          pushOnServer={pushOnServer}
          setCropData={setCropData}
          getCropData={getCropData}
          setMode={setMode}
        />
      </div>
      <div className="dialog-cropper__res-wrapper">
        <h2>Результат</h2>
        <div className={`dialog-cropper__res ${mode} h-normal v-normal`}>
          <div className="row">
            <div className="col col_1">
              <div className="dialog-cropper__preview-item" />
            </div>
            <div className="col col_1">
              <div className="dialog-cropper__preview-item" />
            </div>
          </div>
          <div className="row">
            <div className="col col_2">
              <div className="dialog-cropper__preview-item" />
            </div>
            <div className="col col_2">
              <div className="dialog-cropper__preview-item" />
            </div>
          </div>
          <div className="row">
            <div className="col col_1">
              <div className="dialog-cropper__preview-item" />
            </div>
            <div className="col col_1">
              <div className="dialog-cropper__preview-item" />
            </div>
          </div>
          <div className="row">
            <div className="col col_2">
              <div className="dialog-cropper__preview-item" />
            </div>
            <div className="col col_2">
              <div className="dialog-cropper__preview-item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CropperBook;
