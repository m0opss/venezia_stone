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
  const [orderBasket, setOrderBasket] = React.useState([]);

  const [all_sum, setAllSum] = React.useState(0);
  const [all_cnt, setAllCnt] = React.useState(0);

  const [cntSum, setCntSum] = React.useState([]);

  const onClickOrder = () => {
    if (props.isAuth) {
      setVisibleModal(true);
    } else {
    }
  };

  useEffect(() => {
    console.log(props.basket)
    if (props.basket.length === 0 && localStorage.getItem('basket') !== null) {
      props.setBasket(JSON.parse(localStorage.getItem('basket')));
    }
    let c = 0;
    cntSum.map(i => console.log(i));

  }, [basket.length]);


  const orderOk = e => {
    setVisibleModal(false);
  };


  const orderCancel = e => {
    setVisibleModal(false);
  };

  
  let modalContent = (
    <div className="order-inputs">
      <input
        type="text"
        placeholder="Имя"
        defaultValue={
          localStorage.getItem('first_name') !== null
            ? localStorage.getItem('first_name')
            : ''
        }
      />
      <input
        type="text"
        placeholder="Телефон"
        defaultValue={
          localStorage.getItem('phone') !== null
            ? localStorage.getItem('phone')
            : ''
        }
      />
      <input
        type="text"
        placeholder="Email*"
        defaultValue={
          localStorage.getItem('email') !== null
            ? localStorage.getItem('email')
            : ''
        }
      />
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
        okText="Оформить заказ"
        onOk={orderOk}
        onCancel={orderCancel}
        visible={visibleModal}
        buttonVision={true}
      >
        {modalContent}
      </MyModal>
      <BackArrow history={props.history} />
      <div className={`basket__f-line ${style}`}>
        <h1>Корзина</h1>
        <Valute />
      </div>
      <div className="basket__items">
        {props.basket.length > 0 ? (
          props.basket.map(item => {
            return (
              <BasketItem
                setBasket={setBasket}
                basket={props.basket}
                cntSum={cntSum}
                key={item.ps}
                kind="basket"
                cur={props.cur}
                item={item}
                type={item.type}
                addGood={props.addGood}
                deleteGood={props.deleteGood}
                editGood={props.editGood}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>

      <div className="basket__bottom-line">
        <div className="basket__total">
          <div className="">
            <p>Итого шт.: {props.basket.length}</p>
            <p>
              Итого м<sup>2</sup>:{props.basket.map(item => {})}
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
