import React from 'react';
import Menu from '../../../Menu/Menu'

import "./CustomMenu.scss"

const menuOptions = {
  '0': 'Распродажа',
  '1': 'Товар в наличии',
  '2': 'Новое поступление',
  '3': 'Под заказ',
  '4': 'Рекомендованное',
  '5': 'Товары в пути'
}

const CustomMenu = props => {
  return(
    <div className="top-line__menu">
      <Menu options={menuOptions}/>
    </div>
  )
}
export default CustomMenu