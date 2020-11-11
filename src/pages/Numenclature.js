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

import './Numenclature.scss';

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
  const [num_groups_items, setNum_groups_items] = React.useState(
    'num-gr-items-group'
  );

  React.useEffect(() => {
    props.setLvl(3);
    window.scrollTo(0, 0);
    let isSubscr = true;
    axios
      .get(`https://catalog-veneziastone.ru/api_v0${props.match.url}/`)
      .then(response => {
        if (isSubscr) {
          setNumemclature(response.data.grs[0].itms);
          setdefNum(response.data.grs[0].itms);
          props.setDefMobData(setNumemclature);
          props.setMobData(setdefNum);
          props.setGroups(response.data.grs[0].id);
          localStorage.setItem('groups', response.data.grs[0].id);
          localStorage.setItem('items', []);
        }
      })
      .catch(e => {
        console.log(e);
      });
    document.getElementById('Все').setAttribute('style', 'color: #c98505');
    return () => (isSubscr = false);
  }, []);

  const toggleStyle_pltk = () => {
    setHover_pltk(true);
    setNum_groups_items('num-gr-items-group');
  };

  const toggleStyle_list = () => {
    setHover_pltk(false);
    setNum_groups_items('num-gr-items-group-list');
  };
  const styleFilt = id => {
    ['Все', 'Слэбы', 'Полоса', 'Плитка'].map(val => {
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
    if (e.target.id === 'Все') {
      setNumemclature(tmp);
    } else if (e.target.id === 'Слэбы') {
      setNumemclature(tmp.filter(el => el.izd === 'Слэбы'));
    } else if (e.target.id === 'Полоса') {
      setNumemclature(tmp.filter(el => el.izd === 'Полоса'));
    } else if (e.target.id === 'Плитка') {
      setNumemclature(tmp.filter(el => el.izd === 'Плитка'));
    } else if (e.target.id === 'Другие') {
      setNumemclature(
        tmp.filter(
          el => el.izd !== 'Слэбы' && el.izd !== 'Полоса' && el.izd !== 'Плитка'
        )
      );
    }
  };

  const tr = data => {
    console.log('nmc', data);
    setNumemclature(data);
  };

  return (
    <>
      {isTablet || isBrowser ? <Filter /> : <></>}
      {isMobile && !isTablet ? <BackArrow history={props.history}/> : <></>}
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

        {numenclature.map(item => (
          <NumenclatureItem
            pltk={style_pltk}
            cur={props.cur}
            key={item.ps}
            link={props.match.url + '/' + item.ps}
            item={item}
          />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = store => {
  return {
    selectedMaterial: store.material.selectedMaterial,
    cur: store.valute_data.valute
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
