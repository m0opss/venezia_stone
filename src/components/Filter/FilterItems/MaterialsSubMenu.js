import React from 'react';

import { Menu } from 'antd';
const { SubMenu } = Menu;
import data from '../filterData';
import { Link } from 'react-router-dom';

const MaterialsSubMenu = ({
  sub_name,
  sub_elements,
  sub_title,
  activeFilters,
  setActiveFields,
  setActiveFilters,
  filterItemClicked,
  ...props
}) => {
  if (Array.isArray(sub_elements))
    return (
      <>
        <SubMenu
          key={sub_name}
          title={
            Object.keys(activeFilters).length > 0 && activeFilters[sub_name] && 
            activeFilters[sub_name].length == 0
              ? sub_title
              : activeFilters[sub_name]
              ? `${sub_title}: ${activeFilters[sub_name].length}`
              : sub_title
          }
          {...props}
        >
          {sub_elements.map(elem => {
            return (
              <Menu.Item
                key={elem}
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={e => filterItemClicked(e, sub_name)}
              >
                {props.lvl != 1 ? elem : <Link to="/materials">{elem}</Link>}
              </Menu.Item>
            );
          })}
        </SubMenu>
      </>
    );
  else return <></>;
};

export default MaterialsSubMenu;
