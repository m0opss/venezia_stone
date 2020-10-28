import React from 'react';

import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';

import lamp from 'images/lamp.png';
import book from 'images/book.png';
import like from 'images/like-4lvl.png';
import basket from 'images/basket-4lvl.png';

import './SlabItemTablet.scss';

const GroupItem = props => {
  return (
    <div className="slab-items-group-item">
      <div className="slab-items-group-item__img">
        <img
          className="slab-items-group-item__img-main"
          src={props.item.photobl}
        />
        <div className="slab-items-group-item__img-icon -icons-1">
          <img src={like} />
        </div>
        <div className="slab-items-group-item__img-icon -icons-2">
          <img src={basket} />
        </div>
      </div>
      <div className="slab-items-group-item__info">
        <p className="slab-items-group-item__line">Слэб: {props.item.bl}</p>
        <p className="slab-items-group-item__line">
          Размер: {props.item.le}x{props.item.he} ={props.item.os} м<sup>2</sup>
        </p>
        <p className="slab-items-group-item__line">Склад: {props.item.skl}</p>
        <p className="slab-items-group-item__line">
          Цена за м<sup>2</sup>: {props.item.cnt}₽
        </p>
        <p className="slab-items-group-item__line">
          Стоимость:{' '}
          {(parseFloat(props.item.cnt) * parseFloat(props.item.os)).toFixed(2)}{' '}
          ₽
        </p>
      </div>
    </div>
  );
};

const SlabItemTablet = props => {
  const [selectedEl, setSelectedEl] = React.useState(props.item.prs[0]);

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
            <GroupItem item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlabItemTablet;
