import React, { useEffect } from 'react';

import RenderBasketItem from './RenderBasketItem';
import RenderIzbrItem from './RenderIzbrItem';

import './BasketItem.scss';

const BasketItem = props => {
  const [kw, setKw] = React.useState(
    props.item.S ? parseFloat(props.item.S) : 0
  );
  const [cnt, setCnt] = React.useState(
    props.item.cnt ? parseFloat(props.item.cnt) : 0
  );
  const [sum, setSum] = React.useState('');

  const checkCur = () => {
    if (props.item.price) return props.item.price;
    if (props.cur === 'rub') return props.item.cntRUB;
    else if (props.cur === 'usd') return props.item.cntUSD;
    else if (props.cur === 'eur') return props.item.cntEUR;
  };

  useEffect(() => {
    let pr = checkCur();
    if (pr == 'По запросу') {
      setSum('По запросу');
    } else {
      if (
        props.type != 'Плитка' &&
        props.type != 'Слэбы' &&
        props.type != 'Полоса'
      ) {
        setSum(
          (
            parseFloat(props.item.le) *
            parseFloat(props.item.he) *
            pr *
            cnt
          ).toFixed(2)
        );
      } else {
        if (props.type == 'Слэбы' || props.type == 'Полоса') {
          if (props.item.sco) {
            console.log('sco', props.item.sco);
            setSum(
              (
                (parseFloat(props.item.le) * parseFloat(props.item.he) -
                  parseFloat(props.item.sco)) *
                pr
              ).toFixed(2)
            );
          } else {
            console.log('sco==================', cnt);
            setSum(
              (
                parseFloat(props.item.le) *
                parseFloat(props.item.he) *
                pr
              ).toFixed(2)
            );
          }
        } else {
          setSum((kw * pr).toFixed(2));
        }
      }
    }
    if (props.basket) {
      let newBasket = [...props.basket];
      let item = newBasket.find(x => x.ps === props.item.ps);
      item.S = kw;
      item.cnt = cnt;
      item.sum = sum;
      props.setBasket(newBasket);
    }
  }, [cnt, kw, sum]);

  const onChangeVal = e => {
    if (e.target.id == 'cnt') {
      let val = e.target.value;
      val = Math.ceil(parseFloat(val));
      setCnt(val);
      setKw(parseFloat(props.item.le) * parseFloat(props.item.he) * val);
    } else {
      setKw(e.target.value);
      setCnt(
        // (parseFloat(props.item.le) * parseFloat(props.item.he))
        Math.ceil(
          parseFloat(e.target.value) /
            (parseFloat(props.item.le) * parseFloat(props.item.he))
        )
      );
    }
  };
  if (props.kind == 'izbr') {
    console.log(123123, props.item);
    return (
      <RenderIzbrItem
        link={props.link}
        os={props.item.kw}
        kind={props.kind}
        key={props.item.ps}
        item={props.item}
        id={props.item.ps}
        cnt={cnt}
        kw={kw}
        sum={sum}
        cur={props.cur}
        deleteGood={props.deleteGood}
        onChangeVal={onChangeVal}
      />
    );
  }
  console.log(2222, props.item);
  return (
    <RenderBasketItem
      link={props.link}
      os={props.item.kw}
      kind={props.kind}
      key={props.item.ps}
      item={props.item}
      id={props.item.ps}
      type={props.type}
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
