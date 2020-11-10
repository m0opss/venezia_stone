import React, { useEffect } from 'react';

import deleteItem from 'images/deleteItem.png';
import like from 'images/like.png';
import liked from 'images/liked.png';
import basket_add from 'images/basket_add.png';
import basket_icon from 'images/basket_icon.png';

import './BasketItem.scss';

const BasketItem = props => {
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
  const [kw, setKw] = React.useState(
    props.item.S ? parseFloat(props.item.S) : 0
  );
  const [cnt, setCnt] = React.useState(
    props.item.cnt ? parseFloat(props.item.cnt) : 0
  );
  const [sum, setSum] = React.useState(0);

  useEffect(() => {
    let pr;
    if (props.cur === 'rub') pr = props.item.cntRUB;
    else if (props.cur === 'usd') pr = props.item.cntUSD;
    else if (props.cur === 'eur') pr = props.item.cntEUR;
    if (props.type != 'Плитка') {
      console.log(1);
      setSum(
        // parseFloat(props.item.le) *
        //   parseFloat(props.item.he) *
        (2 * 3 * parseFloat(pr) * cnt).toFixed(2)
      );
      // props.setCntSum([...props.cntSum, (2 * 3 * parseFloat(pr) * cnt).toFixed(2)])
    } else {
      // console.log(kw, cnt);
      // console.log(kw, cnt);
      setSum((kw * parseFloat(pr)).toFixed(2));
    }
  });

  // props.setCntSum([...props.cntSum, sum])
  const onChangeVal = e => {
    if (e.target.id == 'cnt') {
      setCnt(parseFloat(e.target.value));
      setKw(
        // parseFloat(props.item.le) *
        //   parseFloat(props.item.he) *
        2 * 3 * parseFloat(e.target.value)
      );
    } else {
      setKw(e.target.value);
      setCnt(
        parseFloat(e.target.value) / 2 / 3
        // parseFloat(props.item.le) /
        // parseFloat(props.item.he)
      );
    }
    console.log(cnt, kw)
    props.setBasket([...props.basket, { ...props.item, cnd: cnt, S: kw }]);
  };

  return (
    <div className="basket-item basket-item-root basket-item-typography">
      <div className="basket-item__name">
        {props.name} {props.id}
      </div>
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
                    {' '}
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
                    {' '}
                    м<sup>2</sup> :
                    {props.type == 'Плитка' ? (
                      <input
                        id="kw"
                        type="number"
                        min="0"
                        max={props.item.os}
                        defaultValue={kw}
                        step="0.01"
                        onChange={onChangeVal}
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
                      defaultValue={cnt}
                      onChange={onChangeVal}
                    />
                  </p>
                </div>
                <div className="price-view">
                  <p id="cost" style={{ marginTop: 10 }}>
                    Сумма:{' '}
                    {props.cur === 'rub'
                      ? `${sum} ₽`
                      : props.cur === 'usd'
                      ? `${sum} $`
                      : props.cur === 'eur'
                      ? `${sum} €`
                      : '-'}
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
              {block}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketItem;
