import React from 'react'

import Filter from './Filter/Filter'
import BorderMenu from './Navbar/BorderMenu'
import BruschatkaMenu from './Navbar/BruschatkaMenu'
import Catalog from './Navbar/Catalog'
import MozaikaMenu from './Navbar/MozaikaMenu'
import PlitkaMenu from './Navbar/PlitkaMenu'
import SpecialPrice from './Navbar/SpecialPrice'
import StupeniMenu from './Navbar/StupeniMenu'

import './SecondLine.scss'

const SecondLine = () => (
  <div className="second-line">
    <Filter />
    <div className="navbar">
      <Catalog />
      <PlitkaMenu />
      <StupeniMenu />
      <BruschatkaMenu />
      <MozaikaMenu />
      <BorderMenu />
      <SpecialPrice />
    </div>
  </div>
)

export default SecondLine