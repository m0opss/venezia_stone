import React from 'react';
import SecondLine from './SecondLine/SecondLine';
import TopLine from './TopLine/TopLine';
import MobileHeader from './MobileHeader/MobileHeader';

import './Header.scss';
import {
  MobileView,
  BrowserView,
  isTablet,
  isBrowser
} from 'react-device-detect';

const Header = props => {
  return (
    <>
      {isTablet ? (
        <div className="header-container">
          <div className="container">
            <TopLine />
            <SecondLine />
          </div>
        </div>
      ) : isBrowser ? (
        <div className="header-container">
          <div className="container">
            <TopLine />
            <SecondLine />
          </div>
        </div>
      ) : (
        <div className="header-container">
          <div className="container">
            <MobileHeader isAuth={props.isAuth} />
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
