import React from 'react';

import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import Valute from 'components/Valute/Valute';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';

import lamp from 'images/lamp.png';
import book from 'images/book.png';

import Slider from 'react-slick';

import './SlabItemMobile.scss';
import { Link } from 'react-router-dom';

const GroupItem = props => {
  return (
    <div className="slab-items-group-item">
      <div className="slab-items-group-item__img">
        <img
          className="slab-items-group-item__img-main"
          src={props.item.photobl}
        />
        <div className="slab-items-group-item__img-icon -icons-1">
          <ItemAddIzbr item={props.item} />
        </div>
        <div className="slab-items-group-item__img-icon -icons-2">
          <ItemAddBasket item={props.item} />
        </div>
      </div>
      <Link to={`${props.url}/${props.item.bl}`}>
        <div className="slab-items-group-item__info">
          <p className="slab-items-group-item__line">Слэб: {props.item.bl}</p>
          <p className="slab-items-group-item__line">
            Размер: {props.item.le}x{props.item.he} ={props.item.os} м
            <sup>2</sup>
          </p>
          <p className="slab-items-group-item__line">
            Склад: {props.item.sklad}
          </p>
          <p className="slab-items-group-item__line">
            Цена за м<sup>2</sup>: {' '}
            {props.cur === 'rub'
              ? `${props.item.cntRUB}₽`
              : props.cur === 'usd'
              ? `${props.item.cntUSD}$`
              : props.cur === 'eur'
              ? `${props.item.cntEUR}€`
              : ''}
          </p>
          <p className="slab-items-group-item__line">
            Стоимость:{' '}
            {props.cur === 'rub'
              ? `${(
                  parseFloat(props.item.cntRUB) * parseFloat(props.item.os)
                ).toFixed(2)} ₽`
              : props.cur === 'usd'
              ? `${(
                  parseFloat(props.item.cntUSD) * parseFloat(props.item.os)
                ).toFixed(2)} $`
              : props.cur === 'eur'
              ? `${(
                  parseFloat(props.item.cntEUR) * parseFloat(props.item.os)
                ).toFixed(2)} €`
              : '-'}
          </p>
        </div>
      </Link>
    </div>
  );
};

const SlabItemMobile = props => {
  const [selectedEl, setSelectedEl] = React.useState(props.item.prs[0]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };
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

  return (
    <div className="slab-item-mobile">
      <ButtonsPanel images={images} />
      <Slider {...settings}>
        {props.item.prs.map(item => (
          <div className="slab-item-carousel__item" selectItem={setSelectedEl}>
            <img src="https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg" />
            {/* <img src={item.photobl} /> */}
          </div>
        ))}
      </Slider>
      <div className="slab-item-mobile__main">
        <div className="slab-item-mobile__main-title">{selectedEl.bl}</div>
        <div className="slab-item-mobile__main-img">
          {/* <img src={selectedEl.photobl} /> */}
          <img src="https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg" />
        </div>
      </div>
      <ColorRange colors={colors} />

      <div className="slab-item-mobile__options-group">
        <div className=""></div>
        <Valute />
      </div>
      <div className="hidescroll">
        <div className="slab-items-group">
          {props.item.prs.map(item => (
            <GroupItem key={item.ps} item={item} url={props.url} cur={props.cur}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlabItemMobile;
