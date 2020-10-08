import React from 'react';
import { Link } from "react-router-dom"

import SocialContacts from './SocialContacts/SocialContacts'
import ChooseCity from './ChooseCity/ChooseCity'
import Logo from './Logo/Logo'
import AccountButton from './AccountButton/AccountButton'
import BasketButton from './BasketButton/BasketButton'
import izbr from "images/izbrannoe_icon.png"
import "./TopLine.scss"

const TopLine = (props) => (
  <div className='top-line'>
    <div className="top-line__left-block">
      <Logo />
    </div>
    <div className="top-line__center-block">
      <SocialContacts />
      <ChooseCity />
    </div>
    <div className="top-line__right-block">
      <AccountButton authArr={props.authArr}/>
      <Link to='/izbrannoe' className="izbrannoe-button">
        <img src={izbr} alt=""/>
      </Link>
      <BasketButton basket_counter='2'/> {/* Здесь считать количество в корзине*/}
      
    </div>
    
  </div>
);

export default TopLine;