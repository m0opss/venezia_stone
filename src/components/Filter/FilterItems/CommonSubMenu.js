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
        <SubMenu key={sub_name} title={sub_title} {...props}>
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
