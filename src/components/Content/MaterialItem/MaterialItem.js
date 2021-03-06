import React from 'react';
import { Link } from 'react-router-dom';

import './MaterialItem.scss';

const MaterialItem = (props ) => {
  return (
    <div
      className="catalog-item"
      onClick={() => props.onClick(props.itemName, props.type)}
    >
      <Link to={'/materials'}>
        <img src={props.img} className="catalog-item__img" />
        <div className="catalog-item__label catalog-item__sku">
          <p>{props.item.sku} SKU</p>
          <p>
            {props.item.kw} М<sup>2</sup>
          </p>
        </div>
        <div className="catalog-item__label catalog-item__name">
          {props.itemName}
        </div>
      </Link>
    </div>
  );
};
export default MaterialItem;
