import React, { useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { connect } from 'react-redux';

import BasketItem from 'components/MyBasket/BasketItem';
import OrderModal from 'components/Modal/OrderModal';
import Valute from 'components/Valute/Valute';
import BackArrow from 'components/BackArrow/BackArrow';
import basketActions from 'actions/basketActions';

import './MyBasket.scss';

const MyBasket = props => {
  const [visibleModal, setVisibleModal] = React.useState(false);

  const [basket, setBasket] = React.useState(function getInitialState() {
    if (props.basket.length == 0) {
      if (localStorage.getItem('basket') !== null) {
        return JSON.parse(localStorage.getItem('basket'));
      } else return [];
    } else {
      return props.basket;
    }
  });
  const [all_sum, setAllSum] = React.useState(0);
  const [all_kw, setAllKw] = React.useState(0);

  useEffect(() => {
    setAllSum(cntSumm(basket));
    setAllKw(cntKw(basket));
  }, [basket]);

  const cntKw = basket => {
    let res = 0;
    basket.map(item => {
      if (item.type == 'Слэбы' || item.type == 'Полоса') {
        res += parseFloat(item.os);
      } else {
        console.log(item)
        res += parseFloat(item.S);
      }
    });
    return res;
  };

  const cntSumm = basket => {
    let res = 0;
    basket.map(item => {
      if (item.type == 'Слэбы' || item.type == 'Полоса') {
        let cost =
          props.cur === 'rub'
            ? parseFloat(item.cntRUB)
            : props.cur === 'usd'
            ? parseFloat(item.cntUSD)
            : props.cur === 'eur'
            ? parseFloat(item.cntEUR)
            : 1;

        res += parseFloat(
          (parseFloat(item.he) * parseFloat(item.le) * cost).toFixed(2)
        );
      } else {
        if (item.sum) res += parseFloat(item.sum);
      }
    });
    return res.toFixed(2);
  };

  const deleteGood = item => {
    setBasket(basket.filter(i => i.ps !== item.ps));
    props.deleteGood(item);
  };
  const deleteAll = () => {
    props.deleteAll();
    setBasket([]);
  };
  const onClickOrder = () => {
    if (props.isAuth) {
      setVisibleModal(true);
    } else {
      setVisibleModal(true);
    }
  };

  const orderOk = e => {
    setVisibleModal(false);
  };

  let style = '';
  let buttonStyle = '';
  if (!isTablet && isMobile) style = '-basket-mobile';
  if (isMobile) buttonStyle = '-button-mobile';

  return (
    <div className="basket">
      <OrderModal
        visible={visibleModal}
        onCancel={() => setVisibleModal(false)}
        onOk={orderOk}
      />
      <BackArrow history={props.history} />

      <div className={`basket__f-line ${style}`}>
        <h1>Корзина</h1>
        <Valute />
      </div>

      <div className="basket__items">
        {basket.length > 0 ? (
          basket.map(item => {
            return (
              <BasketItem
                setBasket={setBasket}
                key={item.ps}
                basket={basket}
                cur={props.cur}
                item={item}
                type={item.type}
                addGood={props.addGood}
                deleteGood={deleteGood}
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
            <p>Итого шт.: {basket.length}</p>
            <p>
              Итого м<sup>2</sup>: {all_kw}
            </p>
            <p>Итого : {all_sum} ₽</p>
          </div>
        </div>
        <div className="basket__buttons">
          <div
            className={`basket__button ${buttonStyle} -hovered`}
            onClick={deleteAll}
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
