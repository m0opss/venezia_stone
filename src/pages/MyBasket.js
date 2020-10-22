import React from 'react';

import BasketItem from 'components/MyBasket/BasketItem'

import './MyBasket.scss';

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

  const onToggleValute = e => {
    console.log(state);
  };

  return (
    <div className="basket">
      <div className="basket__f-line">
        <h1>КОРЗИНА</h1>
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
        <BasketItem type={true} />
        <BasketItem type={false} />
      </div>
    </div>
  );
};
export default MyBasket;
