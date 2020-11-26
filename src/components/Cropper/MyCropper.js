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
  const [imgData, setImgData] = React.useState('');
  const [res_le, setLe] = React.useState(0);
  const [res_he, setHe] = React.useState(0);
  let le, he;

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
        setImgData(response.data.bytes);
        console.log(response.data);
        le = response.data.he;
        he = response.data.le;
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

  const cropperRef = React.useRef(null);
  const onCrop = (e) => {
    const imageElement =
      cropperRef === null || cropperRef === void 0
        ? void 0
        : cropperRef.current;
    const cropper =
      imageElement === null || imageElement === void 0
        ? void 0
        : imageElement.cropper;
    console.log(e)
    setLe(
      ((le * cropper.cropBoxData.width) / cropper.cropBoxData.maxWidth).toFixed(
        2
      )
    );
    setHe(
      (
        (he * cropper.cropBoxData.height) /
        cropper.cropBoxData.maxHeight
      ).toFixed(2)
    );
  };

  return (
    <div
      className={`dialog-cropper-crop ${
        isMobile ? 'dialog-cropper-crop-tablet' : ''
      }`}
    >
      <div className="cropper">
        <div className="">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
              width: '50%'
            }}
            className=""
          >
            <div
              style={{ display: 'flex', margin: 'auto', width: '100%' }}
              className=""
            >
              <p style={{ margin: '10px 10px' }}>Длина: {res_le}"</p>
              <p style={{ margin: '10px 10px' }}>Ширина: {res_he}"</p>
            </div>
          </div>
          <Cropper
            src={`data:image/jpg;base64,${imgData}`}
            style={
              isTablet
                ? { height: 400 }
                : isMobile
                ? { height: 300 }
                : { height: 600 }
            }
            ref={cropperRef}
            initialAspectRatio={1 / 1}
            initialAspectRatio={1}
            viewMode={2}
            crop={onCrop}
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
        </div>
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
