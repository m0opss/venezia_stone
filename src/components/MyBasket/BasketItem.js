import React from 'react';

import deleteItem from 'images/deleteItem.png';
import like from 'images/like.png';
import liked from 'images/liked.png';
import basket_add from 'images/basket_add.png';
import basket_icon from 'images/basket_icon.png';

import './BasketItem.scss';

const BasketItem = props => {
  let block;
  if (props.kind == 'basket') {
    block = (
      <div className="basket-item__buttons">
        <img src={deleteItem} />
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
  return (
    <div className="basket-item basket-item-root basket-item-typography">
      <div className="basket-item__name">Гранит TAR BROWN</div>
      <div className="basket-item__type">Плитка</div>
      <div className="basket-item__info">
        <img src="https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg" />
        {props.type ? (
          <>
            <div className="basket-item__text">
              <div className="basket-item__line-wrapper">
                <div className="basket-item__line">
                  <p>Склад: Краснодар</p>
                  <p>Цена за м<sup>2</sup>: 4500₽</p>
                </div>
                <div className="basket-item__line">
                  <p> Наличие, м<sup>2</sup>: 8888</p>
                  <p>Наличие, шт: 450 </p>
                </div>
              </div>
              <div className="basket-item__line -price">
                <div className="price-input">
                  <p> м<sup>2</sup> :
                    <input type="number" min='0' defaultValue={'0.12'} step="0.01" />
                  </p>
                  <p>шт : 
                    <input type="number" min='0' defaultValue={'7'} />
                  </p>
                </div>
                <div className="price-view">
                  <p id="cost">Сумма: 23 112₽</p>
                  {block}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="basket-item__text">
            <div className="basket-item__line-wrapper">
              <div className="basket-item__line">
                <p>Склад: Краснодар</p>
                <p>Длина: 1.5.м</p>
                <p>Ширина: 1.5.м</p>
              </div>
              <div className="basket-item__line">
                <p>
                  Площадь, м<sup>2</sup>: 5.2
                </p>
                <p>Пачка BML 2091</p>
                <p>№49375</p>
              </div>
            </div>
            <div className="basket-item__line -price">
              <p id="cost">Сумма: 23 112₽</p>
              {block}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BasketItem;
