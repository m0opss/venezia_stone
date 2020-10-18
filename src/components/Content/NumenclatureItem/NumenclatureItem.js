import React from 'react';
import { Link } from 'react-router-dom';

import './NumenclatureItem.scss';

const NumenclatureItem = props => {
  console.log(props)
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
          <p>SKU</p>
          <p>Цена от 45$</p>
        </div>
        <p className="num-gr-item__line">Количество пачек</p>
        <div className="num-gr-item__line --s">
          <p>
            Общая площадь: 22 м<sup>2</sup>
          </p>
          <Link to={props.link}>Подробнее</Link>
        </div>
      </div>
    </div>
  );
};
export default NumenclatureItem;
