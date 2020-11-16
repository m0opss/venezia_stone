import React from 'react';

import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import OptionLine from 'components/5lvl/OptionLine';

import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';

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
      <Link to={`${props.url}/${props.item.ps}`}>
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
            Цена за м<sup>2</sup> :{' '}
            {props.cur === 'rub'
              ? `${props.item.cntRUB}₽`
              : props.cur === 'usd'
              ? `${props.item.cntUSD}$`
              : props.cur === 'eur'
              ? `${props.item.cntEUR}€`
              : ''}
          </p>
          <p className="slab-items-group-item__line">
            Стоимость :{' '}
            {props.cur === 'rub'
              ? `${(
                  parseFloat(props.item.cntRUB) * parseFloat(props.item.le) * parseFloat(props.item.he)
                ).toFixed(2)} ₽`
              : props.cur === 'usd'
              ? `${(
                  parseFloat(props.item.cntUSD) * parseFloat(props.item.le) * parseFloat(props.item.he)
                ).toFixed(2)} $`
              : props.cur === 'eur'
              ? `${(
                  parseFloat(props.item.cntEUR) * parseFloat(props.item.le) * parseFloat(props.item.he)
                ).toFixed(2)} €`
              : 1}
          </p>
        </div>
      </Link>
    </div>
  );
};

const SlabItemTablet = props => {
  const [selectedEl, setSelectedEl] = React.useState(props.item.prs[0]);
  const [loadCnt, setLoadCnt] = React.useState(12);
  const loadMore = () => {
    setLoadCnt(loadCnt => loadCnt + 12);
  };
  let images = [];
  return (
    <div className="slab-item">
      <div className="slab-item-info">
        <div className="slab-item-info__top">
          <h1 className="slab-item-info__title">{props.item.name}</h1>
          <ButtonsPanel images={images}/>
        </div>
        <div className="slab-item-info__bottom">
          <div className="slab-item-info__left-block">
            <ScrollImage
              scrollStyle="slab-item-info-scroll"
              selectItem={setSelectedEl}
              elements={props.item.prs}
              selectedItem={selectedEl}
            />
          </div>
          <div className="slab-item-info__right-block">
            <div className="slab-item-info__rb-top">
              <div className="slab-item-info__slab-title">{selectedEl.bl}</div>
              <div className="slab-item-info__options">
                <OptionLine
                  // lamp = {selectedEl.} поле для просветленного фото
                  style={{ width: 'unset', marginBottom: 'unset' }}
                  img={selectedEl.photo_product}
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
              <img src={selectedEl.photo_product} />
              <ColorRange colors={selectedEl} />
            </div>
          </div>
        </div>
      </div>

      <div className="slab-items-group">
        {props.item.prs.slice(0, loadCnt).map(item => (
          <GroupItem
            key={item.ps}
            item={item}
            url={props.url}
            cur={props.cur}
            type={props.type}
          />
        ))}
      </div>
      <div className="button-text button load-more" onClick={loadMore}>
        Загрузить еще
      </div>  
    </div>
  );
};

export default SlabItemTablet;
