import React from 'react';
import './CropperPanel.scss';
import { ToastContainer, toast } from 'react-toastify';
import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile
} from 'react-device-detect';
import 'react-toastify/dist/ReactToastify.css';

const CropperPanel = props => {
  const notify = () =>
    toast.success('Фото успешно сохранено в буфер. Вы можете отправить его в заявке.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined
    });
    
  const saveData = () => {
    props.pushOnServer();
    notify();
  };

  return (
    <div className={isMobile ? `cropper-panel` : 'cropper-panel'}>
      <div className="cropper-panel__item" onClick={props.getCropData}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
        </svg>
      </div>
      <div
        className="cropper-panel__item"
        onClick={() => props.setCropData('#')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
        </svg>
      </div>
      <div className="cropper-panel__item" onClick={saveData}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z"/>
        </svg>
      </div>
      {props.type == 'book' ? (
        <>
          <div
            className={`cropper-panel__item ${props.mode == '-two' ? 'active-mode' : ''}`}
            onClick={() => props.setMode('-two')}
          >
            x2
          </div>
          <div
            className={`cropper-panel__item ${props.mode == '-four' ? 'active-mode' : ''}`}
            onClick={() => props.setMode('-four')}
          >
            x4
          </div>
          {/* <div
            className="cropper-panel__item"
            onClick={() => props.setMode('-six')}
          >
            x6
          </div> */}
        </>
      ) : (
        <></>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};
export default CropperPanel;
