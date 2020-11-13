import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import Valute from 'components/Valute/Valute';
import BackArrow from 'components/BackArrow/BackArrow';
import filterActions from '../actions/filterActions';
import Filter from 'components/Filter/Filter';
import {headerCreator} from 'components/Filter/headerCreator';

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
    console.log(props.match.params)
    let isSubscr = true;
    if (isSubscr) {
      let header = headerCreator(
        props.activeFilters,
        props.match.params.material,
        props.upper_izd
      );
      axios
        .post('https://catalog-veneziastone.ru/api_v0/Filter/', {
          ...header,
          items: [props.match.params.num],
          level: [4],
          groups: [props.match.params.numGroups]
        })
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
    }
    return () => (isSubscr = false);
  }, [props.activeFilters, props.upper_izd]);

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
    isAuth: store.auth_data.isAuth,
    upper_izd: store.filter_data.upper_izd,
    activeFilters: store.filter_data.activeFilters
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
