import React from 'react';

import Menu from '../../../Menu/Menu'
import {Icon} from '@iconify/react';
import mapMarker from '@iconify/icons-mdi/map-marker';

import "./ChooseCity.scss"

const cityOptions = {
  '0': 'Москва',
  '1': 'Санкт-Петербург',
  '2': 'Краснодар',
  '3': 'Екатеринбург',
  '4': 'Казань',
  '5': 'Крым'
}

const ChooseCity = props => {
  return(
    <div className="top-line__city">
      <Icon icon={mapMarker} color="#C98505"/>
      <Menu options={cityOptions}/>
    </div>
  )
}
export default ChooseCity