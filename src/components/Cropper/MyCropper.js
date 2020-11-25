import React, { useEffect } from 'react';
import Cropper from 'react-cropper';
import axios from 'axios';
import CropperPanel from 'components/Cropper/CropperPanel';
import './MyCropper.scss';
import './CropperScale.scss';
import 'cropperjs/dist/cropper.css';
import { isMobile, isTablet } from 'react-device-detect';

const MyCropper = props => {
  const [cropData, setCropData] = React.useState('#');
  const [cropper, setCropper] = React.useState();
  const [mode, setMode] = React.useState('-one');
  const [imgData, setImgData] = React.useState('')
  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  const pushOnServer = () => {
    if (typeof cropper !== 'undefined') {
      console.log(cropData);
      // localStorage.setItem('croppedImage', cropData);
      // console.log(cropper.getCroppedCanvas().toDataURL());
    }
  };
  useEffect(() => {
    axios
      .post(`https://catalog-veneziastone.ru/api_v0/get_photo_bytes/`, {
        ps: props.item.ps
      })
      .then(response => {
        console.log(response.data);
        setImgData(response.data)
       
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
  return (
    <div
      className={`dialog-cropper-crop ${
        isMobile ? 'dialog-cropper-crop-tablet' : ''
      }`}
    >
      <div className="cropper">
        <Cropper
          src={`data:image/jpg;base64,${imgData}`}
          style={
            isTablet
              ? { height: 400 }
              : isMobile
              ? { height: 300 }
              : { height: 600 }
          }
          initialAspectRatio={1 / 1}
          initialAspectRatio={1}
          viewMode={2}
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
          type="crop"
          pushOnServer={pushOnServer}
          setCropData={setCropData}
          getCropData={getCropData}
          setMode={setMode}
        />
      </div>
      <div className="dialog-cropper-crop__res">
        <div className="dialog-cropper-crop__res-img">
          <h2>Результат</h2>
          <img style={{ width: '100%' }} src={cropData} alt="cropped" />
        </div>
      </div>
    </div>
  );
};
export default MyCropper;
