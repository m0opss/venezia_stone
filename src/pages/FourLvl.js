import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import Valute from 'components/Valute/Valute';

import filterActions from '../actions/filterActions';
import dataActions from 'actions/dataAction';

import Filter from 'components/Filter/Filter';
import { MobileView, BrowserView, isTablet } from 'react-device-detect';

import './FourLvl.scss';
import SlabItem from '../components/4lvl/SlabItem';
import OtherItem from '../components/4lvl/OtherItem';

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
  let type = 'slab';
  return (
    <div className="four-lvl-container">
      <div className="four-lvl-valute">
        <Valute />
      </div>
      {type === 'slab' ? <SlabItem /> : <OtherItem />}
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
