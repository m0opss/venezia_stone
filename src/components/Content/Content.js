import React from 'react';

import Routes from './Routes';
import Filter from 'components/Filter/Filter';
import {
  MobileView,
  BrowserView,
  isTablet,
  TabletView,
  isBrowser
} from 'react-device-detect';

import './Content.scss';

const Content = props => (
  <div className="content">
    <div className="container">
      {/* {isTablet || isBrowser ? <Filter /> : <></>} */}
      <Routes data={props.data} />
    </div>
  </div>
);

export default Content;
