import React from 'react';
import './CropperPanel.scss';
import { ToastContainer, toast } from 'react-toastify';
 
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
    <div className="cropper-panel">
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
          <path d="M22 2v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-13 9.729l.855-.791c1 .484 1.635.852 2.76 1.654 2.113-2.399 3.511-3.616 6.106-5.231l.279.64c-2.141 1.869-3.709 3.949-5.967 7.999-1.393-1.64-2.322-2.686-4.033-4.271z" />
        </svg>
      </div>
      {props.type == 'book' ? (
        <>
          <div
            className="cropper-panel__item"
            onClick={() => props.setMode('-two')}
          >
            x2
          </div>
          <div
            className="cropper-panel__item"
            onClick={() => props.setMode('-four')}
          >
            x4
          </div>
          <div
            className="cropper-panel__item"
            onClick={() => props.setMode('-six')}
          >
            x6
          </div>
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
