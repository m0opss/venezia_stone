import React from 'react';

import ColorsSubMenu from './ColorsSubMenu';
import PriceSubMenu from './PriceSubMenu';
import SizesSubMenu from './SizesSubMenu';
import CommonSubMenu from './CommonSubMenu';
import MaterialsSubMenu from './MaterialsSubMenu';

const FilterItem = ({
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
    let newArr = { ...props.activeFilters };
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
  return sub_name == 'prices' ? (
    <PriceSubMenu setCost={setCost} {...props} />
  ) : sub_name == 'sizas' ? (
    <SizesSubMenu setLe={setLe} setHe={setHe} {...props} />
  ) : sub_name == 'colors' && parseFloat(props.lvl) < 3 ? (
    <ColorsSubMenu filterItemClicked={filterItemClicked} {...props} />
  ) : sub_name == 'countries' && parseFloat(props.lvl) < 3 ? (
    <CommonSubMenu filterItemClicked={filterItemClicked} {...props} />
  ) : sub_name == 'materials' && parseFloat(props.lvl) < 3 ? (
    <MaterialsSubMenu filterItemClicked={filterItemClicked} {...props} />
  ) : (sub_name == 'izdelie' ||
      sub_name == 'thickness' ||
      sub_name == 'obrabotka') &&
    parseFloat(props.lvl) < 4 ? (
    <CommonSubMenu filterItemClicked={filterItemClicked} {...props} />
  ) : sub_name == 'sklad' ? (
    <CommonSubMenu filterItemClicked={filterItemClicked} {...props} />
  ) : (
    <></>
  );
};

export default FilterItem;
