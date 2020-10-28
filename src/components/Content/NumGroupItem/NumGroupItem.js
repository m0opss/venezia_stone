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
            <p>SKU {props.sku}</p>
            <p>
              {/* Цена от  */}
              {props.pr}
              {props.cur}
            </p>
          </div>
          <div className="num-gr-item__line -s">
            <p>
              Общая площадь: {props.kw} м<sup>2</sup>
            </p>
            <Link to={props.link}>Подробнее</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={props.id}
        className="num-gr-item num-gr-item-root"
        onClick={props.onClick}
      >
        <div className="num-gr-item__img">
          <img src={props.img} className="num-gr-item__img" />
        </div>
        <div className="num-gr-item__name">{props.itemName}</div>
        <div className="num-gr-item__sku">{props.sku}</div>
        <div className="num-gr-item__sqrt">
          {props.kw} м<sup>2</sup>
        </div>
        <div className="num-gr-item__cost">
          {props.pr}
          {props.cur}
        </div>
        <Link to={props.link}>Подробнее</Link>
      </div>
    );
  }
};
export default MaterialItem;
