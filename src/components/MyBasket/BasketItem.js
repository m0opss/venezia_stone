import React from 'react';

import deleteItem from 'images/deleteItem.png';
import like from 'images/like.png';
import liked from 'images/liked.png';
import basket_add from 'images/basket_add.png';
import basket_icon from 'images/basket_icon.png';

import './BasketItem.scss';

const BasketItem = props => {
  console.log(props.item);
  if (!props.item) {
    return (
      <div style={{ flex: '100%' }}>
        Нет данных о товаре
        <br />
      </div>
    );
  }
  let block;
  if (props.kind == 'basket') {
    block = (
      <div className="basket-item__buttons">
        <img src={deleteItem} onClick={() => props.deleteGood(props.item)} />
      </div>
    );
  } else if (props.kind == 'izbr') {
    block = (
      <div className="basket-item__buttons">
        <img src={liked} />
        <img src={basket_icon} />
      </div>
    );
  } else if (props.kind == 'history') {
    block = (
      <div className="basket-item__buttons">
        <img src={like} />
        <img src={basket_icon} />
      </div>
    );
  }

  const kwChange = e => {
    console.log(e.target.value);
    // props.editGood()
  };
  const cntChange = e => {
    console.log(e.target.value);
  };

  return (
    <div className="basket-item basket-item-root basket-item-typography">
      <div className="basket-item__name">
        {props.name} {props.id}
      </div>
      <div className="basket-item__type">{props.type}</div>
      <div className="basket-item__info">
        <img src="https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg" />
        {props.type == 'Слэб' ? (
          <>
            <div className="basket-item__text">
              <div className="basket-item__line-wrapper">
                <div className="basket-item__line">
                  <p>Склад: {props.item.skl}</p>
                  <p>
                    Цена за м<sup>2</sup>:{' '}
                    {props.cur === 'rub'
                      ? `${props.item.cntRUB}₽`
                      : props.cur === 'usd'
                      ? `${props.item.cntUSD}$`
                      : props.cur === 'eur'
                      ? `${props.item.cntEUR}€`
                      : ''}
                  </p>
                </div>
                <div className="basket-item__line">
                  <p>
                    {' '}
                    Наличие, м<sup>2</sup>: {props.item.os}
                  </p>
                  <p>Наличие, шт: {props.item.ossht} </p>
                </div>
              </div>
              <div className="basket-item__line -price">
                <div className="price-input">
                  <p>
                    {' '}
                    м<sup>2</sup> :
                    <input
                      type="number"
                      min="0"
                      max={parseFloat(props.item.os)}
                      defaultValue={parseFloat(props.item.os)}
                      step="0.01"
                      onBlur={kwChange}
                    />
                  </p>
                  <p>
                    шт :
                    <input
                      type="number"
                      min="0"
                      max={parseFloat(props.item.ossht)}
                      defaultValue={parseFloat(props.item.ossht)}
                      onBlur={cntChange}
                    />
                  </p>
                </div>
                <div className="price-view">
                  <p id="cost">
                    Сумма:{' '}
                    {props.cur === 'rub'
                      ? `${(
                          parseFloat(props.item.cntRUB) *
                          parseFloat(props.item.os)
                        ).toFixed(2)} ₽`
                      : props.cur === 'usd'
                      ? `${(
                          parseFloat(props.item.cntUSD) *
                          parseFloat(props.item.os)
                        ).toFixed(2)} $`
                      : props.cur === 'eur'
                      ? `${(
                          parseFloat(props.item.cntEUR) *
                          parseFloat(props.item.os)
                        ).toFixed(2)} €`
                      : 1}
                  </p>
                  {block}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="basket-item__text">
            <div className="basket-item__line-wrapper">
              <div className="basket-item__line">
                <p>Склад: {props.item.skl}</p>
                <p>Длина: {props.item.le} м</p>
                <p>Ширина: {props.item.he} м</p>
              </div>
              <div className="basket-item__line">
                <p>
                  Площадь, м<sup>2</sup>: {props.item.os}
                </p>
                <p>Пачка {props.item.bl}</p>
              </div>
            </div>
            <div className="basket-item__line -price">
              <p id="cost">Сумма:</p>
              {block}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketItem;
