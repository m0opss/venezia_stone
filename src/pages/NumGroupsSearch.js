import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import materialActions from '../actions/materialAction';

import filterActions from 'actions/filterActions';

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
    if (localStorage.getItem('activeFilters') !== null) {
      let tmp = JSON.parse(localStorage.getItem('activeFilters'));
      tmp.materials = [];
      localStorage.setItem('activeFilters', JSON.stringify(tmp));
    }
    if (localStorage.getItem('activeFieldKeys') !== null) {
      let tmp = JSON.parse(localStorage.getItem('activeFieldKeys'));
      tmp = tmp.filter(f => {
        if (f[0] != '0') {
          return f;
        }
      });
      props.setActiveFields(tmp);
      localStorage.setItem('activeFieldKeys', JSON.stringify(tmp));
    }
    if (!isMobile) {
      document.body.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }

    setNumGroups(JSON.parse(localStorage.getItem('searchData')).grs);
    setdefNumGroups(JSON.parse(localStorage.getItem('searchData')).grs);
    // localStorage.setItem('material', response.data.mts[0].mt);
  }, [localStorage.getItem('searchData')]);

  const toggleStyle_pltk = () => {
    setHover_pltk(true);
    setNum_groups_items('num-gr-items-group');
  };

  const toggleStyle_list = () => {
    setHover_pltk(false);
    setNum_groups_items('num-gr-items-group-list');
  };
  const tr = data => {
    console.log('ngr', data);
    setNumGroups(data);
  };
  return (
    <>
      {isTablet ? (
        <Filter setData={data => tr(data)} />
      ) : (
        <BrowserView>
          <Filter setData={data => tr(data)} />
        </BrowserView>
      )}
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
            link={item.url.slice(0, item.url.length - 1)}
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
    cur: store.valute_data.valute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedMaterial: data => {
      dispatch(materialActions.setSelectedMaterial(data));
    },
    setActiveFields: data => {
      dispatch(filterActions.setActiveFields(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumGroups);
