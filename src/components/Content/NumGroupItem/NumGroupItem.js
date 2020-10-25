import React from 'react';
import { Link } from 'react-router-dom';

import './NumGroupItem.scss';

const MaterialItem = props => {
  if (props.pltk) {
    return (
      <div key={props.id} className="num-gr-item" onClick={props.onClick}>
        <Link to={props.link}>
          <div className="num-gr-item__name">{props.itemName}</div>
          <div className="num-gr-item__img">
            <img src={props.img} alt="" className="num-gr-item__img" />
          </div>
        </Link>
        <div className="num-gr-item__descr">
          <div className="num-gr-item__line -f">
            <p>SKU</p>
            <p>Цена от 45$</p>
          </div>
          <div className="num-gr-item__line -s">
            <p>
              Общая площадь: 22 м<sup>2</sup>
            </p>
            <Link to={props.link}>Подробнее</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div key={props.id} className="num-gr-item num-gr-item-root" onClick={props.onClick}>
        <div className="num-gr-item__img">
          <img src={props.img} alt="" className="num-gr-item__img" />
        </div>
        <div className="num-gr-item__name">{props.itemName}</div>
        <div className="num-gr-item__sku">1111</div>
        <div className="num-gr-item__sqrt">22 м<sup>2</sup></div>
        <div className="num-gr-item__cost">22 $</div>
        <Link to={props.link}>Подробнее</Link>
      </div>
    );
  }
};
export default MaterialItem;
