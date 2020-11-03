import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import Valute from 'components/Valute/Valute';

import filterActions from '../actions/filterActions';
import Filter from 'components/Filter/Filter';
import dataActions from 'actions/dataAction';
import basketActions from 'actions/basketActions';

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
    let isSubscr = true;
    if (isSubscr) {
      axios
        .get(`https://catalog-veneziastone.ru/api_v0${props.match.url}/`)
        .then(response => {
          setItem(response.data.itms[0]);
        })
        .catch(e => {
          console.log(e);
        });
    }
    return () => (isSubscr = false);
  }, []);
  if (Object.keys(item).length != 0) {
    return (
      <div className="four-lvl-container">
        <div className="four-lvl-valute">
          {isTablet || isBrowser ? <Valute /> : <></>}
        </div>
        {item.izd === 'Слэбы' ? (
          <SlabItem type={item.izd} item={item} cur={props.cur} />
        ) : (
          <OtherItem type={item.izd} item={item} cur={props.cur} />
        )}
      </div>
    );
  } else return <></>;
};

const mapStateToProps = store => {
  return {
    cur: store.valute_data.valute
  };
};

export default connect(mapStateToProps)(FourLvl);
