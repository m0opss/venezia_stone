import React from 'react';

import { Link } from 'react-router-dom';
import BasketIcon from 'images/basket_icon.png';
import './BasketButton.scss';

const BasketButton = props => {
  return (
    <div className="top-line__basket">
      <Link to="/basket">
        <img className="top-line__basket-counter" src={BasketIcon} alt="" />
      </Link>
      <div className="top-line__basket-counter">{props.basket_counter}</div>
    </div>
  );
};
export default BasketButton;
