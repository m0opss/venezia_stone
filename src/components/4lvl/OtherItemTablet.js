import React from 'react';

import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import './OtherItemTablet.scss';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';

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
          <p>{props.item.ossht}</p>
          <p>{props.item.os}</p>
        </div>
      </div>
      <div className="other-items-group__line">
        <p className="other-items-group_first-col">Заказать</p>
        <div className="other-items-group__centered">
          <input type="number" min="0" defaultValue={cnt} step="1" />
          <input type="number" min="0" defaultValue={S} step="0.01" />
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
  let colors = [
    '#2C1D02',
    '#402A02',
    '#402A02',
    '#402A02',
    '#402A02',
    '#402A02',
    '#402A02',
    '#402A02',
    '#402A02'
  ];
  let im = 'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg';

  return (
    <div className="slab-item">
      <div className="slab-item-info">
        <div className="slab-item-info__top slab-item-info__top-tablet">
          <ButtonsPanel />
        </div>
        <div className="slab-item-info__bottom">
          <div className="slab-item-info__left-block slab-item-info__left-block_other slab-item-info__left-block_other-tablet">
            <h1 className="slab-item-info__title">{props.item.name}</h1>
            <div className="slab-item-info__parameters">
              <p>Общая площадь: {``} </p>
              <p>Количество: {``} </p>
              <p>Сумма: {``} </p>
            </div>
          </div>
          <div className="slab-item-info__slab-img">
            <img src={im} />
            <ColorRange colors={colors} />
          </div>
        </div>
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
