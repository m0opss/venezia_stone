import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import Preloader from 'components/Preloader/Preloader';
import Valute from 'components/Valute/Valute';
import BackArrow from 'components/BackArrow/BackArrow';
import filterActions from '../actions/filterActions';
import Filter from 'components/Filter/Filter';
import { headerCreator } from 'components/Filter/headerCreator';

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
  const [isLoading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState({});

  React.useEffect(() => {
    window.scrollTo(0, 0);
    console.log(props.match.params);
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
          groups: [props.match.params.numGroups],
          token: props.auth_token
        })
        .then(response => {
          setItem(response.data.itms[0]);
          setLoading(false);
          if (
            response.data.itms[0].izd !== 'Слэбы' ||
            response.data.itms[0].izd !== 'Полоса'
          ) {
            axios
              .post('https://catalog-veneziastone.ru/api_v0/addViewed/', {
                token: props.auth_token,
                id_product: response.data.itms[0].prs[0].ps
              })
              .then(response => {
                console.log(response);
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

  return (
    // if (Object.keys(item).length != 0) {
    <>
      <Preloader isLoading={isLoading}>
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
      </Preloader>
    </>
  );
  // );
  // } else return <></>;
};

const mapStateToProps = store => {
  return {
    cur: store.valute_data.valute,
    isAuth: store.auth_data.isAuth,
    auth_token: store.auth_data.auth_token,
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
