import React from 'react';

// import Menu from '../../../Menu/Menu'

import { Menu } from 'antd';
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react';
import mapMarker from '@iconify/icons-mdi/map-marker';

import Dropdown from 'components/Dropdown/Dropdown'

import "./ChooseCity.scss"

// const cityOptions = {
//   '0': 'Москва',
//   '1': 'Санкт-Петербург',
//   '2': 'Краснодар',
//   '3': 'Екатеринбург',
//   '4': 'Казань',
//   '5': 'Крым'
// }
const cityOptions = [
  'Москва',
  'Санкт-Петербург',
  'Краснодар',
  'Екатеринбург',
  'Казань',
  'Крым'
]

const menu = (
  // Object.keys(cityOptions).map((key, index) => (
  cityOptions.map((item, index) => (
    <Menu.Item key={index}><div className="city">{item}</div></Menu.Item>
  ))
)

const ChooseCity = props => {
  return (
    <div className="top-line__city">
      <Icon icon={mapMarker} width="1.5em" height="1.5em" color="#C98505" />
      <Dropdown type='city' title={cityOptions[0]} menuList={menu} />
    </div>
  )
}
export default ChooseCity