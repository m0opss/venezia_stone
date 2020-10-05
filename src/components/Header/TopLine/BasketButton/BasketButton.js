import React from 'react';

import { Icon } from '@iconify/react';
import { Link } from "react-router-dom"

import BasketIcon from "images/basket_icon.png"
import cartIcon from '@iconify/icons-mdi/cart';
import "./BasketButton.scss"

const BasketButton = props => {
  return (
    <div className=".top-line__basket">
      <Link to='/basket' >
        <img src={BasketIcon} alt="" />
        {/* <div className="top-line__basket-counter">{props.basket_counter}</div> */}
      </Link>
    </div>
  )
}
export default BasketButton