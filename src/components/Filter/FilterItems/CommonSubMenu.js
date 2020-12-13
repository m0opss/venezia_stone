import React from 'react';

import { Menu } from 'antd';
const { SubMenu } = Menu;
import data from '../filterData';

const CommonSubMenu = ({
  sub_name,
  sub_elements,
  sub_title,
  activeFilters,
  setActiveFields,
  setActiveFilters,
  filterItemClicked,
  ...props
}) => {
  const { cities } = data;
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
                {sub_name != 'cities'
                  ? elem
                  : Object.keys(cities).map(k => {
                      if (k == material) {
                        return cities[k];
                      }
                    })}
              </Menu.Item>
            );
          })}
        </SubMenu>
      </>
    );
  else return <></>;
};

export default CommonSubMenu;
