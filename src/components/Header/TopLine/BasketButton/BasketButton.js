import React from 'react';

import { Link } from 'react-router-dom';
import BasketIcon from 'images/basket_icon_black.svg';
import './BasketButton.scss';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';

const BasketButton = props => {
  let basket_counter = props.basket.length
  return (
    <>
      <div className="top-line__basket">
        <Link to="/basket">
          <img className="top-line__basket-counter -icon" src={BasketIcon} />
        </Link>
        {isMobile ? (
          <></>
        ) : (
          <div className="top-line__basket-counter">{basket_counter}</div>
        )}
      </div>
    </>
  );
};
const mapStateToProps = store => {
  return {
    basket: store.basket_data.basket
  };
};
export default connect(mapStateToProps)(BasketButton);
