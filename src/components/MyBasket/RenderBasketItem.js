import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import deleteItem from 'images/deleteItem.png';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';
import './BasketItem.scss';
import { isMobile } from 'react-device-detect';

const RenderBasketItem = props => {
  console.log(props.item);
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
      <div className="basket-item__name">
        {props.item.itms_name ? props.item.itms_name : props.item.name}
      </div>
      <div className="basket-item__type">
        {props.type
          ? `${props.type == 'Слэбы' ? `Слэб №${props.item.ps}` : ''}`
          : `${props.item.izd == 'Слэбы' ? `Слэб №${props.item.ps}` : ''}`}
      </div>
      <div className="basket-item__info">
        <Link to={props.item.url}>
          <img
            src={
              props.item.photo_product
                ? props.item.photo_product
                : props.item.photo
            }
          />
        </Link>
        {props.type != 'Слэбы' && props.type != 'Полоса' ? (
          <>
            <div className="basket-item__text">
              <div className="basket-item__line-wrapper">
                <div className="basket-item__line">
                  <p>Склад: {props.item.sklad}</p>
                  <p>
                    Цена за м<sup>2</sup>:{' '}
                    {props.item.price
                      ? `${props.item.price}₽`
                      : props.cur === 'rub'
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
                    Наличие, м<sup>2</sup>:{' '}
                    {props.item.os
                      ? props.item.os
                      : props.item.ostkw
                      ? props.item.ostkw
                      : props.os}
                  </p>
                  <p>
                    Наличие, шт: {props.item.kolvo ? props.item.kolvo : '0'}
                  </p>
                </div>
                <div className="basket-item__line">
                  <p>Тип фото: {props.item.typeFoto}</p>
                </div>
              </div>
              <div className="basket-item__line -price">
                <div className="price-input">
                  <div>
                    м<sup>2</sup> :
                    {props.type == 'Плитка' ? (
                      <input
                        id="kw"
                        type="number"
                        min="0"
                        max={props.item.os}
                        value={props.kw}
                        step="0.01"
                        onChange={props.onChangeVal}
                        onBlur={props.onBlurVal}
                      />
                    ) : props.type == 'Ступени' ? (
                      <input
                        type="number"
                        defaultValue="0"
                        disabled
                        style={{ color: 'gray' }}
                      />
                    ) : (
                      <input
                        type="text"
                        defaultValue="-"
                        disabled
                        style={{ color: 'gray' }}
                      />
                    )}
                  </div>
                  <p>
                    шт :
                    <input
                      id="cnt"
                      type="number"
                      min="0"
                      max={props.item.kolvo}
                      value={props.cnt}
                      onChange={props.onChangeVal}
                    />
                  </p>
                </div>
                <div className="price-view">
                  <p id="cost" style={{ marginTop: 10 }}>
                    Сумма:
                    {isMobile ? <br /> : <></>}
                    {props.cur === 'rub'
                      ? `${props.sum} ₽`
                      : props.cur === 'usd'
                      ? `${props.sum} $`
                      : props.cur === 'eur'
                      ? `${props.sum} €`
                      : '-'}
                  </p>
                  <div className="basket-item__buttons">
                    {props.kind == 'izbr' ? (
                      <>
                        <ItemAddIzbr item={props.item} />
                        <ItemAddBasket item={props.item} />
                      </>
                    ) : (
                      <img
                        src={deleteItem}
                        onClick={() => props.deleteGood(props.item)}
                      />
                    )}
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
                <p>
                  Цена за м<sup>2</sup>:{' '}
                  {props.item.price
                    ? `${props.item.price} ₽`
                    : props.cur === 'rub'
                    ? `${props.item.cntRUB} ₽`
                    : props.cur === 'usd'
                    ? `${props.item.cntUSD} $`
                    : props.cur === 'eur'
                    ? `${props.item.cntEUR} €`
                    : ''}
                </p>
                <p>Длина: {props.item.le} м</p>
                <p>Ширина: {props.item.he} м</p>
              </div>
              <div className="basket-item__line">
                <p>
                  Площадь, м<sup>2</sup>:{' '}
                  {props.item.sco
                    ? (
                        parseFloat(props.item.le) * parseFloat(props.item.he) -
                        parseFloat(props.item.sco)
                      ).toFixed(2)
                    : (
                        parseFloat(props.item.le) * parseFloat(props.item.he)
                      ).toFixed(2)}
                </p>
                <p>Пачка {props.item.bl}</p>
              </div>
              <div className="basket-item__line">
                <p>
                  Скол, м<sup>2</sup>: {props.item.sco}
                </p>
                <p>Тип фото: {props.item.typeFoto}</p>
              </div>
            </div>
            <div className="basket-item__line -price">
              <p id="cost">
                Сумма:
                {isMobile ? <br /> : <></>}
                {props.cur === 'rub'
                  ? `${props.sum} ₽`
                  : props.cur === 'usd'
                  ? `${props.sum} $`
                  : props.cur === 'eur'
                  ? `${props.sum} €`
                  : '-'}
              </p>
              <div className="basket-item__buttons">
                {props.kind == 'izbr' ? (
                  <>
                    <ItemAddIzbr item={props.item} />
                    <ItemAddBasket item={props.item} />
                  </>
                ) : (
                  <img
                    src={deleteItem}
                    onClick={() => props.deleteGood(props.item)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default RenderBasketItem;
