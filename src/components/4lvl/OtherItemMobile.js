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
  const [S, setS] = React.useState(0);
  const [cnt, setCnt] = React.useState(0);
  const [sum, setSum] = React.useState(0);

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
            max={props.item.ossht}
            defaultValue={cnt}
            step="1"
          />
          <input
            type="number"
            min="0"
            max={props.item.os}
            defaultValue={S}
            step="0.01"
          />
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
          <ItemAddIzbr item={props.item} />
          <ItemAddBasket item={props.item} />
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
