import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import materialActions from '../actions/materialAction';
import dataActions from 'actions/dataAction';
import a_z from 'images/a-z.png';
import arrow from 'images/arr.svg';

import listIcon from 'images/str.png';
import pltk from 'images/pltk.png';
import listIcon_a from 'images/str_a.png';
import pltk_a from 'images/pltk_a.png';

import { Icon } from '@iconify/react';
import sortIcon from '@iconify/icons-dashicons/sort';
import Valute from 'components/Valute/Valute';
import NumGroupItem from '../components/Content/NumGroupItem/NumGroupItem';

import './NumGroups.scss';
import Filter from 'components/Filter/Filter';
import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile,
  isBrowser
} from 'react-device-detect';

const AlphSortArr = arr => {
  let tmp = [...arr];
  tmp.sort((a, b) => {
    let nameA = a.gr.toLowerCase(),
      nameB = b.gr.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return tmp;
};
const ColorSortArr = arr => {
  let tmp = [...arr];
  tmp.sort((a, b) => {
    let nameA = a.id_color,
      nameB = b.id_color;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return tmp;
};

const NumGroups = props => {
  const [numGroups, setNumGroups] = React.useState([]);
  const [initialArr, setInitialArr] = React.useState([]);
  const [alphSorted, setAlphSorted] = React.useState([]);
  const [colorSorted, setColorSorted] = React.useState([]);

  const [IsColorSorted, setIsColorSorted] = React.useState(false);
  const [IsAlphSorted, setIsAlphSorted] = React.useState(false);

  const [style_pltk, setHover_pltk] = React.useState(true);
  const [num_groups_items, setNum_groups_items] = React.useState(
    'num-gr-items-group'
  );

  React.useEffect(() => {
    let isSubscr = true;
    axios
      .get(
        `https://catalog-veneziastone.ru/api_v0/${props.match.params.material}/`
      )
      .then(response => {
        if (isSubscr) {
          setInitialArr(response.data.mts[0].grs);
          setNumGroups(response.data.mts[0].grs);
          setColorSorted(ColorSortArr(response.data.mts[0].grs));
          setAlphSorted(AlphSortArr(response.data.mts[0].grs));
        }
      })
      .catch(e => {
        console.log(e);
      });
    return () => (isSubscr = false);
  }, []);

  const AlphSort = () => {
    console.log(IsAlphSorted);
    setIsAlphSorted(!IsAlphSorted);
    if (IsAlphSorted) setNumGroups(alphSorted);
    else setNumGroups(initialArr);
  };

  const ColorSort = () => {
    setIsColorSorted(!IsColorSorted);
    let object = document.getElementsByTagName('object'); //получаем элмент object
    console.log(object)
    if (IsColorSorted) {
      setNumGroups(colorSorted);
      // let svgDocument = object.contentDocument; //получаем svg элемент внутри object
      // let svgElement = svgDocument.getElementsByTagName('path'); //получаем любой элемент внутри svg
      // svgElement.setAttribute('fill', 'red');
    } else setNumGroups(initialArr);
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
      <div className="num-gr-options">
        <Valute />
        <div className="num-gr-options__color_sort" onClick={ColorSort}>
          <object type="image/svg+xml" data={arrow}>
          </object>
        </div>
        <div className="num-gr-options__sort_alph" onClick={AlphSort}>
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

      <div className={num_groups_items}>
        <div
          className="num-gr-items-group-col num-gr-item-root"
          style={style_pltk ? { display: 'none' } : {}}
        >
          <p>Фото</p>
          <p>Название</p>
          <p>Количество SKU</p>
          <p>Общая площадь</p>
          <p>Цена от</p>
          <p></p>
        </div>

        {numGroups.map(item => (
          <NumGroupItem
            pltk={style_pltk}
            key={item.id}
            sku={item.sku}
            pr={item.pr}
            cur={item.cur}
            kw={item.kw}
            img={item.file}
            link={props.match.url + '/' + item.ps}
            item={item}
            itemName={item.gr}
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

export default connect(mapStateToProps, mapDispatchToProps)(NumGroups);
