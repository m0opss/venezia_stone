import React, { useEffect } from 'react';

import RenderBasketItem from './RenderBasketItem';

import './BasketItem.scss';


const BasketItem = props => {
  const [kw, setKw] = React.useState(
    props.item.S ? parseFloat(props.item.S) : 0
  );
  const [cnt, setCnt] = React.useState(
    props.item.cnt ? parseFloat(props.item.cnt) : 0
  );
  const [sum, setSum] = React.useState(0);

  const checkCur = () => {
    if (props.cur === 'rub') return props.item.cntRUB;
    else if (props.cur === 'usd') return props.item.cntUSD;
    else if (props.cur === 'eur') return props.item.cntEUR;
  };

  useEffect(() => {
    let pr = checkCur();
    if (props.type != 'Плитка') {
      setSum(parseFloat(props.item.le) * parseFloat(props.item.he) * pr * cnt);
    } else {
      setSum(kw * pr);
    }
    let newBasket = [...props.basket];
    let item = newBasket.find(x => x.ps === props.item.ps);
    item.S = kw;
    item.cnt = cnt;
    item.sum = sum;
    props.setBasket(newBasket);
  }, [cnt, kw, sum]);

  const onChangeVal = e => {
    if (e.target.id == 'cnt') {
      let val = e.target.value;
      val = Math.ceil(parseFloat(val));
      setCnt(val);
      setKw(
        // parseFloat(props.item.le) *
        //   parseFloat(props.item.he) *
        2 * 3 * val
      );
    } else {
      setKw(e.target.value);
      setCnt(
        // (parseFloat(props.item.le) * parseFloat(props.item.he))
        Math.ceil(parseFloat(e.target.value) / (2 * 3))
      );
    }
  };

  return (
    <RenderBasketItem
      key={props.item.ps}
      item={props.item}
      id={props.item.ps}
      type={props.item.type}
      cnt={cnt}
      kw={kw}
      sum={sum}
      cur={props.cur}
      deleteGood={props.deleteGood}
      onChangeVal={onChangeVal}
    />
  );
};

export default BasketItem;
