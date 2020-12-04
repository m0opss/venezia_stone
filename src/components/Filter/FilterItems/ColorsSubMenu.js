import React from 'react';

import { Menu } from 'antd';
const { SubMenu } = Menu;

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
      <SubMenu key={sub_name} title={sub_title} {...props}>
        {sub_elements.map(color => {
          return (
            <Menu.Item
              key={color}
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={(e) => filterItemClicked(e, 'colors')}
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
                  <div
                    className="filter__color"
                    style={{
                      background:
                        'radial-gradient(circle, orange , yellow, green, cyan, blue, violet)'
                    }}
                  />
                  {color}
                </>
              ) : color === 'Эксклюзивный' ? (
                <>
                  <div
                    className="filter__color"
                    style={{ background: colors[color] }}
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