import React from 'react';
import lamp from 'images/lamp.png';
import book from 'images/book.png';

import Valute from 'components/Valute/Valute';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import Slider from 'react-slick';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';
import './OtherItemMobile.scss';

import AllAddBasket from '../MyBasket/AllAddBasket';
import AllAddIzbr from '../MyBasket/AllAddIzbr';

const GroupItem = props => {
  const [kw, setKw] = React.useState(0);
  const [cnt, setCnt] = React.useState(0);
  const [sum, setSum] = React.useState(0);

  React.useEffect(() => {
    let pr;
    if (props.cur === 'rub') pr = props.item.cntRUB;
    else if (props.cur === 'usd') pr = props.item.cntUSD;
    else if (props.cur === 'eur') pr = props.item.cntEUR;
    if (props.type != 'Плитка') {
      setSum(
        (
          parseFloat(props.item.le) *
          parseFloat(props.item.he) *
          parseFloat(pr) *
          cnt
        ).toFixed(2)
      );
    } else {
      setSum((kw * parseFloat(pr)).toFixed(2));
    }
  }, [cnt, kw, sum]);
  const onBlurVal = e => {
    setKw(
      (
        Math.ceil(
          parseFloat(e.target.value) /
            (parseFloat(props.item.le) * parseFloat(props.item.he))
        ) *
        parseFloat(props.item.le) *
        parseFloat(props.item.he)
      ).toFixed(3)
    );
  };

  const onChangeVal = e => {
    if (e.target.id == 'cnt') {
      let val = e.target.value;
      val = Math.ceil(parseFloat(val));

      // if (val > parseFloat(props.item.kolvo)) {
      //   val = parseFloat(props.item.kolvo);
      // }
      setKw(
        (parseFloat(props.item.le) * parseFloat(props.item.he) * val).toFixed(3)
      );
      setCnt(val);
    } else {
      let tmp = parseFloat(e.target.value);
      if (tmp > parseFloat(props.item.os)) {
        tmp = parseFloat(props.item.os);
      }
      setKw(tmp);
      setCnt(
        Math.ceil(tmp / (parseFloat(props.item.le) * parseFloat(props.item.he)))
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
              onBlur={onBlurVal}
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
  const images = [];
  return (
    <div className="slab-item-mobile">
      <div className="slab-item-mobile__main-title">
        {props.item[0].itms_name}
      </div>
      <div className="slab-item-mobile__main slab-item-mobile__main_other">
        <div className="slab-item-info__options">
          {/* <img src={lamp} />
          <img src={book} /> */}
        </div>
        <div className="slab-item-mobile__main-img">
          <div className="">
            {props.item[0].typeFoto == null ? 'NULL' : props.item[0].typeFoto}{' '}
          </div>
          <img src={props.item[0].photo_product} />
        </div>
      </div>

      <ButtonsPanel images={images} />
      <div className="slab-item-mobile__options-group">
        <div className="slab-item-mobile__country">{props.item[0].country}</div>
        <Valute />
      </div>
      <div className="other-items-group">
        {props.item.map(item => (
          <GroupItem item={item} key={item.ps} cur={props.cur} />
        ))}
      </div>
    </div>
  );
};

export default OtherItemTablet;
