import React from 'react';

import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import OtherTableRow from 'components/4lvl/OtherTableRow';
import OtherItemTablet from 'components/4lvl/OtherItemTablet';
import OtherItemMobile from 'components/4lvl/OtherItemMobile';

import { isTablet, isBrowser } from 'react-device-detect';

import lamp from 'images/lamp.png';
import book from 'images/book.png';
import like from 'images/like-4lvl.png';
import basket from 'images/basket-4lvl.png';

import arr from 'images/arr-4lvl.png';

const PlitkaMainImg = props => {
  return (
    <div className="other-item-info__main-images">
      <div id="img-1" className="other-item-info__main-image -plitka-img">
        <img src={props.img} />
      </div>
      <div id="img-2" className="other-item-info__main-image -plitka-img">
        <img src={props.img} />
      </div>
      <div id="img-3" className="other-item-info__main-image -plitka-img">
        <img src={props.img} />
      </div>
      <div id="img-4" className="other-item-info__main-image -plitka-img">
        <img src={props.img} />
      </div>
      <div id="img-5" className="other-item-info__main-image -plitka-img">
        <img src={props.img} />
      </div>
      <div id="img-6" className="other-item-info__main-image -plitka-img">
        <img src={props.img} />
      </div>
    </div>
  );
};
const OtherMainImg = props => {
  return (
    <div className="other-item-info__main-images">
      <div id="img-1" className="other-item-info__main-image -other-img">
        <img src={props.img} />
      </div>
      <div id="img-2" className="other-item-info__main-image -other-img">
        <img src={props.img} />
      </div>
      <div id="img-3" className="other-item-info__main-image -other-img">
        <img src={props.img} />
      </div>
      <div id="img-4" className="other-item-info__main-image -other-img">
        <img src={props.img} />
      </div>
    </div>
  );
};
const StupeniMainImg = props => {
  return (
    <div className="other-item-info__main-images">
      <div id="img-1" className="other-item-info__main-image -stupeni-img">
        <img src={props.img} />
      </div>
      <div id="img-2" className="other-item-info__main-image -stupeni-img">
        <img src={props.img} />
      </div>
    </div>
  );
};
const MainImg = props => {
  if (props.type == 'Ступени') {
    return <StupeniMainImg img={props.img} />;
  } else if (props.type == 'Плитка') {
    return <PlitkaMainImg img={props.img} />;
  } else {
    return <OtherMainImg img={props.img} />;
  }
};

const OtherItem = props => {
  console.log(props.item);
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

  if (isBrowser) {
    return (
      <div className="slab-item">
        <div className="slab-item-info">
          <div className="slab-item-info__top">
            <h1 className="slab-item-info__title">{props.item.name}</h1>
            <ButtonsPanel />
          </div>
          <div className="slab-item-info__bottom">
            <div className="slab-item-info__left-block slab-item-info__left-block_other">
              <div className="slab-item-info__parameters">
                <p>
                  Общая площадь, м<sup>2</sup> : {props.item.prs[0].os}
                </p>
                <p>Количество, шт: </p>
                <p>
                  Сумма:{' '}
                  {props.cur === 'rub'
                    ? `${props.item.prs[0].cntRUB}₽`
                    : props.cur === 'usd'
                    ? `${props.item.prs[0].cntUSD}$`
                    : props.cur === 'eur'
                    ? `${props.item.prs[0].cntEUR}€`
                    : ''}
                </p>
              </div>
              <ColorRange colors={colors} />
            </div>
            <div className="slab-item-info__right-block">
              <MainImg
                type={props.type}
                img={props.item.prs[0].photo_product}
              />
            </div>
          </div>
        </div>

        <div className="good-items-table">
          <div className="good-items-table__item slabs-title other-title">
            <div className="table-row__item table-row__item_l">
              <p>Склад: {props.item.prs[0].sklad}</p>
            </div>
            <div className="table-row__item table-row__item_l">
              <p>
                Цена за м<sup>2</sup>
              </p>
            </div>
            <div className="table-row__item">
              <p>
                Наличие, м<sup>2</sup>
              </p>
            </div>
            <div className="table-row__item">
              <p>Наличие, шт</p>
            </div>
            <div className="table-row__item table-row__item-count">
              <div className="table-row__item-count_title-t">Рассчитать</div>
              <div className="table-row__item-count_title-b">
                <div className="">
                  м<sup>2</sup>
                </div>
                <div className="">шт</div>
                <div className="">Сумма</div>
              </div>
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
            <OtherTableRow
              cur={props.cur}
              url={props.url}
              key={item.ps}
              type={props.item.izd}
              item={item}
            />
          ))}
        </div>
      </div>
    );
  } else if (isTablet) {
    return <OtherItemTablet item={props.item} cur={props.cur} />;
  } else {
    return <OtherItemMobile item={props.item} cur={props.cur} />;
  }
};

export default OtherItem;
