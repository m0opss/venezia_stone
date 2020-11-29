import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import BackArrow from 'components/BackArrow/BackArrow';
import materialActions from '../actions/materialAction';
import filterActions from '../actions/filterActions';

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
import { Breadcrumb } from 'antd';
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
  const [breadPath, setBreadPath] = React.useState({});
  const [sortOn, setSortOn] = React.useState(false);
  const [style_pltk, setHover_pltk] = React.useState(true);
  const [isLoading, setLoading] = React.useState(true);
  const [num_groups_items, setNum_groups_items] = React.useState(
    'num-gr-items-group'
  );
  const [loadCnt, setLoadCnt] = React.useState(12);

  const arrFilt = ['_Слэбы', '_Полоса', '_Плитка'];

  React.useEffect(() => {
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
          token: [],
          // token: [props.auth_token],
          items: [],
          level: [3],
          nw: props.nw,
          on_sale: props.sale,
          groups: [props.match.params.numGroups]
        })
        .then(response => {
          setLoading(false);
          setNumemclature(response.data.itms);
          setdefNum(response.data.itms);
          setBreadPath(response.data.path);
          if (localStorage.getItem('3lvl_active_field') != null) {
            let arr = [
              ...JSON.parse(localStorage.getItem('3lvl_active_field'))
            ];
            if (arr.length == 0 && document.getElementById('Все') != null) {
              document
                .getElementById('Все')
                .setAttribute('style', 'color: #c98505');
              arrFilt.map(i => {
                document
                  .getElementById(i)
                  .setAttribute('style', 'color: black');
              });
            } else {
              arrFilt.map(i => {
                document
                  .getElementById('Все')
                  .setAttribute('style', 'color: black');
                if (arr.includes(i)) {
                  document
                    .getElementById(i)
                    .setAttribute('style', 'color: #c98505');
                } else {
                  document
                    .getElementById(i)
                    .setAttribute('style', 'color: black');
                }
              });
            }
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
  }, [
    props.activeFilters,
    props.upper_izd,
    props.cost,
    props.le,
    props.he,
    props.nw,
    props.sale
  ]);

  const toggleStyle_pltk = () => {
    setHover_pltk(true);
    setNum_groups_items('num-gr-items-group');
  };

  const toggleStyle_list = () => {
    setHover_pltk(false);
    setNum_groups_items('num-gr-items-group-list');
  };

  const filterIzd = e => {
    let t = [...props.activeFields];
    if (e.target.id === 'Все') {
      localStorage.setItem('3lvl_active_field', JSON.stringify([]));
      props.setUpper([]);
      props.all_upper.map(i => {
        t.splice(t.indexOf(i), 1);
      });
      props.setActiveFields(t);
      localStorage.setItem('activeFieldKeys', JSON.stringify(t));
    } else {
      const id = e.target.id;
      const s_id = id.slice(1, id.length);

      if (t.indexOf(s_id) !== -1) {
        t.splice(t.indexOf(s_id), 1);
      } else {
        t.push(s_id);
      }
      props.setActiveFields(t);
      localStorage.setItem('activeFieldKeys', JSON.stringify(t));

      let newArr = [...props.upper_izd];
      let ls_3lvl = [];
      if (newArr.indexOf(s_id) === -1) {
        newArr.push(s_id);
      } else {
        newArr.splice(newArr.indexOf(s_id), 1);
      }
      ls_3lvl = newArr.map(i => '_' + i);
      localStorage.setItem('3lvl_active_field', JSON.stringify(ls_3lvl));
      props.setUpper(newArr);
    }
  };

  const loadMore = () => {
    setLoadCnt(loadCnt => loadCnt + 12);
  };

  return (
    <>
      {isMobile && !isTablet ? <BackArrow history={props.history} /> : <></>}
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
          <Breadcrumb.Item>{breadPath.material}</Breadcrumb.Item>
          <Breadcrumb.Item>{breadPath.group}</Breadcrumb.Item>
        </Breadcrumb>
      )}
      <div style={{ display: 'flex' }} className="">
        {isTablet || isBrowser ? <Filter lvl="3" /> : <></>}
        <div style={{ width: '100%' }} className="">
          <div
            className={
              isMobile && !isTablet
                ? `num-options num-options-mobile`
                : 'num-options'
            }
          >
            <div
              className={
                isMobile && !isTablet
                  ? 'filter-options-mobile'
                  : `filter-options`
              }
            >
              <div id="Все" onClick={filterIzd}>
                Все
              </div>
              <div id="_Слэбы" onClick={filterIzd}>
                Слэбы
              </div>
              <div id="_Полоса" onClick={filterIzd}>
                Полоса
              </div>
              <div id="_Плитка" onClick={filterIzd}>
                Плитка
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
          <Preloader isLoading={isLoading}>
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
                      link={item.url}
                      item={item}
                    />
                  ))
              ) : (
                <div className="goods-none">Товаров не найдено</div>
              )}
              {numenclature.length % 4 == 1 ? (
                <>
                  <div className="numGroup_empty"></div>
                  <div className="numGroup_empty"></div>
                  <div className="numGroup_empty"></div>
                </>
              ) : numenclature.length % 4 == 2 ? (
                <>
                  <div className="numGroup_empty"></div>
                  <div className="numGroup_empty"></div>
                </>
              ) : numenclature.length % 4 == 3 ? (
                <>
                  <div className="numGroup_empty"></div>
                </>
              ) : (
                <></>
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
        </div>
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
    activeFields: store.filter_data.activeFields,
    upper_izd: store.filter_data.upper_izd,
    activeFilters: store.filter_data.activeFilters,
    auth_token: store.auth_data.auth_token,
    sale: store.filter_data.sale,
    all_upper: store.filter_data.all_upper,
    nw: store.filter_data.nw
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUpper: data => {
      dispatch(filterActions.setUpper(data));
    },
    setActiveFields: data => {
      dispatch(filterActions.setActiveFields(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Numenclature);
