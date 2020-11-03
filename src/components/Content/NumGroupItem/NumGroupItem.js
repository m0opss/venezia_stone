import React from 'react';
import { Link } from 'react-router-dom';

import './NumGroupItem.scss';

const MaterialItem = props => {
  if (props.pltk) {
    return (
      <div key={props.item.ps} className="num-gr-item">
        <Link to={props.link}>
          <div className="num-gr-item__name">{props.item.gr}</div>
          <div className="num-gr-item__img">
            <img src={props.item.file} className="num-gr-item__img" />
          </div>
        </Link>
        <div className="num-gr-item__descr">
          <div className="num-gr-item__line -f">
            <p>SKU {props.item.sku}</p>
            <p>
              Цена от{' '}
              {props.cur === 'rub'
                ? `${props.item.prRUB}₽`
                : props.cur === 'usd'
                ? `${props.item.prUSD}$`
                : props.cur === 'eur'
                ? `${props.item.prEUR}€`
                : ''}
            </p>
          </div>
          <div className="num-gr-item__line -s">
            <p>
              Общая площадь: {props.item.kw} м<sup>2</sup>
            </p>
            <Link to={props.link}>Подробнее</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Link to={props.link}>
        <div key={props.id} className="num-gr-item num-gr-item-root">
          <div className="num-gr-item__img">
            <img src={props.item.file} className="num-gr-item__img" />
          </div>
          <div className="num-gr-item__name">{props.item.gr}</div>
          <div className="num-gr-item__sku">{props.item.sku}</div>
          <div className="num-gr-item__sqrt">
            {props.item.kw} м<sup>2</sup>
          </div>
          <div className="num-gr-item__cost">
            {props.cur === 'rub'
              ? `${props.item.prRUB}₽`
              : props.cur === 'usd'
              ? `${props.item.prUSD}$`
              : props.cur === 'eur'
              ? `${props.item.prEUR}€`
              : ''}
          </div>
          <span>Подробнее</span>
        </div>
      </Link>
    );
  }
};
export default MaterialItem;
