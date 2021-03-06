import React from 'react';

import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import Valute from 'components/Valute/Valute';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';
import ImageGallery from 'components/5lvl/ImageGallery';
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
            {props.item.sco
              ? (
                  parseFloat(props.item.le) * parseFloat(props.item.he) -
                  parseFloat(props.item.sco)
                ).toFixed(2)
              : (parseFloat(props.item.le) * parseFloat(props.item.he)).toFixed(
                  2
                )}{' '}
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
  const [itemDict, setItemDict] = React.useState(() => {
    let tmp = {};
    props.item.map(slab => {
      if (!(slab.bl in tmp)) {
        tmp[slab.bl] = { slabs: [slab] };
      } else {
        tmp[slab.bl]['slabs'].push(slab);
      }
    });
    Object.keys(tmp).map(bl => {
      let nw = false,
        onSale = false,
        pz = false;
      tmp[bl]['slabs'].map(slab => {
        if (slab.nw == '1') nw = true;
        if (slab.onSale == '1') onSale = true;
        if (slab.pz == '1') pz = true;
      });
      if (nw) tmp[bl]['nw'] = 1;
      else tmp[bl]['nw'] = 0;
      if (onSale) tmp[bl]['onSale'] = 1;
      else tmp[bl]['onSale'] = 0;
      if (pz) tmp[bl]['pz'] = 1;
      else tmp[bl]['pz'] = 0;
    });
    return tmp;
  });

  const [selectedEl, setSelectedEl] = React.useState(
    Object.keys(itemDict).length > 0 ? Object.keys(itemDict)[0] : ''
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  let images = [];
  return (
    <div className="slab-item-mobile">
      <Slider {...settings}>
        {Object.keys(itemDict).map(item => {
          return (
            <div
              key={item}
              className="slab-item-carousel__item"
              onClick={() => setSelectedEl(item)}
            >
              <p>Пачка №{item}</p>
              <img
                className={`${selectedEl == item ? 'selected-img' : ''}`}
                src={itemDict[item]['slabs'][0].photobl}
              />
            </div>
          );
        })}
      </Slider>
      <div className="slab-item-mobile__main">
        <div className="slab-item-mobile__main-title">{selectedEl}</div>
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
            {itemDict[selectedEl]['slabs'][0].typeFoto == null
              ? 'NULL'
              : itemDict[selectedEl]['slabs'][0].typeFoto}
          </div>
          <ImageGallery
            item={itemDict[selectedEl]['slabs']}
            title={props.item[0].itms_name}
            lvl="4"
          />
        </div>
      </div>
      <ColorRange colors={itemDict[selectedEl]['slabs'][0]} />

      <ButtonsPanel images={images} />
      <div className="slab-item-mobile__options-group">
        <div className=""></div>
        <Valute />
      </div>

      <div className="slab-items-group slab-items-group_mobile">
        {itemDict[selectedEl]['slabs'].length > 0 ? (
          itemDict[selectedEl]['slabs'].map(item => (
            <GroupItem
              key={item.ps}
              type={props.type}
              item={item}
              cur={props.cur}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SlabItemMobile;
