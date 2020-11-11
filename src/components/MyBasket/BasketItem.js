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

  const cntS_mult = k => {
    let pr;
    if (props.cur === 'rub') pr = props.item.cntRUB;
    else if (props.cur === 'usd') pr = props.item.cntUSD;
    else if (props.cur === 'eur') pr = props.item.cntEUR;
    return (
      parseFloat(props.item.le) * parseFloat(props.item.he) * k * parseFloat(pr)
    );
  };

  useEffect(() => {
    if (props.type != 'Плитка') {
      setSum(cntS_mult(cnt).toFixed(2));
      // props.setCntSum([...props.cntSum, (2 * 3 * parseFloat(pr) * cnt).toFixed(2)])
    } else {
      // console.log(kw, cnt);
      // console.log(kw, cnt);
      setSum((kw * parseFloat(pr)).toFixed(2));
    }
  }, [cnt]);

  // props.setCntSum([...props.cntSum, sum])
  const onChangeVal = e => {
    if (e.target.id == 'cnt') {
      setCnt(parseFloat(e.target.value));
      setKw(
        // parseFloat(props.item.le) *
        //   parseFloat(props.item.he) *
        2 * 3 * parseFloat(e.target.value)
      );
    } else {
      setKw(e.target.value);
      setCnt(
        parseFloat(e.target.value) / 2 / 3
        // parseFloat(props.item.le) /
        // parseFloat(props.item.he)
      );
    }
    console.log(cnt, kw);
    props.setBasket([...props.basket, { ...props.item, cnd: cnt, S: kw }]);
  };

  return (
    <RenderBasketItem
      key={props.item.ps}
      item={props.item}
      id={props.item.ps}
      type={props.item.type}
      kw={props.kw}
      cur={props.cur}
      deleteGood={props.deleteGood}
      onChangeVal={onChangeVal}
      // editGood={props.editGood}
    />
  );
};

export default BasketItem;
