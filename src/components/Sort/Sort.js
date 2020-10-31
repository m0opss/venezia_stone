import React, { useEffect } from 'react';

import a_z from 'images/a-z.png';
import arrow from 'images/arr.svg';

import './Sort.scss';

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
    let nameA = a.id_color_sort,
      nameB = b.id_color_sort;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return tmp;
};

const Sort = props => {
  let customStyleRoot = props.rootStyle ? props.rootStyle : '';

  const ArrSort = e => {
    if (!props.on) {
      props.setSortOn(true);
      if (e.target.id === 'alph') {
        props.setArr(AlphSortArr(props.arr));
      }
      if (e.target.id === 'color') {
        props.setArr(ColorSortArr(props.arr));
      }
    } else {
      props.setArr(props.defArr);
      props.setSortOn(false);
    }
  };

  // const ColorSort = () => {
  //   // let object = document.getElementsByTagName('object'); //получаем элмент object
  //   // let svgDocument = object.contentDocument; //получаем svg элемент внутри object
  //   // let svgElement = svgDocument.getElementsByTagName('path'); //получаем любой элемент внутри svg
  //   // svgElement.setAttribute('fill', 'red');
  // };

  return (
    <div className={`sort-line ${customStyleRoot}`}>
      <div id="color" className="num-gr-options__color_sort" onClick={ArrSort}>
        {/* <object type="image/svg+xml" data={arrow}></object> */}
        <img id="color" src={arrow} />
      </div>
      <div id="alph" className="num-gr-options__sort_alph" onClick={ArrSort}>
        <img id="alph" src={a_z} />
      </div>
    </div>
  );
};

export default Sort;
