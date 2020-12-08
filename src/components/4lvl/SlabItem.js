import React from 'react';

import { Link } from 'react-router-dom';

import ScrollImage from 'components/ScrollImage/ScrollImage';
import ColorRange from 'components/ColorRange/ColorRange';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import SlabItemTablet from 'components/4lvl/SlabItemTablet';
import SlabItemMobile from 'components/4lvl/SlabItemMobile';
import ImageGallery from 'components/5lvl/ImageGallery';

import { isTablet, isBrowser } from 'react-device-detect';

import AllAddBasket from '../MyBasket/AllAddBasket';
import AllAddIzbr from '../MyBasket/AllAddIzbr';

const SlabTableRow = props => {
  if (props.item) {
    return (
      <div className="good-items-table__item">
        <Link to={props.item.url}>
          <div className="table-row__item">
            <p>{props.item.ps}</p>
          </div>
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
            <p>{props.item.sco ? props.item.sco : 0}</p>
          </div>
          <div className="table-row__item table-row__item_s">
            <p>
              {props.item.sco
                ? (
                    parseFloat(props.item.le) * parseFloat(props.item.he) -
                    parseFloat(props.item.sco)
                  ).toFixed(2)
                : (
                    parseFloat(props.item.le) * parseFloat(props.item.he)
                  ).toFixed(2)}
            </p>
          </div>
          <div className="table-row__item table-row__item_l">
            <p>{props.item.sklad}</p>
          </div>
          <div className="table-row__item table-row__item_l">
            <p>
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
          </div>
          <div className="table-row__item table-row__item_l">
            <p>
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
        {props.isAuth ? (
          <div className="table-row__item good-items-table__title-icons">
            <ItemAddIzbr item={{ ...props.item, type: props.type }} />
          </div>
        ) : (
          <></>
        )}

        <div className="table-row__item good-items-table__title-icons">
          {props.item.cntRUB == 'По запросу' ? (
            <p>По запросу</p>
          ) : (
            <ItemAddBasket item={{ ...props.item, type: props.type }} />
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

const SlabItem = props => {
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
    console.log(tmp);
    return tmp;
  });

  const [selectedEl, setSelectedEl] = React.useState(
    Object.keys(itemDict).length > 0 ? Object.keys(itemDict)[0] : ''
  );

  // console.log(itemDict[selectedEl])

  let images = [];
  if (isBrowser) {
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
                    <div className="item-label  item-label_gallery item-label-new">
                      Новинка
                    </div>
                  ) : (
                    <></>
                  )}
                  {itemDict[selectedEl].onSale != 0 ? (
                    <div className="item-label  item-label_gallery item-label-sale">
                      Распродажа
                    </div>
                  ) : (
                    <></>
                  )}
                  {itemDict[selectedEl].pz != 0 ? (
                    <div className="item-label  item-label_gallery item-label-order">
                      Под заказ
                    </div>
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
        <div className="good-items-table">
          <div className="good-items-table__item slabs-title">
            <div className="good-items-table__title-wrapper">
              <div className="table-row__item">
                <p>Слэб</p>
              </div>
              <div className="table-row__item">
                <p>Пачка</p>
              </div>
              <div className="table-row__item table-row__item_s">
                <p>Длина,м</p>
              </div>
              <div className="table-row__item table-row__item_s">
                <p>Высота,м</p>
              </div>
              <div className="table-row__item table-row__item_s">
                <p>
                  Скол,м<sup>2</sup>
                </p>
              </div>
              <div className="table-row__item table-row__item_s">
                <p>
                  Площадь,м<sup>2</sup>
                </p>
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
                <AllAddIzbr goods={props.item} />
              </div>
            ) : (
              <></>
            )}
            <div className="table-row__item good-items-table__title-icons">
              <AllAddBasket goods={props.item} />
            </div>
          </div>
          {itemDict[selectedEl]['slabs'].length > 0 ? (
            itemDict[selectedEl]['slabs'].map(item => (
              <SlabTableRow
                isAuth={props.isAuth}
                cur={props.cur}
                key={item.ps}
                type={props.type}
                item={item}
                url={props.url}
                addGood={props.addGood}
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
      <SlabItemTablet
        item={props.item}
        url={props.item.url}
        cur={props.cur}
        type={props.type}
        isAuth={props.isAuth}
      />
    );
  } else {
    return (
      <SlabItemMobile
        item={props.item}
        url={props.item.url}
        type={props.type}
        cur={props.cur}
        isAuth={props.isAuth}
      />
    );
  }
};

export default SlabItem;
