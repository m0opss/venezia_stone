import React from 'react';

import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import SlabItemTablet from 'components/4lvl/SlabItemTablet';

import {
  MobileView,
  BrowserView,
  isTablet,
  isBrowser
} from 'react-device-detect';

import lamp from 'images/lamp.png';
import book from 'images/book.png';
import arr from 'images/arr-4lvl.png';
import like from 'images/like-4lvl.png';
import basket from 'images/basket-4lvl.png';

const SlabTableRow = props => {
  return (
    <div className="good-items-table__item ">
      <div className="table-row__item">
        <p>{props.item.num}</p>
      </div>
      <div className="table-row__item table-row__item_s">
        <p>{props.item.l}</p>
      </div>
      <div className="table-row__item table-row__item_s">
        <p>{props.item.w}</p>
      </div>
      <div className="table-row__item table-row__item_s">
        <p>{props.item.s}</p>
      </div>
      <div className="table-row__item table-row__item_s">
        <p>{props.item.sk}</p>
      </div>
      <div className="table-row__item table-row__item_l">
        <p>{props.item.skl}</p>
      </div>
      <div className="table-row__item table-row__item_l">
        <p>{props.item.cost}</p>
      </div>
      <div className="table-row__item table-row__item_l">
        <p>{props.item.sum}</p>
      </div>
      <div className="table-row__item good-items-table__title-icons">
        <img src={like} />
      </div>
      <div className="table-row__item good-items-table__title-icons">
        <img src={basket} />
      </div>
    </div>
  );
};

const SlabItem = props => {
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
  if (isBrowser) {
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
            <div className="table-row__item">
              <p>Слэб</p>
            </div>
            <div className="table-row__item table-row__item_s">
              <p>Длина,м</p>
            </div>
            <div className="table-row__item table-row__item_s">
              <p>Высота</p>
            </div>
            <div className="table-row__item table-row__item_s">
              <p>
                Площадь,м<sup>2</sup>
              </p>
            </div>
            <div className="table-row__item table-row__item_s">
              <p>Скол</p>
            </div>
            <div className="table-row__item table-row__item_l">
              <p>Склад</p>
            </div>
            <div className="table-row__item table-row__item_l">
              <p>
                Цена за м<sup>2</sup>
              </p>
            </div>
            <div className="table-row__item table-row__item_l">
              <p>Стоимость</p>
            </div>
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
  }else if (isTablet) {
    return (
      <SlabItemTablet />
    )
  }
  else {
    return (
      <div className=""></div>
    )
  }
};

export default SlabItem;
