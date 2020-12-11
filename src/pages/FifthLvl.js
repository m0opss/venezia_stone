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
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { isTablet, isBrowser, isMobile } from 'react-device-detect';

import './FifthLvl.scss';

const FifthLvl = props => {
  const [item, setItem] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);
  const [breadPath, setBreadPath] = React.useState({});

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (props.auth_token != '')
      console.log({
        material: [props.match.params.material],
        item: [props.match.params.num],
        group: [props.match.params.numGroups],
        product: [props.match.params.last],
        token: [props.auth_token]
      });
    axios
      .post(`https://catalog-veneziastone.ru/api_v0/Product/`, {
        material: [props.match.params.material],
        item: [props.match.params.num],
        group: [props.match.params.numGroups],
        product: [props.match.params.last],
        token: props.auth_token == '' ? [] : [props.auth_token]
      })
      .then(response => {
        console.log(response.data);
        setBreadPath(response.data.path);
        // setImages([response.data.itms[0].prs.photo_product]);
        setItem(response.data.itms[0]);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, [props.auth_token]);

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
      {isMobile && !isTablet ? (
        <></>
      ) : (
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/">Главная </Link>
          </Breadcrumb.Item>
          {props.nw.length != 0 ? (
            <Breadcrumb.Item>Новые поступления</Breadcrumb.Item>
          ) : props.sale.length != 0 ? (
            <Breadcrumb.Item>Распродажа</Breadcrumb.Item>
          ) : (
            <></>
          )}
          <Breadcrumb.Item>
            <Link to="/materials">{breadPath.material} </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              to={`/${props.match.params.material}/${props.match.params.numGroups}`}
            >
              {breadPath.group}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              to={`/${props.match.params.material}/${props.match.params.numGroups}/${props.match.params.num}`}
            >
              {breadPath.item}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{breadPath.product}</Breadcrumb.Item>
        </Breadcrumb>
      )}
      <Preloader isLoading={isLoading}>
        {isBrowser ? (
          <div className="fifth-lvl">
            <div className="fifth-lvl__top">
              <Valute />
            </div>
            <div className="main-content">
              <div className="main-content__left">
                <h1 className="main-content__name">
                  {item.name} {item.prs ? item.prs.ps : ''}
                </h1>
                <div className="main-content__info">
                  <div className="main-content__text-block">
                    <p>Пачка {item.prs ? item.prs.bl : '-'}</p>
                    <p>
                      {item.prs ? item.prs.le : '-'} м X{' '}
                      {item.prs ? item.prs.he : '-'} м
                    </p>
                    <p>Скол: {item.prs && item.prs.sco ? item.prs.sco : '-'}</p>
                    <p>
                      Площадь:{' '}
                      {item.prs
                        ? item.prs.sco
                          ? (
                              parseFloat(item.prs.le) *
                                parseFloat(item.prs.he) -
                              parseFloat(item.prs.sco)
                            ).toFixed(2)
                          : (
                              parseFloat(item.prs.le) * parseFloat(item.prs.he)
                            ).toFixed(2)
                        : ''}{' '}
                      м²
                    </p>
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
                      Стоимость:{' '}
                      {props.cur === 'rub' && item.prs
                        ? `${(
                            parseFloat(item.prs.cntRUB) *
                            parseFloat(item.prs.le) *
                            parseFloat(item.prs.he)
                          ).toFixed(2)}₽`
                        : props.cur === 'usd'
                        ? `${(
                            parseFloat(item.prs.cntUSD) *
                            parseFloat(item.prs.le) *
                            parseFloat(item.prs.he)
                          ).toFixed(3)}$`
                        : props.cur === 'eur'
                        ? `${(
                            parseFloat(item.prs.cntEUR) *
                            parseFloat(item.prs.le) *
                            parseFloat(item.prs.he)
                          ).toFixed(3)}€`
                        : '-'}
                    </p>
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
                <div className="main-content__options">
                  <div
                    style={{ marginTop: 0 }}
                    className="main-content__add-icons"
                  >
                    <div className="main-content__add-icon">
                      {item.prs ? <ItemAddIzbr item={item.prs} /> : <></>}
                    </div>
                    <div className="main-content__add-icon">
                      {item.prs ? <ItemAddBasket item={item.prs} /> : <></>}
                    </div>
                  </div>
                  {item.prs ? (
                    <OptionLine item={item.prs} fullscreen={<></>} />
                  ) : (
                    <></>
                  )}
                </div>
                <div style={{ marginRight: '30px' }}>
                  {item.prs ? item.prs.typeFoto : ''}
                </div>
                <div style={{ position: 'relative', width: '100%' }}>
                  <div className="num-gr-item__labels">
                    {item.prs && item.prs.nw != 0 ? (
                      <div className="item-label item-label_gallery item-label-new">
                        Новинка
                      </div>
                    ) : (
                      <></>
                    )}
                    {item.prs && item.prs.onSale != 0 ? (
                      <div className="item-label item-label_gallery item-label-sale">
                        Распродажа
                      </div>
                    ) : (
                      <></>
                    )}
                    {item.prs && item.prs.pz != 0 ? (
                      <div className="item-label item-label_gallery item-label-order">
                        Под заказ
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <ImageGallery item={[item.prs]} />
                </div>
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
              <div className="">{item.prs ? item.prs.typeFoto : ''}</div>
              <ImageGallery item={[item.prs]} />
              <div className="main-content__info-tablet">
                <div className="main-content__text-block">
                  <p>
                    Размер: {item.prs ? item.prs.le : '-'} м X{' '}
                    {item.prs ? item.prs.he : '-'} м ={' '}
                    {item.prs
                      ? parseFloat(item.prs.le) * parseFloat(item.prs.he) -
                        parseFloat(item.prs.sko)
                      : '-'}{' '}
                    м²
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
                          parseFloat(item.prs.cntRUB) *
                          parseFloat(item.prs.le) *
                          parseFloat(item.prs.he)
                        ).toFixed(2)}₽`
                      : props.cur === 'usd'
                      ? `${(
                          parseFloat(item.prs.cntUSD) *
                          parseFloat(item.prs.le) *
                          parseFloat(item.prs.he)
                        ).toFixed(3)}$`
                      : props.cur === 'eur'
                      ? `${(
                          parseFloat(item.prs.cntEUR) *
                          parseFloat(item.prs.le) *
                          parseFloat(item.prs.he)
                        ).toFixed(3)}€`
                      : ''}
                  </p>
                  <p>Скол: {item.prs && item.prs.sco ? item.prs.sco : '-'}</p>
                  <p>
                    Комментарий:{' '}
                    {item.prs && item.prs.komment ? item.prs.komment : '-'}
                  </p>
                </div>
                <div className="main-content__icons">
                  <div className="main-content__photo-icons">
                    {item.prs ? (
                      <OptionLine item={item.prs} fullscreen={<></>} />
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

              <ImageGallery item={[item.prs]} />
              <div className="">{item.prs ? item.prs.typeFoto : ''}</div>
              <div className="fifth-lvl__opt">
                {item.prs ? (
                  <OptionLine item={item.prs} fullscreen={<></>} />
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
                    {item.prs
                      ? parseFloat(item.prs.le) * parseFloat(item.prs.he) -
                        parseFloat(item.prs.sko)
                      : '-'}{' '}
                    м²
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
                          parseFloat(item.prs.cntRUB) *
                          parseFloat(item.prs.le) *
                          parseFloat(item.prs.he)
                        ).toFixed(2)}₽`
                      : props.cur === 'usd'
                      ? `${(
                          parseFloat(item.prs.cntUSD) *
                          parseFloat(item.prs.le) *
                          parseFloat(item.prs.he)
                        ).toFixed(3)}$`
                      : props.cur === 'eur'
                      ? `${(
                          parseFloat(item.prs.cntEUR) *
                          parseFloat(item.prs.le) *
                          parseFloat(item.prs.he)
                        ).toFixed(3)}€`
                      : ''}
                  </p>
                  <p>Скол: {item.prs && item.prs.sco ? item.prs.sco : '-'}</p>
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
    auth_token: store.auth_data.auth_token,
    sale: store.filter_data.sale,
    nw: store.filter_data.nw
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addGood: data => {
      dispatch(basketActions.addGood(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FifthLvl);
