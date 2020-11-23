import React from 'react';

import { Menu } from 'antd';
import { Icon } from '@iconify/react';
import mapMarker from '@iconify/icons-mdi/map-marker';

import MyDropdown from 'components/Dropdown/Dropdown';

import './ChooseCity.scss';

const cityOptions = [
  'Москва',
  'Санкт-Петербург',
  'Краснодар',
  'Екатеринбург',
  'Казань',
  'Крым'
];

const ChooseCity = props => {
  const menu = cityOptions.map((item, index) => (
    <Menu.Item key={index}>
      <div className="city" id={item} onClick={e => props.setCity(e.target.id)}>
        {item}
      </div>
    </Menu.Item>
  ));
  return (
    <div className="top-line__city">
      <Icon icon={mapMarker} width="1.5em" height="1.5em" color="#C98505" />
      <MyDropdown type="city" title={cityOptions[0]} menuList={menu} />
    </div>
  );
};
export default ChooseCity;
