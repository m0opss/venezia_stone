import React, { useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { connect } from 'react-redux';

import BasketItem from 'components/MyBasket/BasketItem';
import MyModal from 'components/Modal/Modal';
import Valute from 'components/Valute/Valute';
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
    if (localStorage.getItem('basket') !== null && props.basket.length == 0) {
      setBasket(JSON.parse(localStorage.getItem('basket')));
    } else {
      setBasket(props.basket);
    }

  }, [basket]);


  const onToggleValute = e => {
    console.log(state);
  };

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
      <div className={`basket__f-line ${style}`}>
        <h1>Корзина</h1>
        <Valute />
      </div>
      <div className="basket__items">
        {basket.map(item => {
          return (
            <BasketItem
              kind="basket"
              item={item}
              type={item.izd == 'Плитка' ? true : false}
              addGood={props.addGood}
              deleteGood={props.deleteGood}
              editGood={props.editGood}
            />
          );
        })}
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
          <div className={`basket__button ${buttonStyle} -hovered`}>
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
    basket: store.basket_data.basket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addGood: data => {
      dispatch(basketActions.addGood(data));
    },
    editGood: data => {
      dispatch(basketActions.editGood(data));
    },
    deleteGood: data => {
      dispatch(basketActions.deleteGood(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBasket);
