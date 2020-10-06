import React from 'react';

// import NavbarMenu from './NavbarMenu'
// import Menu from "../../../Menu/Menu"

import './Navbar.scss'

const plitka = {
  '0' : 'Гранит',
  '1' : 'Мрамор',
  '2' : 'Известняк',
  '3' : 'Траверин',
  '4' : 'Лабродорит',
  '5' : 'Сланец',
  '6' : 'Базальт',
  '7' : 'Кварцит',
  '8' : 'Оникс',
  '9' : 'Эксклюзивная колекция'
}

const PlitkaMenu = props => {
  return (
    <div className="navbar__plitka">
      {/* <Menu options={plitka} name='Плитка'/> */}
    </div>
  )
}
export default PlitkaMenu