import React from 'react';

import { Link } from 'react-router-dom';

import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import SlabItemTablet from 'components/4lvl/SlabItemTablet';
import SlabItemMobile from 'components/4lvl/SlabItemMobile';
import OptionLine from 'components/5lvl/OptionLine';

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
  console.log();
  return (
    <div className="good-items-table__item">
      <Link to={`${props.url}/${props.item.ps}`}>
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
          <p>{props.item.os ? props.item.os : '-'}</p>
        </div>
        <div className="table-row__item table-row__item_s">
          <p>{props.item.sco == '0' ? 'нет' : 'да'}</p>
        </div>
        <div className="table-row__item table-row__item_l">
          <p>{props.item.sklad}</p>
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
        </div>
      </Link>
      {props.isAuth ? (
        <div className="table-row__item good-items-table__title-icons">
          <ItemAddIzbr item={{ ...props.item, type: props.type }} />
        </div>
      ) : (
        <></>
      )}

      <div className="table-row__item good-items-table__title-icons">
        <ItemAddBasket item={{ ...props.item, type: props.type }} />
      </div>
    </div>
  );
};

const SlabItem = props => {
  const [selectedEl, setSelectedEl] = React.useState(props.item.prs[0]);
  console.log(selectedEl);

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
                selectedItem={selectedEl}
                elements={props.item.prs}
              />
            </div>
            <div className="slab-item-info__right-block">
              <div className="slab-item-info__rb-top">
                <div className="slab-item-info__slab-title">
                  {selectedEl.bl}
                </div>
                <div className="slab-item-info__options">
                  {/* <img src={lamp} />
                  <img src={book} /> */}
                  <OptionLine
                    // lamp = {selectedEl.} поле для просветленного фото
                    style={{ width: 'unset', marginBottom: 'unset' }}
                    img={selectedEl.photobl}
                  />
                </div>
              </div>
              <div className="slab-item-info__slab-img">
                <div className="num-gr-item__labels">
                {selectedEl.nw != 0 ? (
                    <div className="item-label item-label-new">Новинка</div>
                  ) : (
                    <></>
                  )}
                  {selectedEl.onSale != 0 ? (
                    <div className="item-label item-label-sale">Распродажа</div>
                  ) : (
                    <></>
                  )}
                  {selectedEl.pz != 0 ? (
                    <div className="item-label item-label-order">Под заказ</div>
                  ) : (
                    <></>
                  )}
                </div>
                <img src={selectedEl.photobl ? selectedEl.photobl : ''} />
                <ColorRange colors={selectedEl.color_range} />
              </div>
            </div>
          </div>
        </div>
        <div className="hidescroll">
          <div className="good-items-table">
            <div className="good-items-table__item slabs-title">
              <div className="good-items-table__title-wrapper">
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
              </div>
              {props.isAuth ? (
                <div className="table-row__item good-items-table__title-icons">
                  <img src={arr} />
                  <img src={like} />
                </div>
              ) : (
                <></>
              )}
              <div className="table-row__item good-items-table__title-icons">
                <img src={arr} />
                <img src={basket} />
              </div>
            </div>
            {props.item.prs.map(item => (
              <SlabTableRow
                isAuth={props.isAuth}
                cur={props.cur}
                key={item.ps}
                type={props.type}
                item={item}
                url={props.url}
                addGood={props.addGood}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (isTablet) {
    return (
      <SlabItemTablet
        item={props.item}
        url={props.url}
        cur={props.cur}
        type={props.type}
        isAuth={props.isAuth}
      />
    );
  } else {
    return (
      <SlabItemMobile
        item={props.item}
        url={props.url}
        type={props.type}
        cur={props.cur}
        isAuth={props.isAuth}
      />
    );
  }
};

export default SlabItem;
