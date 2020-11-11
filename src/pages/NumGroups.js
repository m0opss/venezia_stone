import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import materialActions from '../actions/materialAction';
import dataActions from 'actions/dataAction';
import filterActions from 'actions/filterActions';
import BackArrow from 'components/BackArrow/BackArrow';
import listIcon from 'images/str.png';
import pltk from 'images/pltk.png';
import listIcon_a from 'images/str_a.png';
import pltk_a from 'images/pltk_a.png';

import Valute from 'components/Valute/Valute';
import Sort from 'components/Sort/Sort';
import NumGroupItem from 'components/Content/NumGroupItem/NumGroupItem';

import './NumGroups.scss';
import Filter from 'components/Filter/Filter';
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

  const [style_pltk, setHover_pltk] = React.useState(true);
  const [num_groups_items, setNum_groups_items] = React.useState(
    'num-gr-items-group'
  );

  React.useEffect(() => {
    props.setLvl(2);

    window.scrollTo(0, 0);
    let isSubscr = true;
    if (isSubscr) {
      axios
        .get(
          `https://catalog-veneziastone.ru/api_v0/${props.match.url}/`
        )
        .then(response => {
          setNumGroups(response.data.mts[0].grs);
          setdefNumGroups(response.data.mts[0].grs);
          localStorage.setItem('material', response.data.mts[0].mt);
          localStorage.setItem('groups', []);
          localStorage.setItem('items', []);
          props.setMobData(setNumGroups);
          props.setDefMobData(setdefNumGroups);
        })
        .catch(e => {
          console.log(e);
        });
    }

    return () => (isSubscr = false);
  }, [props.upper_izd]);

  const toggleStyle_pltk = () => {
    setHover_pltk(true);
    setNum_groups_items('num-gr-items-group');
  };

  const toggleStyle_list = () => {
    setHover_pltk(false);
    setNum_groups_items('num-gr-items-group-list');
  };

  return (
    <>
      {isTablet || isBrowser ? <Filter /> : <></>}
      {isMobile && !isTablet ? <BackArrow history={props.history}/> : <></>}
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
        {numGroups.map(item => (
          <NumGroupItem
            pltk={style_pltk}
            key={item.ps}
            link={props.match.url + '/' + item.ps}
            item={item}
            cur={props.cur}
          />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = store => {
  return {
    cur: store.valute_data.valute,
    f_set: store.filter_data.f_set,
    upper_izd: store.filter_data.upper_izd,
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
    setItems: data => {
      dispatch(filterActions.setItems(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumGroups);
