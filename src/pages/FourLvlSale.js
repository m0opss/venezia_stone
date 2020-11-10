import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import Valute from 'components/Valute/Valute';

import filterActions from '../actions/filterActions';
import dataActions from 'actions/dataAction';
import basketActions from 'actions/basketActions';

import Filter from 'components/Filter/Filter';
import {
  MobileView,
  BrowserView,
  isTablet,
  isBrowser
} from 'react-device-detect';

import './FourLvl.scss';
import SlabItem from '../components/4lvl/SlabItem';
import OtherItem from '../components/4lvl/OtherItem';

const FourLvl = props => {
  const [item, setItem] = React.useState({});

  React.useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`https://catalog-veneziastone.ru/api_v0${props.match.url}/`)
      .then(response => {
        setItem(response.data.itms[0]);
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log(1, err.response);
          // props.setAuth(false);
        } else if (err.request) {
          // client never received a response, or request never left
          console.log(2, err.request);
        } else {
          // anything else
          console.log(3, err);
        }
      });
  }, []);

  return (
    <div className="four-lvl-container">
      <div className="four-lvl-valute">
        {isTablet || isBrowser ? <Valute /> : <></>}
      </div>
      {item.izd === 'Слэбы' ? (
        <SlabItem
          type={item.izd}
          item={item}
          addGood={props.addGood}
          cur={props.cur}
        />
      ) : (
        <></>
      )}
      {item.izd !== 'Слэбы' && item.izd ? (
        <OtherItem
          type={item.izd}
          item={item}
          addGood={props.addGood}
          cur={props.cur}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = store => {
  return {
    data: store.data,
    cur: store.valute_data.valute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataResponse: data => {
      dispatch(dataActions.getDataResponse(data));
    },
    addGood: data => {
      dispatch(basketActions.addGood(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FourLvl);
