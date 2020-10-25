import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import Valute from 'components/Valute/Valute';
import ScrollImage from 'components/ScrollImage/ScrollImage';

import filterActions from '../actions/filterActions';
import dataActions from 'actions/dataAction';


import Filter from 'components/Filter/Filter';
import { MobileView, BrowserView, isTablet } from 'react-device-detect';

import './FourLvl.scss';


const FourLvl = props => {
  // React.useEffect(() => {
  //   axios
  //     .get('http://92.63.103.180:8000/api_v0/getMaterials/')
  //     .then(response => {
  //       props.getDataResponse(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }, []);

  return (
    <div className="four-lvl-container">
      <div className="four-lvl-valute">
        <Valute />
      </div>
      <div className="four-lvl-item">
        <div className="item-info">
          <div className="item-info__left-block">
            <h1 className="item-info__title">TAN BROWN 30 мм</h1>
            <ScrollImage scrollStyle='item-info-scroll'/>
          </div>
          <div className="item-info__right-block"></div>
        </div>
        <div className="items-table"></div>
      </div>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    data: store.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataResponse: data => {
      dispatch(dataActions.getDataResponse(data));
    },
    setMatList: data => {
      dispatch(filterActions.setMatList(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FourLvl);
