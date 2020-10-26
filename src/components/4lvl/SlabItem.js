import React from 'react';

import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';

import { MobileView, BrowserView, isTablet } from 'react-device-detect';

import lamp from 'images/lamp.png';
import book from 'images/book.png';
import arr from 'images/arr-4lvl.png';
import like from 'images/like-4lvl.png';
import basket from 'images/basket-4lvl.png';

const SlabTableRow = props => {
  return (
    <div className="good-items-table__item ">
      <p className="table-row__item">{props.item.num}</p>
      <p className="table-row__item">{props.item.l}</p>
      <p className="table-row__item">{props.item.w}</p>
      <p className="table-row__item">{props.item.s}</p>
      <p className="table-row__item">{props.item.sk}</p>
      <p className="table-row__item table-row__item_l">{props.item.skl}</p>
      <p className="table-row__item table-row__item_l">{props.item.cost}</p>
      <p className="table-row__item table-row__item_l">{props.item.sum}</p>
      <div className="table-row__item good-items-table__title-icons">
        <img src={like} />
      </div>
      <div className="table-row__item good-items-table__title-icons">
        <img src={basket} />
      </div>
    </div>
  );
};

const SlabItem = (props) => {
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

  let itemTable = {
    num: '0000000',
    l: '3 02',
    w: ' 20 2',
    s: '12 01',
    sk: 'нет',
    skl: 'Санкт-Петербург',
    cost: '1 000 001.11₽',
    sum: '1 000 001.11₽'
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
      <div className="good-items-table">
        <div className="good-items-table__item slabs-title">
          <p className="table-row__item">Слэб</p>
          <p className="table-row__item">Длина,м</p>
          <p className="table-row__item">Высота</p>
          <p className="table-row__item">
            Площадь,м<sup>2</sup>
          </p>
          <p className="table-row__item">Скол</p>
          <p className="table-row__item table-row__item_l">Склад</p>
          <p className="table-row__item table-row__item_l">
            Цена за м<sup>2</sup>
          </p>
          <p className="table-row__item table-row__item_l">Стоимость</p>
          <div className="table-row__item good-items-table__title-icons">
            <img src={arr} />
            <img src={like} />
          </div>
          <div className="table-row__item good-items-table__title-icons">
            <img src={arr} />
            <img src={basket} />
          </div>
        </div>
        <SlabTableRow item={itemTable} />
        <SlabTableRow item={itemTable} />
        <SlabTableRow item={itemTable} />
        <SlabTableRow item={itemTable} />
      </div>
    </div>
  );
};

export default SlabItem;
