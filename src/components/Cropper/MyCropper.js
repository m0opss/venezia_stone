import React, { useEffect } from 'react';
import Slide from '@material-ui/core/Slide';
import Cropper from 'react-cropper';
import axios from 'axios';

import CropperPanel from 'components/Cropper/CropperPanel';
import './MyCropper.scss';
import './CropperScale.scss';
import 'cropperjs/dist/cropper.css';

const MyCropper = props => {
  const [cropData, setCropData] = React.useState('#');
  const [cropper, setCropper] = React.useState();
  const [mode, setMode] = React.useState('-one');

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  const pushOnServer = () => {
    if (typeof cropper !== 'undefined') {
      localStorage.setItem('croppedImage', cropData);
      console.log('data', cropData);
      // console.log(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="dialog-cropper-crop">
      <div className="cropper-crop">
        <Cropper
          src={props.img}
          style={{ height: 600 }}
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
          <img style={{ width: '100%' }} src={cropData} alt="cropped" />
        </div>
      </div>
    </div>
  );
};
export default MyCropper;
