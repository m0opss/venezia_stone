import React, { useEffect } from 'react';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';
import { Link } from "react-router-dom"
import './BasketItem.scss';

const IzbrItem = props => {
  // console.log(props)
  const [summ, setSumm] = React.useState(0);
  const [cnt, setCnt] = React.useState(1);
  const [kw, setKw] = React.useState(1);
  useEffect(() => {
    setSumm((parseFloat(props.price) * kw).toFixed(2));
  });

  const kwChange = e => {
    console.log(e.target.value);
    setCnt(parseFloat(e.target.value));
  };
  const cntChange = e => {
    console.log(e.target.value);
    setKw(parseFloat(e.target.value));
  };
  const link = props.item.route.split('#')[1]
  return (
    <Link to={link} className="basket-item basket-item-root basket-item-typography">
      <div className="basket-item__name">
        {props.name} {props.id}
      </div>
      <div className="basket-item__type">{props.type}</div>
      <div className="basket-item__info">
        <img src={props.photo} />
        {props.type == 'Слэб' ? (
          <>
            <div className="basket-item__text">
              <div className="basket-item__line-wrapper">
                <div className="basket-item__line">
                  <p>Склад: {props.sklad}</p>
                  <p>
                    Цена за м<sup>2</sup>: {props.price}
                  </p>
                </div>
                <div className="basket-item__line">
                  <p>
                    {' '}
                    Наличие, м<sup>2</sup>: {props.ostkw}
                  </p>
                  <p>Наличие, шт: {props.ostsh}</p>
                </div>
              </div>
              <div className="basket-item__line -price">
                <div className="price-input">
                  <p>
                    м<sup>2</sup> :
                    <input
                      type="number"
                      min="0"
                      defaultValue={kw}
                      step="0.01"
                      onBlur={kwChange}
                    />
                  </p>
                  <p>
                    шт :
                    <input
                      type="number"
                      min="0"
                      defaultValue={cnt}
                      onBlur={cntChange}
                    />
                  </p>
                </div>
                <div className="price-view">
                  <p id="cost">Сумма: {summ}</p>
                  <div className="basket-item__buttons">
                    <ItemAddIzbr item={props.item} />
                    <ItemAddBasket item={props.item} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="basket-item__text">
            <div className="basket-item__line-wrapper">
              <div className="basket-item__line">
                <p>Склад: {props.sklad}</p>
                <p>Длина: {props.le} м</p>
                <p>Ширина: {props.he} м</p>
              </div>
              <div className="basket-item__line">
                <p>
                  Площадь, м<sup>2</sup>: {props.kw}
                </p>
                <p>Пачка {props.bl}</p>
              </div>
            </div>
            <div className="basket-item__line -price">
              <p id="cost">
                Сумма:{' '}
                {(parseFloat(props.kw) * parseFloat(props.price)).toFixed(2)}
              </p>
              <div className="basket-item__buttons">
                <ItemAddIzbr item={props.item} />
                <ItemAddBasket item={props.item} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default IzbrItem;
