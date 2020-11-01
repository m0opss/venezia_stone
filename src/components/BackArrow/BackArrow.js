import React from 'react';
import { isMobile, isTablet } from 'react-device-detect';

const BackArrow = (props) => {
  return (
    <>
      {!isTablet && isMobile ? (
        <div
          className="back-arr"
          onClick={() => {
            props.history.goBack();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
          </svg>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default BackArrow;
