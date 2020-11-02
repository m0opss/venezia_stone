import React from 'react';
import './CropperPanel.scss'

const CropperPanel = props => {
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
      <div className="cropper-panel__item" onClick={() => props.setCropData('#')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
        </svg>
      </div>
      <div className="cropper-panel__item" onClick={props.pushOnServer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M23 0l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-8.698 6.825l-1.439-.507 5.701-5.215 1.436.396-5.698 5.326zm3.262 4.287l-1.323-.565 4.439-4.503 1.32.455-4.436 4.613zm-4.083.387l-1.481-.507 8-7.89 1.437.397-7.956 8z" />
        </svg>
      </div>
      <div className="cropper-panel__item" onClick={() => props.setMode('-two')}>
          x2
      </div>
      <div className="cropper-panel__item" onClick={() => props.setMode('-four')}>
          x4
      </div>
      <div className="cropper-panel__item" onClick={() => props.setMode('-six')}>
          x6
      </div>
    </div>
  );
};
export default CropperPanel