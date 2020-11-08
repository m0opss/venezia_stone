import React, { useEffect } from 'react';

import a_z from 'images/a_z.svg';
import a_z_active from 'images/a_z_active.svg';
import arrow from 'images/color.svg';
import arrow_active from 'images/color_active.svg';

import './Sort.scss';

const AlphSortArr = arr => {
  let tmp = [...arr];

  tmp.sort((a, b) => {
    // console.log(a.gr, b.gr)
    let nameA, nameB;
    if (a.gr) {
      nameA = a.gr.toLowerCase();
      nameB = b.gr.toLowerCase();
    } else if (a.name) {
      nameA = a.name.toLowerCase();
      nameB = b.name.toLowerCase();
    }
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return tmp;
};

const ColorSortArr = arr => {
  let tmp = [...arr];
  console.log(tmp);
  tmp.sort((a, b) => {
    let nameA = a.id_color_sort,
      nameB = b.id_color_sort;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return tmp;
};

const Sort = props => {
  // console.log(props)
  let customStyleRoot = props.rootStyle ? props.rootStyle : '';
  const [active, setActive] = React.useState('');

  // useEffect(() => {});

  const ArrSort = e => {
    console.log(props.on);
    if (!props.on) {
      props.setSortOn(true);
      if (e.target.id === 'alph') {
        props.setArr(AlphSortArr(props.arr));
        setActive('alph');
      }
      if (e.target.id === 'color') {
        props.setArr(ColorSortArr(props.arr));
        setActive('color');
      }
    } else {
      props.setArr(props.defArr);
      props.setSortOn(false);
      setActive('');
    }
  };

  return (
    <div className={`sort-line ${customStyleRoot}`}>
      <div id="color" className="num-gr-options__color_sort" onClick={ArrSort}>
        {active === 'color' ? (
          <img id="color" src={arrow_active} />
        ) : (
          <img id="color" src={arrow} />
        )}
      </div>
      <div id="alph" className="num-gr-options__sort_alph" onClick={ArrSort}>
        {active === 'alph' ? (
          <img id="alph" src={a_z_active} />
        ) : (
          <img id="alph" src={a_z} />
        )}
      </div>
    </div>
  );
};

export default Sort;
