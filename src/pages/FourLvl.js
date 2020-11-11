import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import Valute from 'components/Valute/Valute';
import BackArrow from 'components/BackArrow/BackArrow';
import filterActions from '../actions/filterActions';
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
  props.setLvl(4);

  const [item, setItem] = React.useState({});

  React.useEffect(() => {
    window.scrollTo(0, 0);
    let isSubscr = true;
    if (isSubscr) {
      axios
        .get(`https://catalog-veneziastone.ru/api_v0${props.match.url}/`)
        .then(response => {
          setItem(response.data.itms[0]);
          props.setMobData(setItem);
          props.setItems(response.data.itms[0].id);
          localStorage.setItem('items', response.data.itms[0].id);
        })
        .catch(e => {
          console.log(e);
        });
    }
    return () => (isSubscr = false);
  }, []);

  if (Object.keys(item).length != 0) {
    return (
      <>
        {isTablet || isBrowser ? <Filter /> : <></>}
        <div className="four-lvl-container">
          <BackArrow history={props.history} />
          <div className="four-lvl-valute">
            {isTablet || isBrowser ? <Valute /> : <></>}
          </div>
          {item.izd === 'Слэбы' || item.izd === 'Полоса' ? (
            <SlabItem
              type={item.izd}
              item={item}
              cur={props.cur}
              url={props.match.url}
              isAuth={props.isAuth}
            />
          ) : (
            <OtherItem
              type={item.izd}
              item={item}
              cur={props.cur}
              url={props.match.url}
              isAuth={props.isAuth}
            />
          )}
        </div>
      </>
    );
  } else return <></>;
};

const mapStateToProps = store => {
  return {
    cur: store.valute_data.valute,
    isAuth: store.auth_data.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLvl: data => {
      dispatch(filterActions.setLvl(data));
    },
    setMobData: data => {
      dispatch(filterActions.setMobData(data));
    },
    setItems: data => {
      dispatch(filterActions.setItems(data));
    },
    setDefMobData: data => {
      dispatch(filterActions.setDefMobData(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FourLvl);
