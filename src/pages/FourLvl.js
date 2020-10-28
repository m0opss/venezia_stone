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
  const [item, setItem] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`https://catalog-veneziastone.ru/api_v0${props.match.url}/`)
      .then(response => {
        setItem(response.data.itms[0]);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <div className="four-lvl-container">
      <div className="four-lvl-valute">
        <Valute />
      </div>
      {item.izd === 'Слэбы' ? (
        <SlabItem type={item.izd} item={item} />
      ) : (
        <OtherItem type={item.izd} item={item} />
      )}
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FourLvl);
