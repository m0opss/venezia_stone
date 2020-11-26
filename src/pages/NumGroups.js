import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import materialActions from '../actions/materialAction';
import filterActions from 'actions/filterActions';
import BackArrow from 'components/BackArrow/BackArrow';
import Preloader from 'components/Preloader/Preloader';
import listIcon from 'images/str.png';
import pltk from 'images/pltk.png';
import listIcon_a from 'images/str_a.png';
import pltk_a from 'images/pltk_a.png';

import Valute from 'components/Valute/Valute';
import Sort from 'components/Sort/Sort';
import NumGroupItem from 'components/Content/NumGroupItem/NumGroupItem';
import { Breadcrumb } from 'antd';
import './NumGroups.scss';
import Filter from 'components/Filter/Filter';

import { headerCreator } from 'components/Filter/headerCreator';

import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile,
  isBrowser
} from 'react-device-detect';

const NumGroups = props => {
  const [numGroups, setNumGroups] = React.useState([]);
  const [defGroups, setdefNumGroups] = React.useState([]);
  const [sortOn, setSortOn] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [style_pltk, setHover_pltk] = React.useState(true);
  const [num_groups_items, setNum_groups_items] = React.useState(
    'num-gr-items-group'
  );

  const [loadCnt, setLoadCnt] = React.useState(12);

  React.useEffect(() => {
    console.log(props);
    document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
    setLoading(true);
    let isSubscr = true;
    if (isSubscr) {
      let header = headerCreator(
        props.activeFilters,
        props.upper_izd,
        props.cur,
        props.cost,
        props.le,
        props.he
      );

      axios
        .post('https://catalog-veneziastone.ru/api_v0/Filter/', {
          ...header,
          items: [],
          level: [2],
          groups: [],
          token: [],
          nw: props.nw,
          on_sale: props.sale
        })
        .then(response => {
          // console.log(response.data);
          setNumGroups(response.data.grs);
          setdefNumGroups(response.data.grs);
          setLoading(false);
          // setTimeout(() => setLoading(false), 600);
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

  const toggleStyle_pltk = () => {
    setHover_pltk(true);
    setNum_groups_items('num-gr-items-group');
  };

  const toggleStyle_list = () => {
    setHover_pltk(false);
    setNum_groups_items('num-gr-items-group-list');
  };

  const loadMore = () => {
    setLoadCnt(loadCnt => loadCnt + 12);
  };

  return (
    <>
      {isMobile && !isTablet ? <BackArrow history={props.history} /> : <></>}
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
        <Breadcrumb.Item>Материалы</Breadcrumb.Item>
      </Breadcrumb>
      <div className="num-gr-options">
        <Valute />
        <Sort
          defArr={defGroups}
          arr={numGroups}
          setArr={setNumGroups}
          on={sortOn}
          setSortOn={setSortOn}
        />
        {isMobile && !isTablet ? (
          <></>
        ) : (
          <>
            <div className="" onClick={() => toggleStyle_pltk()}>
              <img src={style_pltk ? pltk_a : pltk} />
            </div>
            <div className="" onClick={() => toggleStyle_list()}>
              <img src={style_pltk ? listIcon : listIcon_a} />
            </div>
          </>
        )}
      </div>
      <div className="second-lvl-wrapper">
        {isTablet || isBrowser ? <Filter /> : <></>}
        <Preloader isLoading={isLoading}>
          <div style={{ width: '100%' }}>
            <div className={num_groups_items}>
              <div
                className="num-gr-items-group-col num-gr-item-root"
                style={style_pltk ? { display: 'none' } : {}}
              >
                <p style={{ height: 'unset' }}>Фото</p>
                <p>Название</p>
                <p>Количество SKU</p>
                <p>Общая площадь</p>
                <p>Цена от</p>
                <p></p>
              </div>
              {numGroups.length > 0 ? (
                numGroups
                  .slice(0, loadCnt)
                  .map(item => (
                    <NumGroupItem
                      pltk={style_pltk}
                      key={item.ps}
                      link={item.url}
                      item={item}
                      cur={props.cur}
                    />
                  ))
              ) : (
                <div className="goods-none">Товаров не найдено</div>
              )}
            </div>
            {loadCnt < numGroups.length ? (
              <div className="button-text button load-more" onClick={loadMore}>
                Загрузить еще
              </div>
            ) : (
              <></>
            )}
          </div>
        </Preloader>
      </div>
    </>
  );
};

const mapStateToProps = store => {
  return {
    cur: store.valute_data.valute,
    cost: store.filter_data.cost,
    le: store.filter_data.le,
    he: store.filter_data.he,
    upper_izd: store.filter_data.upper_izd,
    activeFilters: store.filter_data.activeFilters,
    sale: store.filter_data.sale,
    nw: store.filter_data.nw,
    auth_token: store.auth_data.auth_token
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NumGroups);
