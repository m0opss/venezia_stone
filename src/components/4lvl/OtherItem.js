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
  let ob_S = 0,
    ob_sht = 0,
    ob_sum = 0;
  ob_S += parseFloat(props.item.prs.map(i => i.os));
  ob_sht += parseFloat(props.item.prs.map(i => i.ossht));
  ob_sum += parseFloat(
    props.item.prs.map(i =>
      props.cur === 'rub'
        ? props.item.prs[0].cntRUB
        : props.cur === 'usd'
        ? props.item.prs[0].cntUSD
        : props.cur === 'eur'
        ? props.item.prs[0].cntEUR
        : 0
    )
  );

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
                  Общая площадь, м<sup>2</sup> : {ob_S ? ob_S : '-'}
                </p>
                <p>Количество, шт: {ob_sht ? ob_sht : '-'}</p>
                <p>
                  Сумма:{' '}
                  {ob_sum 
                  ? 
                    (props.cur === 'rub'
                    ? `${ob_sum}₽`
                    : props.cur === 'usd'
                    ? `${ob_sum}$`
                    : props.cur === 'eur'
                    ? `${ob_sum}€`
                    : '') : '-'}
                </p>
              </div>
              <ColorRange colors={props.item.prs ? props.item.prs[0] : []} />
            </div>
            <div className="slab-item-info__right-block">
              <MainImg
                type={props.type}
                img={props.item.prs.length>0 ? props.item.prs[0].photo_product : ''}
              />
            </div>
          </div>
        </div>

        <div className="good-items-table">
          <div className="good-items-table__item slabs-title other-title">
            <div className="table-row__item table-row__item_l">
              <p>Склад</p>
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
          {props.item.prs ? (
            props.item.prs.map(item => (
              <OtherTableRow
                cur={props.cur}
                url={props.url}
                key={item.ps}
                type={props.type}
                item={item}
                isAuth={props.isAuth}

              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  } else if (isTablet) {
    return (
      <OtherItemTablet
        item={props.item}
        cur={props.cur}
        isAuth={props.isAuth}
        type={props.type}
      />
    );
  } else {
    return (
      <OtherItemMobile
        item={props.item}
        cur={props.cur}
        isAuth={props.isAuth}
        type={props.type}
      />
    );
  }
};

export default OtherItem;
