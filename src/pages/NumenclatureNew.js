import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import BackArrow from 'components/BackArrow/BackArrow';
import materialActions from '../actions/materialAction';
import filterActions from '../actions/filterActions';
import dataActions from 'actions/dataAction';
import Valute from 'components/Valute/Valute';
import Sort from 'components/Sort/Sort';
import listIcon from 'images/str.png';
import pltk from 'images/pltk.png';
import listIcon_a from 'images/str_a.png';
import pltk_a from 'images/pltk_a.png';
import Preloader from 'components/Preloader/Preloader';
import './Numenclature.scss';
import { headerCreator } from 'components/Filter/headerCreator';
import NumenclatureItem from '../components/Content/NumenclatureItem/NumenclatureItem';
import Filter from 'components/Filter/Filter';
import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile,
  isBrowser
} from 'react-device-detect';

const Numenclature = props => {
  const [numenclature, setNumemclature] = React.useState([]);
  const [defNum, setdefNum] = React.useState([]);
  const [sortOn, setSortOn] = React.useState(false);
  const [style_pltk, setHover_pltk] = React.useState(true);
  const [isLoading, setLoading] = React.useState(true);
  const [num_groups_items, setNum_groups_items] = React.useState(
    'num-gr-items-group'
  );
  const [loadCnt, setLoadCnt] = React.useState(12);

  React.useEffect(() => {
    // props.setLvl(3);
    window.scrollTo(0, 0);
    setLoading(true);
    let isSubscr = true;
    if (isSubscr) {
      let header = headerCreator(
        props.activeFilters,
        props.match.params.material,
        props.upper_izd
      );
      console.log(3, {
        ...header,
        token: [],
        items: [],
        level: [3],
        nw: [],
        on_sale: [],
        groups: [props.match.params.numGroups]
      });
      axios
        .post('https://catalog-veneziastone.ru/api_v0/Filter/', {
          ...header,
          token: [],
          // token: [props.auth_token],
          items: [],
          level: [3],
          nw: [1],
          on_sale: [],
          groups: [props.match.params.numGroups]
        })
        .then(response => {
          setNumemclature(response.data.itms);
          setdefNum(response.data.itms);
          setLoading(false);
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

  const styleFilt = id => {
    ['Все_3', 'Слэбы_3', 'Полоса_3', 'Плитка_3'].map(val => {
      if (isBrowser || isTablet) {
        if (id === val) {
          document.getElementById(val).setAttribute('style', 'color: #c98505');
        } else {
          document.getElementById(val).setAttribute('style', 'color: black');
        }
      } else {
        if (id === val) {
          document
            .getElementById(val)
            .setAttribute('style', 'color: white, background-color: #BE9344');
        } else {
          document
            .getElementById(val)
            .setAttribute('style', 'color: black, background-color: #BE9344');
        }
      }
    });
  };

  const filterIzd = e => {
    let tmp = [...defNum];
    styleFilt(e.target.id);
    if (e.target.id === 'Все_3') {
      setNumemclature(tmp);
    } else if (e.target.id === 'Слэбы_3') {
      setNumemclature(tmp.filter(el => el.izd === 'Слэбы'));
    } else if (e.target.id === 'Полоса_3') {
      setNumemclature(tmp.filter(el => el.izd === 'Полоса'));
    } else if (e.target.id === 'Плитка_3') {
      setNumemclature(tmp.filter(el => el.izd === 'Плитка'));
    } else if (e.target.id === 'Другие_3') {
      setNumemclature(
        tmp.filter(
          el => el.izd !== 'Слэбы' && el.izd !== 'Полоса' && el.izd !== 'Плитка'
        )
      );
    }
  };

  const loadMore = () => {
    setLoadCnt(loadCnt => loadCnt + 12);
  };

  return (
    <>
      {isTablet || isBrowser ? <Filter /> : <></>}
      {isMobile && !isTablet ? <BackArrow history={props.history} /> : <></>}
      <Preloader isLoading={isLoading}>
        <div
          className={
            isMobile && !isTablet
              ? `num-options num-options-mobile`
              : 'num-options'
          }
        >
          <div
            className={
              isMobile && !isTablet ? 'filter-options-mobile' : `filter-options`
            }
          >
            <div id="Все" onClick={filterIzd}>
              Все
            </div>
            <div id="Слэбы" onClick={filterIzd}>
              Слэбы
            </div>
            <div id="Полоса" onClick={filterIzd}>
              Полоса
            </div>
            <div id="Плитка" onClick={filterIzd}>
              Плитка
            </div>
            <div id="Другие" onClick={filterIzd}>
              Другие изделия
            </div>
          </div>

          <div className="other-options">
            <Valute />
            <Sort
              defArr={defNum}
              arr={numenclature}
              setArr={setNumemclature}
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
        </div>
        <div className={num_groups_items}>
          <div
            className="num-items-group-col num-gr-item-root num-item"
            style={style_pltk ? { display: 'none' } : {}}
          >
            <div style={{ height: 'unset' }}>Фото</div>
            <div>Название</div>
            <div>Пачек</div>
            <div>Слэбов</div>
            <div>Общая площадь</div>
            <div>Цена от</div>
            <div></div>
          </div>

          {numenclature.length > 0 ? (
            numenclature
              .slice(0, loadCnt)
              .map(item => (
                <NumenclatureItem
                  pltk={style_pltk}
                  cur={props.cur}
                  key={item.ps}
                  link={props.match.url + '/' + item.ps}
                  item={item}
                />
              ))
          ) : (
            <div className="goods-none">Товаров не найдено</div>
          )}
        </div>
        {loadCnt < numenclature.length ? (
          <div className="button-text button load-more" onClick={loadMore}>
            Загрузить еще
          </div>
        ) : (
          <></>
        )}
      </Preloader>
    </>
  );
};

const mapStateToProps = store => {
  return {
    selectedMaterial: store.material.selectedMaterial,
    cur: store.valute_data.valute,
    upper_izd: store.filter_data.upper_izd,
    activeFilters: store.filter_data.activeFilters,
    auth_token: store.auth_data.auth_token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedMaterial: data => {
      dispatch(materialActions.setSelectedMaterial(data));
    },
    setNumGroups: data => {
      dispatch(dataActions.setNumGroups(data));
    },
    setMobData: data => {
      dispatch(filterActions.setMobData(data));
    },
    setDefMobData: data => {
      dispatch(filterActions.setDefMobData(data));
    },
    setLvl: data => {
      dispatch(filterActions.setLvl(data));
    },
    setGroups: data => {
      dispatch(filterActions.setGroups(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Numenclature);