import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import Preloader from 'components/Preloader/Preloader';
import Valute from 'components/Valute/Valute';
import BackArrow from 'components/BackArrow/BackArrow';
import filterActions from '../actions/filterActions';
import Filter from 'components/Filter/Filter';
import { headerCreator } from 'components/Filter/headerCreator';
import { Breadcrumb } from 'antd';

import { Link } from 'react-router-dom';
import {
  MobileView,
  BrowserView,
  isTablet,
  isBrowser,
  isMobile
} from 'react-device-detect';

import './FourLvl.scss';
import SlabItem from '../components/4lvl/SlabItem';
import OtherItem from '../components/4lvl/OtherItem';

const FourLvl = props => {
  const [isLoading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    let isSubscr = true;
    // setLoading(true);
    if (isSubscr) {
      let header = headerCreator(props.activeFilters, props.upper_izd);
      axios
        .post('https://catalog-veneziastone.ru/api_v0/Filter/', {
          ...header,
          items: [props.match.params.num],
          level: [4],
          groups: [props.match.params.numGroups],
          // token: [props.auth_token]
          nw: [],
          on_sale: [],
          token: []
        })
        .then(response => {
          setItem(response.data.prs);
          setLoading(false);
          // if (
          //   response.data.prs[0].itms_izd !== 'Слэбы' ||
          //   response.data.prs[0].itms_izd !== 'Полоса'
          // ) {
          //   axios
          //     .post('https://catalog-veneziastone.ru/api_v0/addViewed/', {
          //       token: props.auth_token,
          //       id_product: response.data.itms[0].prs[0].ps
          //     })
          //     .then(response => {
          //       console.log(response);
          //     })
          //     .catch(err => {
          //       if (err.response) {
          //         // client received an error response (5xx, 4xx)
          //         console.log(1, err.response);
          //         // props.setAuth(false);
          //       } else if (err.request) {
          //         // client never received a response, or request never left
          //         console.log(2, err.request);
          //       } else {
          //         // anything else
          //         console.log(3, err);
          //       }
          //     });
          // }
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
    <>
      {isMobile && !isTablet ? (
        <></>
      ) : (
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/">Главная </Link>
          </Breadcrumb.Item>
          {props.nw.length != 0 ? (
            <Breadcrumb.Item>Новые поступления</Breadcrumb.Item>
          ) : props.sale.length != 0 ? (
            <Breadcrumb.Item>Распродажа</Breadcrumb.Item>
          ) : (
            <></>
          )}
          <Breadcrumb.Item>{props.match.params.material}</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              to={`/${props.match.params.material}/${props.match.params.numGroups}`}
            >
              {props.match.params.numGroups}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{props.match.params.num}</Breadcrumb.Item>
        </Breadcrumb>
      )}
      {isTablet || isBrowser ? <Filter built_in={true}/> : <></>}
      <Preloader isLoading={isLoading}>
        <div className="four-lvl-container">
          <BackArrow history={props.history} />
          <div className="four-lvl-valute">
            {isTablet || isBrowser ? <Valute /> : <></>}
          </div>
          {item.length > 0 ? (
            item[0].itms_izd === 'Слэбы' || item[0].itms_izd === 'Полоса' ? (
              <SlabItem
                type={item[0].itms_izd}
                item={item}
                cur={props.cur}
                url={props.match.url}
                isAuth={props.isAuth}
              />
            ) : (
              <OtherItem
                type={item[0].itms_izd}
                item={item}
                cur={props.cur}
                url={props.match.url}
                isAuth={props.isAuth}
              />
            )
          ) : (
            <div className="goods-none">Товаров не найдено</div>
          )}
        </div>
      </Preloader>
    </>
  );
};

const mapStateToProps = store => {
  return {
    cur: store.valute_data.valute,
    isAuth: store.auth_data.isAuth,
    auth_token: store.auth_data.auth_token,
    upper_izd: store.filter_data.upper_izd,
    activeFilters: store.filter_data.activeFilters,
    sale: store.filter_data.sale,
    nw: store.filter_data.nw
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FourLvl);
