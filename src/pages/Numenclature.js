import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import BackArrow from 'components/BackArrow/BackArrow';
import filterActions from '../actions/filterActions';

import Valute from 'components/Valute/Valute';
import Sort from 'components/Sort/Sort';
import listIcon from 'images/str.png';
import pltk from 'images/pltk.png';
import listIcon_a from 'images/str_a.png';
import pltk_a from 'images/pltk_a.png';
import Preloader from 'components/Preloader/Preloader';
import { headerCreator } from 'components/Filter/headerCreator';
import NumenclatureItem from '../components/Content/NumenclatureItem/NumenclatureItem';
import Filter from 'components/Filter/Filter';
import { Breadcrumb } from 'antd';
import { isTablet, isMobile, isBrowser } from 'react-device-detect';

import './Numenclature.scss';

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
      console.log({
        ...header,
        token: [],
        items: [],
        level: [3],
        nw: props.nw,
        on_sale: props.sale,
        groups: [props.match.params.numGroups]
      });
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
          console.log(response.data.itms);
          setdefNum(response.data.itms);
          setBreadPath(response.data.path);
          document
            .getElementById('Все')
            .setAttribute('style', 'color: #c98505');
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

  const arrFilt = ['Все', '_Слэбы', '_Полоса', '_Плитка'];

  const filterIzd = e => {
    const id = e.target.id;
    const s_id = id.slice(1, id.length);

    arrFilt.map(f => {
      if (f == s_id || f == id) {
        document.getElementById(f).setAttribute('style', 'color: #c98505');
      } else {
        document.getElementById(f).setAttribute('style', 'color: black');
      }
    });

    if (e.target.id === 'Все') {
      setNumemclature(defNum);
    } else {
      let newArr = defNum.filter(num => {
        if (num.izd == s_id) {
          return num;
        }
      });
      setNumemclature(newArr);
    }
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
          <Breadcrumb.Item>
            <Link to="/materials">{breadPath.material}</Link>
          </Breadcrumb.Item>
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
                numenclature.map(item => (
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
              {isMobile && !isTablet && numenclature.length % 4 == 1 ? (
                <>
                  <div className="numGroup_empty"></div>
                  <div className="numGroup_empty"></div>
                  <div className="numGroup_empty"></div>
                </>
              ) : isMobile && !isTablet && numenclature.length % 4 == 2 ? (
                <>
                  <div className="numGroup_empty"></div>
                  <div className="numGroup_empty"></div>
                </>
              ) : isMobile && !isTablet && numenclature.length % 4 == 3 ? (
                <>
                  <div className="numGroup_empty"></div>
                </>
              ) : (
                <></>
              )}
            </div>
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
