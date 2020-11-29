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
  const [sides, setSides] = React.useState({ '1': 'right', '2': 'down' });

  let d = document.getElementsByClassName('cropper-crop-box')[0];
  React.useEffect(() => {
    console.log(sides);
    if (d) {
      if (sides[0] == 'right') d.style.borderRight = '3px solid red';
      if (sides[0] == 'left') d.style.borderLeft = '3px solid red';
      if (sides[1] == 'up') d.style.borderTop = '3px solid red';
      if (sides[1] == 'down') d.style.borderBottom = '3px solid red';
    }
    if (props.mode == '-two') {
      if (d) {
        d.style.borderTop = null;
        d.style.borderBottom = null;
        toggleHBorder();
      }
    } else if (props.mode == '-four') {
      toggleVBorder();
      toggleHBorder();
    } else {
    }
  }, [props.mode]);

  const notify = () =>
    toast.success(
      'Фото успешно сохранено в буфер. Вы можете отправить его в заявке.',
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
      }
    );

  const saveData = () => {
    props.pushOnServer(sides);
    notify();
  };

  const toggleHBorder = () => {
    let a = document.getElementsByClassName('cropper-crop-box')[0];
    if (props.mode == '-two') {
      a.style.borderTop = null;
      a.style.borderBottom = null;
    }
    if (sides['1'] == 'right') {
      a.style.borderLeft = '3px solid red';
      a.style.borderRight = null;
      setSides(sides => {
        return {
          ...sides,
          1: 'left'
        };
      });
      props.setSides(sides => {
        return {
          ...sides,
          1: 'left'
        };
      });
    } else {
      a.style.borderRight = '3px solid red';
      a.style.borderLeft = null;
      setSides(sides => {
        return {
          ...sides,
          1: 'right'
        };
      });
      props.setSides(sides => {
        return {
          ...sides,
          1: 'right'
        };
      });
    }
  };

  const toggleVBorder = () => {
    let a = document.getElementsByClassName('cropper-crop-box')[0];
    if (props.mode == 'eight') {
      a.style.borderTop = '3px solid red';
      a.style.borderBottom = '3px solid red';
    }
    if (sides['2'] == 'down') {
      a.style.borderTop = '3px solid red';
      a.style.borderBottom = null;
      setSides(sides => {
        return {
          ...sides,
          2: 'up'
        };
      });
      props.setSides(sides => {
        return {
          ...sides,
          2: 'up'
        };
      });
    } else if (sides['2'] == 'up') {
      a.style.borderBottom = '3px solid red';
      a.style.borderTop = null;
      props.setSides(sides => {
        return {
          ...sides,
          2: 'down'
        };
      });
    }
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
          <path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z" />
        </svg>
      </div>
      {props.type == 'book' ? (
        <>
          <div
            className={`cropper-panel__item ${
              props.mode == '-two' ? 'active-mode' : ''
            }`}
            onClick={() => props.setMode('-two')}
          >
            x2
          </div>
          <div
            className={`cropper-panel__item ${
              props.mode == '-four' ? 'active-mode' : ''
            }`}
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
          <div className="cropper-panel__item" onClick={toggleHBorder}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6 13v4l-6-5 6-5v4h3v2h-3zm9-2v2h3v4l6-5-6-5v4h-3zm-4-6v14h2v-14h-2z" />
            </svg>
          </div>
          {props.mode == '-four' ? (
            <div className="cropper-panel__item" onClick={toggleVBorder}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M11 6h-4l5-6 5 6h-4v3h-2v-3zm2 9h-2v3h-4l5 6 5-6h-4v-3zm6-4h-14v2h14v-2z" />
              </svg>
            </div>
          ) : (
            <></>
          )}
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
