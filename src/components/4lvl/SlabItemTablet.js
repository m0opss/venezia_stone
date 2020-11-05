import React from 'react';

import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';

import lamp from 'images/lamp.png';
import book from 'images/book.png';

import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';

import './SlabItemTablet.scss';
import { Link } from 'react-router-dom';

const GroupItem = props => {
  console.log('GroupItem', props)
  return (
    <Link to={`${props.url}/${props.item.bl}`}>
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
            Цена за м<sup>2</sup> : {' '}
            {props.cur === 'rub'
              ? `${props.item.cntRUB}₽`
              : props.cur === 'usd'
              ? `${props.item.cntUSD}$`
              : props.cur === 'eur'
              ? `${props.item.cntEUR}€`
              : ''}
          </p>
          <p className="slab-items-group-item__line">
            Стоимость : {' '}
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
              : 1}
          </p>
        </div>
      </div>
    </Link>
  );
};

const SlabItemTablet = props => {
  const [selectedEl, setSelectedEl] = React.useState(props.item.prs[0]);
  console.log('SlabItemTablet', props.item);
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  return (
    <div className="slab-item">
      <div className="slab-item-info">
        <div className="slab-item-info__top">
          <h1 className="slab-item-info__title">{props.item.name}</h1>
          <ButtonsPanel />
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
              <div className="slab-item-info__slab-title">{selectedEl.bl}</div>
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
        <div className="slab-items-group">
          {props.item.prs.map(item => (
            <GroupItem key={item.ps} item={item} url={props.url} cur={props.cur} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlabItemTablet;
