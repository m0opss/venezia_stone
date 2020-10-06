import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom"

import Dropdown from 'components/Dropdown/Dropdown'

const Authored = props => {
  const menu = (
    <>
      <Menu.Item key="1"><Link to='/personal-data'>Персональные данные</Link></Menu.Item>
      <Menu.Item key="2"><Link to='/history'>История просмотров</Link></Menu.Item>
      <Menu.Item key="3"><Link to='/izbrannoe'>Избранное</Link></Menu.Item>
      <Menu.Item key="4">Выйти</Menu.Item>
     </> 
  )
  return (
    <Dropdown title={'Иванов Иван Иванович'} menuList={menu}/>
  )
}
export default Authored