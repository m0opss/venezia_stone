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
  const [currentItemInd, setCurrentItemInd ] = React.useState(0);

  // React.useEffect(() => {
    // window.scrollTo(0, 0);
  //   axios
  //     .get(`https://catalog-veneziastone.ru/api_v0${props.match.url}/`)
  //     .then(response => {
  //       setItem(response.data.itms[0]);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }, []);

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
      original: 'https://picsum.photos/id/1018/1000/600/'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/'
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
              <h1 className="main-content__name">Гранит TAN BROWN №: 58398</h1>
              <div className="main-content__info">
                <div className="main-content__text-block">
                  <p>Пачка BML 2091</p>
                  <p>1.5 м X 3.5 м</p>
                  <p>Площадь: 5,25 м²</p>
                </div>
                <div className="main-content__text-block">
                  <p>Цена за м²: 4 200₽</p>
                  <p>Склад: Краснодар</p>
                </div>
                <div className="main-content__text-block">
                  <p>Стоимость : 2 390 110₽</p>
                  <p>Скол : -</p>
                  <p className="-wrapped">
                    Комментарий : asdas asdadad ad asd asd adasdasdad asd ad
                    asda sd as d{' '}
                  </p>
                </div>
              </div>
              <div className="main-content__colors">
                <ColorsItem item={_item} />
                <ColorsItem item={_item} />
                <ColorsItem item={_item} />
                <ColorsItem item={_item} />
                <ColorsItem item={_item} />
                <ColorsItem item={_item} />
              </div>
            </div>
            <div className="main-content__right">
              <OptionLine img={imagess[0].original} />
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FifthLvl);
