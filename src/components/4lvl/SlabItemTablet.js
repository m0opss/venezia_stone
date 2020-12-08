import React from 'react';
import ImageGallery from 'components/5lvl/ImageGallery';
import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import OptionLine from 'components/5lvl/OptionLine';

import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';

import AllAddBasket from '../MyBasket/AllAddBasket';
import AllAddIzbr from '../MyBasket/AllAddIzbr';

import './SlabItemTablet.scss';
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
            Цена за м<sup>2</sup> :{' '}
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
            Стоимость :{' '}
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

const SlabItemTablet = props => {
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
        if (slab.onSale == '1') nw = true;
        if (slab.pz == '1') nw = true;
      });
      if (nw) tmp[bl]['nw'] = 1;
      else tmp[bl]['nw'] = 0;
      if (onSale) tmp[bl]['onSale'] = 1;
      else tmp[bl]['onSale'] = 0;
      if (pz) tmp[bl]['pz'] = 1;
      else tmp[bl]['pz'] = 0;
    });
    console.log(tmp);
    return tmp;
  });

  const [selectedEl, setSelectedEl] = React.useState(
    Object.keys(itemDict).length > 0 ? Object.keys(itemDict)[0] : ''
  );
  let images = [];
  return (
    <div className="slab-item">
      <div className="slab-item-info">
        <div className="slab-item-info__top">
          <h1 className="slab-item-info__title">{props.item[0].itms_name}</h1>
          <ButtonsPanel images={images} />
        </div>
        <div className="slab-item-info__bottom">
          <div className="slab-item-info__left-block">
            <ScrollImage
              scrollStyle="slab-item-info-scroll"
              selectItem={setSelectedEl}
              selectedItem={selectedEl}
              elements={itemDict}
            />
          </div>
          <div className="slab-item-info__right-block">
            <div className="slab-item-info__rb-top">
              <div className="slab-item-info__slab-title">{selectedEl}</div>
              <div className="slab-item-info__options"></div>
            </div>
            <div className="slab-item-info__slab-img">
              <div className="num-gr-item__labels">
                {itemDict[selectedEl].nw != 0 ? (
                  <div className="item-label item-label-new">Новинка</div>
                ) : (
                  <></>
                )}
                {itemDict[selectedEl].onSale != 0 ? (
                  <div className="item-label item-label-sale">Распродажа</div>
                ) : (
                  <></>
                )}
                {itemDict[selectedEl].pz != 0 ? (
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
              <ColorRange
                colors={itemDict[selectedEl]['slabs'][0].color_range}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="slab-items-group">
        {itemDict[selectedEl]['slabs'].length > 0 ? (
          itemDict[selectedEl]['slabs'].map(item => (
            <GroupItem
              key={item.ps}
              item={item}
              url={props.url}
              cur={props.cur}
              type={props.type}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SlabItemTablet;
