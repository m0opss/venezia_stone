import React, { useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { connect } from 'react-redux';

import BasketItem from 'components/MyBasket/BasketItem';
import MyModal from 'components/Modal/Modal';
import Valute from 'components/Valute/Valute';
import BackArrow from 'components/BackArrow/BackArrow';
import basketActions from 'actions/basketActions';

import './MyBasket.scss';

const MyBasket = props => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [basket, setBasket] = React.useState([]);

  const onClickOrder = () => {
    if (props.isAuth) {
      setVisibleModal(true);
    } else {
    }
  };

  useEffect(() => {
    if (props.basket.length === 0 && localStorage.getItem('basket') !== null) {
      props.setBasket(JSON.parse(localStorage.getItem('basket')));
      console.log('baset', props.basket);
    }
  }, []);

  const orderOk = e => {
    setVisibleModal(false);
  };

  const orderCancel = e => {
    setVisibleModal(false);
  };
  let modalContent = (
    <div className="order-inputs">
      <input type="text" placeholder="Имя" />
      <input type="text" placeholder="Телефон*" />
      <input type="text" placeholder="Email*" />
    </div>
  );

  let style = '';
  let buttonStyle = '';
  if (!isTablet && isMobile) style = '-basket-mobile';
  if (isMobile) buttonStyle = '-button-mobile';

  return (
    <div className="basket">
      <MyModal
        title="Оформить заказ"
        handleOk={orderOk}
        okText="Оформить заказ"
        handleCancel={orderCancel}
        visible={visibleModal}
        content={modalContent}
      />
      <BackArrow history={props.history} />
      <div className={`basket__f-line ${style}`}>
        <h1>Корзина</h1>
        <Valute />
      </div>
      <div className="basket__items">
        {
        props.basket.length > 0 ? props.basket.map(item => {
          return (
            <BasketItem
              key={item.ps}
              kind="basket"
              cur={props.cur}
              item={item}
              type={item.izd == 'Плитка' ? true : false}
              addGood={props.addGood}
              deleteGood={props.deleteGood}
              editGood={props.editGood}
            />
          );
        }) :<></>}
      </div>

      <div className="basket__bottom-line">
        <div className="basket__total">
          <div className="">
            <p>Итого шт.: 12</p>
            <p>
              Итого м<sup>2</sup>: 400
            </p>
            <p>Итого : 44000 ₽</p>
          </div>
        </div>
        <div className="basket__buttons">
          <div
            className={`basket__button ${buttonStyle} -hovered`}
            onClick={props.deleteAll}
          >
            Очистить все
          </div>
          <div
            className={`basket__button ${buttonStyle} -hovered`}
            onClick={onClickOrder}
          >
            Оформить заказ
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = store => {
  return {
    isAuth: store.auth_data.isAuth,
    basket: store.basket_data.basket,
    cur: store.valute_data.valute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBasket: data => {
      dispatch(basketActions.setBasket(data));
    },
    addGood: data => {
      dispatch(basketActions.addGood(data));
    },
    deleteGood: data => {
      dispatch(basketActions.deleteGood(data));
    },
    deleteAll: data => {
      dispatch(basketActions.deleteAll(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBasket);
