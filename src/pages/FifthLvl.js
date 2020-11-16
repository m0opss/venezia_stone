import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';
import filterActions from '../actions/filterActions';
import basketActions from 'actions/basketActions';
import BackArrow from 'components/BackArrow/BackArrow';
import ImageGallery from 'components/5lvl/ImageGallery';
import Valute from 'components/Valute/Valute';
import OptionLine from 'components/5lvl/OptionLine';
import Preloader from 'components/Preloader/Preloader';
import {
  MobileView,
  BrowserView,
  isTablet,
  isBrowser
} from 'react-device-detect';

import './FifthLvl.scss';

const FifthLvl = props => {
  const [item, setItem] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    props.setLvl(5);
    window.scrollTo(0, 0);
    axios
      .get(`https://catalog-veneziastone.ru/api_v0${props.match.url}/`)
      .then(response => {
        // setImages([response.data.itms[0].prs.photo_product]);
        setItem(response.data.itms[0]);
        setLoading(false);
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

  return (
    <div className="fifth-lvl-container">
      <Preloader isLoading={isLoading}>
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
                        ? `${(
                            parseFloat(item.prs.cntRUB) *
                            parseFloat(item.prs.os)
                          ).toFixed(2)}₽`
                        : props.cur === 'usd'
                        ? `${(
                            parseFloat(item.prs.cntUSD) *
                            parseFloat(item.prs.os)
                          ).toFixed(3)}$`
                        : props.cur === 'eur'
                        ? `${(
                            parseFloat(item.prs.cntEUR) *
                            parseFloat(item.prs.os)
                          ).toFixed(3)}€`
                        : ''}
                    </p>
                    <p>Скол: {item.prs && item.prs.skl ? item.prs.skl : '-'}</p>
                    <p className="-wrapped">
                      Комментарий:{' '}
                      {item.prs && item.prs.komment ? item.prs.komment : '-'}
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
                {item.prs ? (
                  <OptionLine
                    img={`data:image/jpg;base64,${item.prs.photo_bytes}`}
                    fullscreen={<></>}
                  />
                ) : (
                  <></>
                )}

                <ImageGallery item={item} />
              </div>
            </div>
          </div>
        ) : isTablet ? (
          <>
            <div className="fifth-lvl-tablet">
              <div className="fifth-lvl__top">
                <Valute />
              </div>
              <div className="fifth-lvl__title">
                <p>Пачка {item.prs ? item.prs.bl : '-'}</p>
                <p>СЛЭБ {item.prs ? item.prs.ps : '-'}</p>
              </div>

              <ImageGallery item={item} />
              <div className="main-content__info-tablet">
                <div className="main-content__text-block">
                  <p>
                    Размер: {item.prs ? item.prs.le : '-'} м X{' '}
                    {item.prs ? item.prs.he : '-'} м ={' '}
                    {item.prs ? item.prs.os : '-'} м²
                  </p>
                  <p>Склад: {item.prs ? item.prs.sklad : '-'}</p>
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
                  <p>
                    Стоимость:{' '}
                    {props.cur === 'rub' && item.prs
                      ? `${(
                          parseFloat(item.prs.cntRUB) * parseFloat(item.prs.os)
                        ).toFixed(2)}₽`
                      : props.cur === 'usd'
                      ? `${(
                          parseFloat(item.prs.cntUSD) * parseFloat(item.prs.os)
                        ).toFixed(3)}$`
                      : props.cur === 'eur'
                      ? `${(
                          parseFloat(item.prs.cntEUR) * parseFloat(item.prs.os)
                        ).toFixed(3)}€`
                      : ''}
                  </p>
                  <p>Скол: {item.prs && item.prs.skl ? item.prs.skl : '-'}</p>
                  <p>
                    Комментарий:{' '}
                    {item.prs && item.prs.komment ? item.prs.komment : '-'}
                  </p>
                </div>
                <div className="main-content__icons">
                  <div className="main-content__photo-icons">
                    {item.prs ? (
                      <OptionLine
                        img={item.prs.photo_product}
                        fullscreen={<></>}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="main-content__add-icons">
                    <div className="main-content__add-icon">
                      {item.prs ? <ItemAddIzbr item={item.prs} /> : <></>}
                    </div>
                    <div className="main-content__add-icon">
                      {item.prs ? <ItemAddBasket item={item.prs} /> : <></>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="fifth-lvl-mobile">
              <BackArrow history={props.history} />
              <h3 className="main-content__name">{item.name}</h3>
              <div className="fifth-lvl__title">
                <p>Пачка {item.prs ? item.prs.bl : '-'}</p>
                <p>СЛЭБ {item.prs ? item.prs.ps : '-'}</p>
              </div>

              <ImageGallery item={item} />
              <div className="fifth-lvl__opt">
                {item.prs ? (
                  <OptionLine img={item.prs.photo_product} fullscreen={<></>} />
                ) : (
                  <></>
                )}
              </div>
              <div className="fifth-lvl__top">
                <Valute />
              </div>
              <div className="main-content__info-tablet">
                <div className="main-content__text-block">
                  <p>
                    Размер: {item.prs ? item.prs.le : '-'} м X{' '}
                    {item.prs ? item.prs.he : '-'} м ={' '}
                    {item.prs ? item.prs.os : '-'} м²
                  </p>
                  <p>Склад: {item.prs ? item.prs.sklad : '-'}</p>
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
                  <p>
                    Стоимость:{' '}
                    {props.cur === 'rub' && item.prs
                      ? `${(
                          parseFloat(item.prs.cntRUB) * parseFloat(item.prs.os)
                        ).toFixed(2)}₽`
                      : props.cur === 'usd'
                      ? `${(
                          parseFloat(item.prs.cntUSD) * parseFloat(item.prs.os)
                        ).toFixed(3)}$`
                      : props.cur === 'eur'
                      ? `${(
                          parseFloat(item.prs.cntEUR) * parseFloat(item.prs.os)
                        ).toFixed(3)}€`
                      : ''}
                  </p>
                  <p>Скол: {item.prs && item.prs.skl ? item.prs.skl : '-'}</p>
                  <p>
                    Комментарий:{' '}
                    {item.prs && item.prs.komment ? item.prs.komment : '-'}
                  </p>
                </div>
                <div className="main-content__icons">
                  <div className="main-content__add-icons">
                    <div className="main-content__add-icon">
                      {item.prs ? <ItemAddIzbr item={item.prs} /> : <></>}
                    </div>
                    <div className="main-content__add-icon">
                      {item.prs ? <ItemAddBasket item={item.prs} /> : <></>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Preloader>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    cur: store.valute_data.valute,
    auth_token: store.auth_data.auth_token
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
