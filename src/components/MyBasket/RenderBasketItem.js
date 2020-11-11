import React, { useEffect } from 'react';

import deleteItem from 'images/deleteItem.png';

import './BasketItem.scss';

const RenderBasketItem = props => {
  if (!props.item) {
    return (
      <div style={{ flex: '100%' }}>
        Нет данных о товаре
        <br />
      </div>
    );
  }
  return (
    <div className="basket-item basket-item-root basket-item-typography">
      <div className="basket-item__name">{props.item.name}</div>
      <div className="basket-item__type">{props.type}</div>
      <div className="basket-item__info">
        <img src="https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg" />
        {props.type != 'Слэбы' && props.type != 'Полоса' ? (
          <>
            <div className="basket-item__text">
              <div className="basket-item__line-wrapper">
                <div className="basket-item__line">
                  <p>Склад: {props.item.sklad}</p>
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
                    Наличие, м<sup>2</sup>: {props.item.os}
                  </p>
                  <p>
                    Наличие, шт: {props.item.ossht ? props.item.ossht : '-'}
                  </p>
                </div>
              </div>
              <div className="basket-item__line -price">
                <div className="price-input">
                  <p>
                    м<sup>2</sup> :
                    {props.type == 'Плитка' ? (
                      <input
                        id="kw"
                        type="number"
                        min="0"
                        max={props.item.os}
                        defaultValue={props.kw}
                        step="0.01"
                        onChange={props.onChangeVal}
                      />
                    ) : props.type == 'Ступени' ? (
                      <input
                        type="number"
                        defaultValue="0"
                        disabled
                        style={{ color: 'gray' }}
                      />
                    ) : (
                      <p>-</p>
                    )}
                  </p>
                  <p>
                    шт :
                    <input
                      id="cnt"
                      type="number"
                      min="0"
                      max={props.item.ossht}
                      defaultValue={props.cnt}
                      onChange={props.onChangeVal}
                    />
                  </p>
                </div>
                <div className="price-view">
                  <p id="cost" style={{ marginTop: 10 }}>
                    Сумма:{' '}
                    {props.cur === 'rub'
                      ? `${props.sum} ₽`
                      : props.cur === 'usd'
                      ? `${props.sum} $`
                      : props.cur === 'eur'
                      ? `${props.sum} €`
                      : '-'}
                  </p>
                  <div className="basket-item__buttons">
                    <img
                      src={deleteItem}
                      onClick={() => props.deleteGood(props.item)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="basket-item__text">
            <div className="basket-item__line-wrapper">
              <div className="basket-item__line">
                <p>Склад: {props.item.sklad}</p>
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
              <p id="cost">
                Сумма:{' '}
                {props.cur === 'rub'
                  ? `${(
                      parseFloat(props.item.cntRUB) *
                      parseFloat(props.item.he) *
                      parseFloat(props.item.le)
                    ).toFixed(2)} ₽`
                  : props.cur === 'usd'
                  ? `${(
                      parseFloat(props.item.cntUSD) *
                      parseFloat(props.item.he) *
                      parseFloat(props.item.le)
                    ).toFixed(2)} $`
                  : props.cur === 'eur'
                  ? `${(
                      parseFloat(props.item.cntEUR) *
                      parseFloat(props.item.he) *
                      parseFloat(props.item.le)
                    ).toFixed(2)} €`
                  : 1}
              </p>
              <div className="basket-item__buttons">
                <img
                  src={deleteItem}
                  onClick={() => props.deleteGood(props.item)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default RenderBasketItem;
