import React from 'react';

import deleteItem from 'images/deleteItem.png'

const BasketItem = (props) => {

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
                  <p>Наличие, м<sup>2</sup>: 8888</p>
                  <p>Наличие, шт: 450 </p>
                </div>
              </div>
              <div className="basket-item__line -price">
                <p>м<sup>2</sup> : <input type="number" defaultValue={'0.12'} step='0.01'/> </p>
                <p>шт : <input type="number" defaultValue={'7'}/> </p>
                <p id='cost'>Сумма: 23 112₽</p>
              </div>
            </div>
          </>
          ) : (
            <div className="basket-item__text">
              <div className="basket-item__line-wrapper">
                <div className="basket-item__line">
                  <p>Склад: Краснодар</p>
                  <p>Цена за м<sup>2</sup>: 4500₽</p>
                  <p>Цена за м<sup>2</sup>: 4500₽</p>
                </div>
                <div className="basket-item__line">
                  <p>Наличие, м<sup>2</sup>: 8888</p>
                  <p>Наличие, шт: 450 </p>
                </div>
              </div>
              <div className="basket-item__line -price">
                <p>м<sup>2</sup> : <input type="number" defaultValue={'0.12'} step='0.01'/> </p>
                <p>шт : <input type="number" defaultValue={'7'}/> </p>
                <p id='cost'>Сумма: 23 112₽</p>
              </div>
            </div>
          )}
      <div className="basket-item__delete-button">
        <img src={deleteItem}/>
      </div>
      </div>
    </div>
  );
};

export default BasketItem;
