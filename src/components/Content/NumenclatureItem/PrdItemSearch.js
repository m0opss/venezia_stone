import React from 'react';
import { Link } from 'react-router-dom';

import './NumenclatureItem.scss';

const PrdItemSearch = props => {
  if (props.pltk) {
    return (
      <div key={props.ps} className="num-gr-item">
        <Link to={props.link}>
          <div className="num-gr-item__img">
            <div className="num-gr-item__labels">
              {props.item.nw != null ? (
                <div className="item-label item-label-new">Новинка</div>
              ) : (
                <></>
              )}
              {props.item.onSale != null ? (
                <div className="item-label item-label-sale">Распродажа</div>
              ) : (
                <></>
              )}
              {props.item.pz != null ? (
                <div className="item-label item-label-order">Под заказ</div>
              ) : (
                <></>
              )}
            </div>
            <img src={props.item.photo_product} />
          </div>
          <div className="num-gr-item__name">{`${props.item.bl}`}</div>
        </Link>
        <div className="num-gr-item__descr -num">
          <div className="num-gr-item__line -f">
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

          <div className="num-gr-item__line --s">
            <p>
              Общая площадь: {props.item.os} м<sup>2</sup>
            </p>
            <Link to={props.link}>Подробнее</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Link to={props.link}>
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
export default PrdItemSearch;
