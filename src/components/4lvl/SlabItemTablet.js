import React from 'react';

import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';

import lamp from 'images/lamp.png';
import book from 'images/book.png';
import arr from 'images/arr-4lvl.png';
import like from 'images/like-4lvl.png';
import basket from 'images/basket-4lvl.png';

import './SlabItemTablet.scss';

const GroupItem = props => {
  return (
    <div className="slab-items-group-item">
      <div className="slab-items-group-item__img">
        <img className="slab-items-group-item__img-main" src={props.item.img} />
        <div className="slab-items-group-item__img-icon -icons-1">
          <img src={like} />
        </div>
        <div className="slab-items-group-item__img-icon -icons-2">
          <img src={basket} />
        </div>
      </div>
      <div className="slab-items-group-item__info">
        <p className="slab-items-group-item__line">Слэб: {props.item.nmb}</p>
        <p className="slab-items-group-item__line">
          Размер: {props.item.l}x{props.item.w} =
          {parseFloat((props.item.l * props.item.w).toFixed(2))} м<sup>2</sup>
        </p>
        <p className="slab-items-group-item__line">Склад: {props.item.city}</p>
        <p className="slab-items-group-item__line">Цена за м<sup>2</sup>: {props.item.cost}₽</p>
        <p className="slab-items-group-item__line">Стоимость: {props.item.sum}₽</p>
      </div>
    </div>
  );
};

const SlabItemTablet = props => {
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
  let item = {
    city: 'Санкт-Петербург',
    nmb: '000000',
    sum: 12312,
    l: 1.5,
    w: 3.2,
    cost: 1231,
    img: 'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg'
  };

  return (
    <div className="slab-item">
      <div className="slab-item-info">
        <div className="slab-item-info__top">
          <h1 className="slab-item-info__title">TAN BROWN 30 мм</h1>
          <ButtonsPanel />
        </div>
        <div className="slab-item-info__bottom">
          <div className="slab-item-info__left-block">
            <ScrollImage scrollStyle="slab-item-info-scroll" />
          </div>
          <div className="slab-item-info__right-block">
            <div className="slab-item-info__rb-top">
              <div className="slab-item-info__slab-title">Пачка BML 1284</div>
              <div className="slab-item-info__options">
                <img src={lamp} />
                <img src={book} />
              </div>
            </div>
            <div className="slab-item-info__slab-img">
              <img src={im} />
              <ColorRange colors={colors} />
            </div>
          </div>
        </div>
      </div>
      <div className="slab-items-group">
        <GroupItem item={item} />
        <GroupItem item={item} />
        <GroupItem item={item} />
      </div>
    </div>
  );
};

export default SlabItemTablet;
