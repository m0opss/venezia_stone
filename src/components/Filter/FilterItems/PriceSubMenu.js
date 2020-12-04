import React from 'react';

import SliderCost from '../Slider/SliderCost';

import { Menu } from 'antd';
const { SubMenu } = Menu;

const PriceSubMenu = ({ sub_name, sub_elements, setCost, ...props }) => {
  const toggleCost = cost => {
    setCost(cost);
  };
  return (
    <>
      <SubMenu key="cost-sub" title="Цена за м2" {...props}>
        <SliderCost
          cur={props.cur}
          defVal={sub_elements}
          onChange={toggleCost}
        />
      </SubMenu>
    </>
  );
};

export default PriceSubMenu;
