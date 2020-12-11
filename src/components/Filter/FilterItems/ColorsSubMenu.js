import React from 'react';

import { Menu } from 'antd';
const { SubMenu } = Menu;

import mult from 'images/multi.png';
import data from '../filterData';

const ColorsSubMenu = ({
  sub_name,
  sub_elements,
  sub_title,
  activeFilters,
  setActiveFields,
  setActiveFilters,
  filterItemClicked,
  ...props
}) => {
  const { colors } = data;

  return (
    <>
      <SubMenu
        key={sub_name}
        title={
          Object.keys(activeFilters).length > 0 &&
          activeFilters[sub_name].length == 0
            ? sub_title
            : activeFilters[sub_name]
            ? `${sub_title}: ${activeFilters[sub_name].length}`
            : sub_title
        }
        {...props}
      >
        {sub_elements.map(color => {
          return (
            <Menu.Item
              key={color}
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={e => filterItemClicked(e, 'colors')}
            >
              {color === 'Белый' ? (
                <>
                  <div
                    className="filter__color border-color"
                    style={{ background: colors[color] }}
                  />
                  {color}
                </>
              ) : color === 'Мультиколор' ? (
                <>
                  <img className="filter__color" src={mult} />
                  {color}
                </>
              ) : color === 'Эксклюзивный' ? (
                <>
                  <div
                    className="filter__color"
                    style={{
                      background:
                        'linear-gradient(blue, pink, rgb(252, 74, 74), orange)'
                    }}
                  />
                  {color}
                </>
              ) : (
                <>
                  <div
                    className="filter__color"
                    style={{ background: colors[color] }}
                  />
                  {color}
                </>
              )}
            </Menu.Item>
          );
        })}
      </SubMenu>
    </>
  );
};

export default ColorsSubMenu;
