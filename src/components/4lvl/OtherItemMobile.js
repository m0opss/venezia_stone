import React from 'react';
import lamp from 'images/lamp.png';
import book from 'images/book.png';

import Valute from 'components/Valute/Valute';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import Slider from 'react-slick';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';
import './OtherItemMobile.scss';

const GroupItem = props => {
  const [kw, setKw] = React.useState(0);
  const [cnt, setCnt] = React.useState(0);
  const [sum, setSum] = React.useState(0);

  useEffect(() => {
    let pr;
    if (props.cur === 'rub') pr = props.item.cntRUB;
    else if (props.cur === 'usd') pr = props.item.cntUSD;
    else if (props.cur === 'eur') pr = props.item.cntEUR;
    if (props.type != 'Плитка') {
      setSum(parseFloat(props.item.le) * parseFloat(props.item.he) * pr * cnt);
    } else {
      setSum(kw * pr);
    }
  }, [cnt, kw, sum]);

  const onChangeVal = e => {
    if (e.target.id == 'cnt') {
      let val = e.target.value;
      val = Math.ceil(parseFloat(val));

      setCnt(val);
      setKw(
        // parseFloat(props.item.le) *
        //   parseFloat(props.item.he) *
        2 * 3 * val
      );
    } else {
      setKw(e.target.value);
      setCnt(
        // (parseFloat(props.item.le) * parseFloat(props.item.he))
        Math.ceil(parseFloat(e.target.value) / (2 * 3))
      );
    }
  };
  return (
    <div className="other-items-group__item">
      <div className="other-items-group__line">
        <p className="other-items-group_first-col -city">{props.item.sklad}</p>
        <div className="other-items-group__centered">
          <p>шт</p>
          <p>
            м<sup>2</sup>
          </p>
        </div>
      </div>
      <div className="other-items-group__line">
        <p className="other-items-group_first-col">Наличие</p>
        <div className="other-items-group__centered">
          <p>{props.item.ossht ? props.item.ossht : '-'}</p>
          <p>{props.item.os}</p>
        </div>
      </div>
      <div className="other-items-group__line">
        <p className="other-items-group_first-col">Заказать</p>
        <div className="other-items-group__centered">
          <input
            type="number"
            min="0"
            id="cnt"
            max={props.item.ossht}
            value={cnt}
            step="1"
            onChange={onChangeVal}
          />
          {props.type == 'Плитка' ? (
            <input
              id="kw"
              type="number"
              min="0"
              max={props.item.os}
              step="0.01"
              value={kw}
              style={{ borderBottom: '1px solid black' }}
              onChange={onChangeVal}
            />
          ) : props.type == 'Ступени' ? (
            <input
              id="kw"
              type="number"
              defaultValue="0"
              disabled
              style={{ color: 'gray' }}
            />
          ) : (
            <p>-</p>
          )}
        </div>
      </div>
      <div className="other-items-group__line">
        <p className="other-items-group_first-col">
          Цена за м<sup>2</sup>
        </p>
        <div className="other-items-group__centered">
          <p>
            {props.cur === 'rub'
              ? `${props.item.cntRUB}₽`
              : props.cur === 'usd'
              ? `${props.item.cntUSD}$`
              : props.cur === 'eur'
              ? `${props.item.cntEUR}€`
              : ''}
          </p>
          <p></p>
        </div>
      </div>
      <div className="other-items-group__line ">
        <p className="other-items-group_first-col">Стоимость</p>
        <div className="other-items-group__centered">
          <p>
            {props.cur === 'rub'
              ? `${sum} ₽`
              : props.cur === 'usd'
              ? `${sum} $`
              : props.cur === 'eur'
              ? `${sum} €`
              : '-'}
          </p>
          <p></p>
        </div>
      </div>
      <div className="other-items-group__line basket-item__buttons">
        <div className="">
          {props.isAuth ? (
            <ItemAddIzbr
              item={{ ...props.item, type: props.type, S: kw, cnt: cnt }}
            />
          ) : (
            <></>
          )}
          <ItemAddBasket
            item={{ ...props.item, type: props.type, S: kw, cnt: cnt }}
          />
        </div>
      </div>
    </div>
  );
};

const OtherItemTablet = props => {
  React.useEffect(() => {
    let isSubscr = true;
    if (
      !(Object.entries(props.item).length === 0 && props.item.constructor) ===
        Object &&
      isSubscr
    ) {
      setItem(props.item);
      setSelectedEl(item.prs[0]);
    }
    return () => (isSubscr = false);
  });

  return (
    <div className="slab-item-mobile">
      <div className="slab-item-mobile__main-title">{props.item.name}</div>
      <ButtonsPanel />
      <div className="slab-item-mobile__main">
        <div className="slab-item-info__options">
          <img src={lamp} />
          <img src={book} />
        </div>
        <div className="slab-item-mobile__main-img">
          {/* <img src={selectedEl.photobl} /> */}
          <img src="https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg" />
        </div>
      </div>

      <div className="slab-item-mobile__options-group">
        <div className="slab-item-mobile__country">
          {props.item.prs[0].country}
        </div>
        <Valute />
      </div>
      <div className="other-items-group">
        {props.item.prs.map(item => (
          <GroupItem item={item} key={item.ps} cur={props.cur} />
        ))}
      </div>
    </div>
  );
};

export default OtherItemTablet;
