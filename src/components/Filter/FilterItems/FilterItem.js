import React from 'react';

import ColorsSubMenu from './ColorsSubMenu';
import PriceSubMenu from './PriceSubMenu';
import SizesSubMenu from './SizesSubMenu';
import CommonSubMenu from './CommonSubMenu';

const FilterItem = ({
  activeFilters,
  setActiveFields,
  setActiveFilters,
  setCost,
  setLe,
  setHe,
  ...props
}) => {
  let { sub_name } = props;

  const filterItemClicked = (e, sub_key) => {
    setActiveFields(e.key);
    let newArr = { ...activeFilters };
    if (newArr[sub_key]) {
      if (newArr[sub_key].includes(e.key)) {
        newArr[sub_key].splice(newArr[sub_key].indexOf(e.key), 1);
      } else {
        newArr[sub_key].push(e.key);
      }
    }
    setActiveFilters(newArr);
    localStorage.setItem('activeFilters', JSON.stringify(newArr));
  };

  return sub_name == 'colors' ? (
    <ColorsSubMenu filterItemClicked={filterItemClicked} {...props} />
  ) : sub_name == 'prices' ? (
    <PriceSubMenu setCost={setCost} {...props} />
  ) : sub_name == 'sizas' ? (
    <SizesSubMenu setLe={setLe} setHe={setHe} {...props} />
  ) : (
    <CommonSubMenu filterItemClicked={filterItemClicked} {...props} />
  );
};

export default FilterItem;
