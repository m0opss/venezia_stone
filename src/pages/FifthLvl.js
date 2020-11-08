import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import filterActions from '../actions/filterActions';
import basketActions from 'actions/basketActions';
import ImageGallery from 'react-image-gallery';
import Valute from 'components/Valute/Valute';
import Filter from 'components/Filter/Filter';
import OptionLine from 'components/5lvl/OptionLine';

import {
  MobileView,
  BrowserView,
  isTablet,
  isBrowser
} from 'react-device-detect';

import './FifthLvl.scss';

const FifthLvl = props => {
  const [item, setItem] = React.useState({});
  const [currentItemInd, setCurrentItemInd] = React.useState(0);
  const myRef = React.createRef();

  React.useEffect(() => {
    props.setLvl(5);
    window.scrollTo(0, 0);
    axios
      .get(`https://catalog-veneziastone.ru/api_v0${props.match.url}/`)
      .then(response => {
        console.log(response.data.itms[0]);
        setItem(response.data.itms[0]);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const ColorsItem = props => {
    return (
      <div className="colors-item">
        <div
          className="colors-item__color"
          style={{ background: props.item.color }}
        ></div>
        <p className="colors-item__name">{props.item.name}</p>
      </div>
    );
  };

  let _item = { color: 'red', name: 'RAL 1231' };
  const imagess = [
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      fullscreen:
        'https://storage.yandexcloud.net/venezia-photo/materials/Soapstone.jpg',
      originalClass: 'img-gallery-sizes'
    },
    {
      original:
        'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg',
      fullscreen:
        'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg',
      originalClass: 'img-gallery-sizes'
    },
    {
      original:
        'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg',
      fullscreen:
        'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg',
      originalClass: 'img-gallery-sizes'
    }
  ];

  return (
    <div className="fifth-lvl-container">
      {isBrowser ? (
        <div className="fifth-lvl">
          <div className="fifth-lvl__top">
            <Valute />
          </div>
          <div className="main-content">
            <div className="main-content__left">
              <h1 className="main-content__name">{item.name}</h1>
              <div className="main-content__info">
                <div className="main-content__text-block">
                  <p>Пачка {item.prs ? item.prs.bl : '-'}</p>
                  <p>
                    {item.prs ? item.prs.le : '-'} м X{' '}
                    {item.prs ? item.prs.he : '-'} м
                  </p>
                  <p>Площадь: {item.prs ? item.prs.os : '-'} м²</p>
                </div>
                <div className="main-content__text-block">
                  <p>
                    Цена за м²:{' '}
                    {props.cur === 'rub' && item.prs
                      ? `${item.prs.cntRUB}₽`
                      : props.cur === 'usd'
                      ? `${item.prs.cntUSD}$`
                      : props.cur === 'eur'
                      ? `${item.prs.cntEUR}€`
                      : ''}
                  </p>
                  <p>Склад: {item.prs ? item.prs.sklad : '-'}</p>
                </div>
                <div className="main-content__text-block">
                  <p>
                    Стоимость :{' '}
                    {props.cur === 'rub' && item.prs
                      ? `${(parseFloat(item.prs.cntRUB)*parseFloat(item.prs.os)).toFixed(2)}₽`
                      : props.cur === 'usd'
                      ? `${(parseFloat(item.prs.cntUSD)*parseFloat(item.prs.os)).toFixed(3)}$`
                      : props.cur === 'eur'
                      ? `${(parseFloat(item.prs.cntEUR)*parseFloat(item.prs.os)).toFixed(3)}€`
                      : ''}
                  </p>
                  <p>Скол: {item.prs && item.prs.skl? item.prs.skl : '-'}</p>
                  <p className="-wrapped">
                    Комментарий: {item.prs && item.prs.komment? item.prs.komment : '-'}
                  </p>
                </div>
              </div>
              <div className="main-content__colors">
                {/* <ColorsItem item={_item} />
                <ColorsItem item={_item} />
                <ColorsItem item={_item} />
                <ColorsItem item={_item} />
                <ColorsItem item={_item} />
                <ColorsItem item={_item} /> */}
              </div>
            </div>
            <div className="main-content__right">
              <OptionLine img={imagess[0].original} fullscreen={<></>} />
              <ImageGallery items={imagess} showThumbnails={false} />
            </div>
          </div>
        </div>
      ) : isTablet ? (
        <>
          <div className="fifth-lvl-tablet"></div>
        </>
      ) : (
        <>
          <div className="fifth-lvl-mobile"></div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = store => {
  return {
    cur: store.valute_data.valute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addGood: data => {
      dispatch(basketActions.addGood(data));
    },
    setLvl: data => {
      dispatch(filterActions.setLvl(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FifthLvl);
