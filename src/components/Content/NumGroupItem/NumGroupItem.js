import React from 'react';
import { Link } from 'react-router-dom';

import './NumGroupItem.scss';

const MaterialItem = props => {
  return (
    <div key={props.id} className="catalog-item" onClick={props.onClick}>
      <Link to={props.link}>
        <img src={props.img} alt="" className="catalog-item__img" />
        <div className="catalog-item__name">{props.itemName}</div>
      </Link>
    </div>
  );
};
export default MaterialItem;
