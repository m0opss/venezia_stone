import React from 'react';

import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import SlabItemTablet from 'components/4lvl/SlabItemTablet';
import SlabItemMobile from 'components/4lvl/SlabItemMobile';

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
        <p>{props.item.bl}</p>
      </div>
      <div className="table-row__item table-row__item_s">
        <p>{props.item.le}</p>
      </div>
      <div className="table-row__item table-row__item_s">
        <p>{props.item.he}</p>
      </div>
      <div className="table-row__item table-row__item_s">
        <p>{props.item.os}</p>
      </div>
      <div className="table-row__item table-row__item_s">
        <p>{props.item.sco == '0' ? 'нет' : 'да'}</p>
      </div>
      <div className="table-row__item table-row__item_l">
        <p>{props.item.skl}</p>
      </div>
      <div className="table-row__item table-row__item_l">
        <p>
          {props.cur === 'rub'
            ? `${props.item.cntRUB}₽`
            : props.cur === 'usd'
            ? `${props.item.cntUSD}$`
            : props.cur === 'eur'
            ? `${props.item.cntEUR}€`
            : ''}
        </p>
      </div>
      <div className="table-row__item table-row__item_l">
        <p>
          {(parseFloat(props.item.cntRUB) * parseFloat(props.item.os)).toFixed(
            2
          )}
          ₽
        </p>
      </div>
      <div className="table-row__item good-items-table__title-icons">
        <img src={like} />
      </div>
      <div className="table-row__item good-items-table__title-icons">
        <img
          src={basket}
          onClick={() => {
            props.addGood(props.item);
          }}
        />
      </div>
    </div>
  );
};

const SlabItem = props => {
  const [selectedEl, setSelectedEl] = React.useState(props.item.prs[0]);
  console.log('slab', props.item);
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

  let images = [
    'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg',
    'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg',
    'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg',
    'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg',
    'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg'
  ];
  if (isBrowser) {
    return (
      <div className="slab-item">
        <div className="slab-item-info">
          <div className="slab-item-info__top">
            <h1 className="slab-item-info__title">{props.item.name}</h1>
            <ButtonsPanel images={images} />
          </div>
          <div className="slab-item-info__bottom">
            <div className="slab-item-info__left-block">
              <ScrollImage
                scrollStyle="slab-item-info-scroll"
                selectItem={setSelectedEl}
                elements={props.item.prs}
              />
            </div>
            <div className="slab-item-info__right-block">
              <div className="slab-item-info__rb-top">
                <div className="slab-item-info__slab-title">
                  {selectedEl.bl}
                </div>
                <div className="slab-item-info__options">
                  <img src={lamp} />
                  <img src={book} />
                </div>
              </div>
              <div className="slab-item-info__slab-img">
                <img src={selectedEl.photobl} />
                <ColorRange colors={colors} />
              </div>
            </div>
          </div>
        </div>
        <div className="hidescroll">
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
            {props.item.prs.map(item => (
              <SlabTableRow
                cur={props.cur}
                key={item.ps}
                type={props.item.izd}
                item={item}
                addGood={props.addGood}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (isTablet) {
    return <SlabItemTablet item={props.item} />;
  } else {
    return <SlabItemMobile item={props.item} />;
  }
};

export default SlabItem;
