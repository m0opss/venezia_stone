import React from 'react';

import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import Valute from 'components/Valute/Valute';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';

import Slider from 'react-slick';

import './SlabItemMobile.scss';
import { Link } from 'react-router-dom';

const GroupItem = props => {
  return (
    <div className="slab-items-group-item">
      <div className="slab-items-group-item__img">
        <img
          className="slab-items-group-item__img-main"
          src={props.item.photo_product}
        />
        {props.isAuth ? (
          <div className="slab-items-group-item__img-icon -icons-1">
            <ItemAddIzbr item={{ ...props.item, type: props.type }} />
          </div>
        ) : (
          <></>
        )}
        <div className="slab-items-group-item__img-icon -icons-2">
          <ItemAddBasket item={{ ...props.item, type: props.type }} />
        </div>
      </div>
      <Link to={props.item.url}>
        <div className="slab-items-group-item__info">
          <p className="slab-items-group-item__line">Слэб: {props.item.ps}</p>
          <p className="slab-items-group-item__line">
            Размер: {props.item.le}x{props.item.he} ={' '}
            {(
              parseFloat(props.item.le) * parseFloat(props.item.he) -
              parseFloat(props.item.sco)
            ).toFixed(2)}{' '}
            м<sup>2</sup>
          </p>
          <p className="slab-items-group-item__line">
            Склад: {props.item.sklad}
          </p>
          <p className="slab-items-group-item__line">
            Цена за м<sup>2</sup>:{' '}
            {props.cur === 'rub'
              ? `${
                  props.item.cntRUB == 'По запросу'
                    ? props.item.cntRUB
                    : `${props.item.cntRUB}₽`
                }`
              : props.cur === 'usd'
              ? `${
                  props.item.cntUSD == 'По запросу'
                    ? props.item.cntUSD
                    : `${props.item.cntUSD}$`
                }`
              : props.cur === 'eur'
              ? `${
                  props.item.cntEUR == 'По запросу'
                    ? props.item.cntEUR
                    : `${props.item.cntEUR}€`
                }`
              : ''}
          </p>
          <p className="slab-items-group-item__line">
            Стоимость:{' '}
            {props.item.cntRUB == 'По запросу'
              ? props.item.cntRUB
              : props.cur === 'rub'
              ? `${(
                  parseFloat(props.item.cntRUB) *
                  parseFloat(props.item.le) *
                  parseFloat(props.item.he)
                ).toFixed(2)} ₽`
              : props.cur === 'usd'
              ? `${(
                  parseFloat(props.item.cntUSD) *
                  parseFloat(props.item.le) *
                  parseFloat(props.item.he)
                ).toFixed(2)} $`
              : props.cur === 'eur'
              ? `${(
                  parseFloat(props.item.cntEUR) *
                  parseFloat(props.item.le) *
                  parseFloat(props.item.he)
                ).toFixed(2)} €`
              : 1}
          </p>
        </div>
      </Link>
    </div>
  );
};

const SlabItemMobile = props => {
  const [selectedEl, setSelectedEl] = React.useState(props.item[0]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  let images = [];
  const [loadCnt, setLoadCnt] = React.useState(12);
  const loadMore = () => {
    setLoadCnt(loadCnt => loadCnt + 12);
  };
  return (
    <div className="slab-item-mobile">
      <ButtonsPanel images={images} />
      <Slider {...settings}>
        {props.item.map(item => (
          <div
            key={item.ps}
            className="slab-item-carousel__item"
            onClick={() => setSelectedEl(item)}
          >
            <img
              className={`${selectedEl.ps == item.ps ? 'selected-img' : ''}`}
              src={item.photo_product}
            />
          </div>
        ))}
      </Slider>
      <div className="slab-item-mobile__main">
        <div className="slab-item-mobile__main-title">{selectedEl.bl}</div>
        <div className="slab-item-mobile__main-img">
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
          <div className="">
            {selectedEl.typeFoto == null ? 'NULL' : selectedEl.typeFoto}
          </div>
          <img src={selectedEl.photo_product} />
        </div>
      </div>
      <ColorRange colors={selectedEl} />

      <div className="slab-item-mobile__options-group">
        <div className=""></div>
        <Valute />
      </div>

      <div className="slab-items-group">
        {props.item.slice(0, loadCnt).map(item => (
          <GroupItem
            key={item.ps}
            type={props.type}
            item={item}
            cur={props.cur}
          />
        ))}
      </div>
      {loadCnt < props.item.length ? (
        <div className="button-text button load-more" onClick={loadMore}>
          Загрузить еще
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SlabItemMobile;
