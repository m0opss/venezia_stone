import React from 'react';

import BasketItem from 'components/MyBasket/BasketItem';

import './MyBasket.scss';
import { isMobile, isTablet } from 'react-device-detect';

const MyBasket = () => {
  const [type, setType] = React.useState(true);

  const [rub, set_rub] = React.useState(true);
  const [usd, set_usd] = React.useState(false);
  const [eur, set_eur] = React.useState(false);
  const [state, setState] = React.useState({
    rub: true,
    usd: false,
    eur: false
  });


  const onClickOrder = () => {
    if (props.isAuth) {
      
    }
  } 

  const onToggleValute = e => {
    console.log(state);
  };

  let style = ''
  let buttonStyle = ''
  if(!isTablet && isMobile) style = '-basket-mobile'
  if(isMobile) buttonStyle = '-button-mobile'
  return (
    <div className="basket">
      <div className={`basket__f-line ${style}`}>
        <h1>Корзина</h1>
        <div className="f-line__valuta">
          <span
            id="rub"
            className={rub ? '-active' : ''}
            onClick={onToggleValute}
          >
            RUB
          </span>
          <span
            id="usd"
            className={usd ? '-active' : ''}
            onClick={onToggleValute}
          >
            USD
          </span>
          <span
            id="eur"
            className={eur ? '-active' : ''}
            onClick={onToggleValute}
          >
            EUR
          </span>
        </div>
      </div>
      <div className="basket__items">
        <BasketItem kind='basket' type={true} />
        <BasketItem kind='basket' type={false} />
        <BasketItem kind='basket' type={false} />
        <BasketItem kind='basket' type={true} />
        <BasketItem kind='basket' type={true} />
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
          <div className={`basket__button ${buttonStyle} -hovered`}>Очистить все</div>
          <div 
            className={`basket__button ${buttonStyle} -hovered`} 
            onClick={onClickOrder}>
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
  };
};


export default connect(mapStateToProps)(MyBasket);