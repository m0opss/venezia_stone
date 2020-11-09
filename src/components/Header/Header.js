import React from 'react';
import SecondLine from './SecondLine/SecondLine';
import TopLine from './TopLine/TopLine';
import MobileHeader from './MobileHeader/MobileHeader';

import './Header.scss';
import {
  MobileView,
  BrowserView,
  isTablet,
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
      ) : (
        <>
          <BrowserView>
            <div className="header-container">
              <div className="container">
                <TopLine />
                <SecondLine />
              </div>
            </div>
          </BrowserView>
          <MobileView>
            <div className="header-container">
              <div className="container">
                <MobileHeader isAuth={props.isAuth}/>
              </div>
            </div>
          </MobileView>
        </>
      )}
    </>
  );
};
export default Header;
