import React from 'react';
import { Link } from 'react-router-dom';

import './MaterialItem.scss';

const MaterialItem = props => {
  console.log(props.sku);
  return (
    <div className="catalog-item" onClick={props.onClick}>
      <Link to={props.link}>
        <img src={props.img} alt="" className="catalog-item__img" />
        <div className="catalog-item__label catalog-item__sku">
          <p>{props.item.sku} SKU</p>
          <p>{props.item.kw} М<sup>2</sup></p>
        </div>
        <div className="catalog-item__label catalog-item__name">
          {props.itemName}
        </div>
      </Link>
    </div>
  );
};
export default MaterialItem;
