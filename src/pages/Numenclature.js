import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import materialActions from '../actions/materialAction';
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
  isMobile
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
    let isSubscr = true;
    axios
      .get(`https://catalog-veneziastone.ru/api_v0${props.match.url}/`)
      .then(response => {
        if (isSubscr) {
          setNumemclature(response.data.grs[0].itms);
          setdefNum(response.data.grs[0].itms);
          console.log(response.data.grs[0].itms)
        }
      })
      .catch(e => {
        console.log(e);
      });
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

  const filterIzd = (e) => {
    if(e.targer.id === 'filter-opt-1') {
      
    }
    if(e.targer.id === 'filter-opt-2') {

    }
    if(e.targer.id === 'filter-opt-3') {

    }
    if(e.targer.id === 'filter-opt-4') {

    }
    if(e.targer.id === 'filter-opt-5') {

    }
  }

  return (
    <>
      {isTablet ? (
        <Filter />
      ) : (
        <BrowserView>
          <Filter />
        </BrowserView>
      )}
      <div
        className={
          isMobile && !isTablet
            ? `num-options num-options-mobile`
            : 'num-options'
        }
      >
        {isMobile && !isTablet ? (
          <div className="filter-options-mobile">
            <div id="filter-opt-1" onClick={() => {}}>
              Все
            </div>
            <div id="filter-opt-2" onClick={() => {}}>
              Слэбы
            </div>
            <div id="filter-opt-3" onClick={() => {}}>
              Полоса
            </div>
            <div id="filter-opt-4" onClick={() => {}}>
              Плитка
            </div>
            <div id="filter-opt-5" onClick={() => {}}>
              Другие изделия
            </div>
          </div>
        ) : (
          <div className="filter-options">
            <div id="filter-opt-1" onClick={() => {}}>
              Все
            </div>
            <div id="filter-opt-2" onClick={() => {}}>
              Слэбы
            </div>
            <div id="filter-opt-3" onClick={() => {}}>
              Полосы
            </div>
            <div id="filter-opt-4" onClick={() => {}}>
              Плитка
            </div>
            <div id="filter-opt-5" onClick={() => {}}>
              Другие изделия
            </div>
          </div>
        )}
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
          <p>Фото</p>
          <p>Название</p>
          <p>Количество пачек</p>
          <p>Количество слэбов</p>
          <p>Общая площадь</p>
          <p>Цена от</p>
          <p></p>
        </div>

        {numenclature.map((item, index) => (
          <NumenclatureItem
            pltk={style_pltk}
            cp={item.cp}
            cs={item.cs}
            kw={item.kw}
            pr={item.prrub}
            prusd={item.prusd}
            preur={item.preur}
            cur={item.cur}
            key={item.ps}
            img={item.photo}
            link={props.match.url + '/' + item.ps}
            item={item}
            tp={item.tp}
            itemName={item.name}
            id={item.id}
          />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = store => {
  return {
    selectedMaterial: store.material.selectedMaterial
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedMaterial: data => {
      dispatch(materialActions.setSelectedMaterial(data));
    },
    setNumGroups: data => {
      dispatch(dataActions.setNumGroups(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Numenclature);
