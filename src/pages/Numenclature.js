import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import materialActions from '../actions/materialAction';
import dataActions from 'actions/dataAction';

import a_z from 'images/a-z.png';
import listIcon from 'images/str.png';
import pltk from 'images/pltk.png';
import listIcon_a from 'images/str_a.png';
import pltk_a from 'images/pltk_a.png';

import { Icon } from '@iconify/react';
import sortIcon from '@iconify/icons-dashicons/sort';

import './Numenclature.scss';

import NumenclatureItem from '../components/Content/NumenclatureItem/NumenclatureItem';
import Filter from 'components/Filter/Filter';
import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile
} from 'react-device-detect';

const sortArr = arr => {
  let tmp = [...arr];
  tmp.sort((a, b) => {
    let nameA = a.id.toLowerCase(),
      nameB = b.id.toLowerCase();
    console.log(nameA, nameB);
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return tmp;
};

const Numenclature = props => {
  const [numenclature, setNumemclature] = React.useState([]);
  const [style_pltk, setHover_pltk] = React.useState(true);
  const [actionOption1, setActionOption1] = React.useState('');
  const [actionOption2, setActionOption2] = React.useState('');
  const [actionOption3, setActionOption3] = React.useState('');
  const [num_groups_items, setNum_groups_items] = React.useState(
    'num-gr-items-group'
  );

  React.useEffect(() => {
    let isSubscr = true;
    axios
      .get(`https://catalog-veneziastone.ru/api_v0${props.match.url}/`)
      .then(response => {
        console.log(response);
        if (isSubscr) {
          setNumemclature(response.data.grs[0].itms);
          // setNumemclature(sortArr(response.data.itms));
        }
      })
      .catch(e => {
        console.log(e);
      });
      return () => isSubscr = false
  }, []);

  const handleValOption = e => {
    if (e.target.id === 'val-opt-1') {
      setActionOption1('-active-opt');
      setActionOption2('');
      setActionOption3('');
    }
    if (e.target.id === 'val-opt-2') {
      setActionOption2('-active-opt');
      setActionOption1('');
      setActionOption3('');
    }
    if (e.target.id === 'val-opt-3') {
      setActionOption3('-active-opt');
      setActionOption1('');
      setActionOption2('');
    }
  };

  const alphSorted = numGroups => {
    let tmp = [...numGroups];
    tmp.reverse();
    setNumGroups(tmp);
  };

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
            <div className="filter-opt-1" onClick={() => {}}>
              Все
            </div>
            <div className="filter-opt-2" onClick={() => {}}>
              Слэбы
            </div>
            <div className="filter-opt-3" onClick={() => {}}>
              Полоса
            </div>
            <div className="filter-opt-4" onClick={() => {}}>
              Плитка
            </div>
            <div className="filter-opt-5" onClick={() => {}}>
              Другие изделия
            </div>
          </div>
        ) : (
          <div className="filter-options">
            <div className="filter-opt-1" onClick={() => {}}>
              Все
            </div>
            <div className="filter-opt-2" onClick={() => {}}>
              Слэбы
            </div>
            <div className="filter-opt-3" onClick={() => {}}>
              Полоса
            </div>
            <div className="filter-opt-4" onClick={() => {}}>
              Плитка
            </div>
            <div className="filter-opt-5" onClick={() => {}}>
              Другие изделия
            </div>
          </div>
        )}
        <div className="other-options">
          <p
            id="val-opt-1"
            className={`num-gr-options__valuta ${actionOption1}`}
            onClick={e => handleValOption(e)}
          >
            RUB
          </p>
          <p
            id="val-opt-2"
            className={`num-gr-options__valuta ${actionOption2}`}
            onClick={e => handleValOption(e)}
          >
            USD
          </p>
          <p
            id="val-opt-3"
            className={`num-gr-options__valuta ${actionOption3}`}
            onClick={e => handleValOption(e)}
          >
            EUR
          </p>
          <div className="num-gr-options__color_sort">
            <Icon
              icon={sortIcon}
              width="2.5em"
              height="2.5em"
              className="num-gr-options__color_icon"
            />
          </div>
          <div
            className="num-gr-options__sort_alph"
            onClick={() => alphSorted(numGroups)}
          >
            <img src={a_z} />
          </div>
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
            pr={item.pr}
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
    // data: store.data
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
