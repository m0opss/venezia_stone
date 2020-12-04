import React from 'react';

import SliderSize from '../Slider/SliderSize';

import { Menu } from 'antd';
const { SubMenu } = Menu;

const SizesSubMenu = ({ sub_name, sub_elements, setLe, setHe, ...props }) => {
  const toggle_le = sizes => {
    setLe(sizes);
  };
  const toggle_he = sizes => {
    setHe(sizes);
  };
  console.log()
  return (
    <SubMenu key="size-sub" title="Размеры" {...props}>
      <SliderSize
        defVal={sub_elements}
        onChange_le={toggle_le}
        onChange_he={toggle_he}
      />
    </SubMenu>
  );
};

export default SizesSubMenu;
