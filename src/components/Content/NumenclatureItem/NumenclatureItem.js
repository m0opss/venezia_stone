import React from 'react';
import { Link } from 'react-router-dom';

import './NumenclatureItem.scss';

const NumenclatureItem = props => {
  if (props.pltk) {
    return (
      <div key={props.id} className="num-gr-item" onClick={props.onClick}>
        <Link to={props.link}>
          <div className="num-gr-item__img">
            <img src={props.img} alt="" className="num-gr-item__img" />
          </div>
          <div className="num-gr-item__name">{`${props.itemName}`}</div>
        </Link>
        <div className="num-gr-item__descr -num">
          <div className="num-gr-item__line -f">
            {props.item.izd === 'Плитка' ? (
              <p></p>
            ) : (
              <p>Количество слэбов: {props.cs}</p>
            )}

            <p>
              Цена от {props.pr}
              {props.cur}
            </p>
          </div>
          {props.cp != 0 ? (
            <p className="num-gr-item__line">Количество пачек: {props.cp}</p>
          ) : (
            <p className="num-gr-item__line"></p>
          )}

          <div className="num-gr-item__line --s">
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
        className="num-gr-item num-gr-item-root num-item"
        onClick={props.onClick}
      >
        <div className="num-gr-item__img">
          <img src={props.img} alt="" className="num-gr-item__img" />
        </div>
        <div className="num-gr-item__name">{props.itemName}</div>
        <div className="num-gr-item__pach">
          {props.cp != 0 ? props.cp : '-'}
        </div>
        <div className="num-gr-item__slabs">
          {props.item.izd === 'Плитка' ? '-' : props.cs}
        </div>
        <div className="num-gr-item__sqrt">
          {props.kw} м<sup>2</sup>
        </div>
        <div className="num-gr-item__cost">22 $</div>
        <Link to={props.link}>Подробнее</Link>
      </div>
    );
  }
};
export default NumenclatureItem;
