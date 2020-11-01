import React from 'react';
import { Link } from 'react-router-dom';

import './NumenclatureItem.scss';

const NumenclatureItem = props => {
  if (props.pltk) {
    return (
      <div key={props.ps} className="num-gr-item">
        <Link to={props.link}>
          <div className="num-gr-item__img">
            <img src={props.item.photo_item} className="num-gr-item__img" />
          </div>
          <div className="num-gr-item__name">{`${props.item.name}`}</div>
        </Link>
        <div className="num-gr-item__descr -num">
          <div className="num-gr-item__line -f">
            {props.item.izd === 'Плитка' ? (
              <p></p>
            ) : (
              <p>Количество слэбов: {props.item.cs}</p>
            )}

            <p>
              Цена от{' '}
              {props.cur === 'rub'
                ? `${props.item.cntRUB}₽`
                : props.cur === 'usd'
                ? `${props.item.cntUSD}$`
                : props.cur === 'eur'
                ? `${props.item.cntEUR}€`
                : ''}
            </p>
          </div>
          {props.item.cp != 0 ? (
            <p className="num-gr-item__line">
              Количество пачек: {props.item.cp}
            </p>
          ) : (
            <p className="num-gr-item__line" style={{ color: 'white' }}>
              .
            </p>
          )}

          <div className="num-gr-item__line --s">
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
      <div
        key={props.item.ps}
        className="num-gr-item num-gr-item-root num-item"
      >
        <div className="num-gr-item__img">
          <img src={props.item.photo_item} className="num-gr-item__img" />
        </div>
        <div className="num-gr-item__name">{props.item.name}</div>
        <div className="num-gr-item__pach">
          {props.item.cp != 0 ? props.item.cp : '-'}
        </div>
        <div className="num-gr-item__slabs">
          {props.item.izd === 'Плитка' ? '-' : props.item.cs}
        </div>
        <div className="num-gr-item__sqrt">
          {props.item.kw} м<sup>2</sup>
        </div>
        <div className="num-gr-item__cost">
          {props.cur === 'rub'
            ? `${props.item.cntRUB}₽`
            : props.cur === 'usd'
            ? `${props.item.cntUSD}$`
            : props.cur === 'eur'
            ? `${props.item.cntEUR}€`
            : ''}
        </div>
        <Link to={props.link}>Подробнее</Link>
      </div>
    );
  }
};
export default NumenclatureItem;
