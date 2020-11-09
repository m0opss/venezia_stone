import React, { useEffect } from 'react';

import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';


const OtherTableRow = props => {
  const [kw, setKw] = React.useState(0);
  const [cnt, setCnt] = React.useState(0);
  const [sum, setSum] = React.useState(0);

  useEffect(() => {
    console.log(props.item)
    if (props.type != 'Плитка' ) {
      let pr;
      if (props.cur === 'rub') pr = props.item.cntRUB;
      else if (props.cur === 'usd') pr = props.item.cntUSD;
      else if (props.cur === 'eur') pr = props.item.cntEUR;
      setSum( parseFloat(props.item.le)*parseFloat(props.item.he) * pr * cnt);
    } else {
      setSum(kw * cnt);
    } 
  });

  const onChangeVal = e => {
    console.log(e.target.value)
    if (e.target.id == 'cnt') {
      setCnt(e.target.value);
      setKw(parseFloat(props.item.le)*parseFloat(props.item.he)*parseFloat(e.target.value));
    } else {
      setKw(e.target.value);
      setCnt();
    }
  };

  return (
    <div className="good-items-table__item ">
      <div className="table-row__item table-row__item_l">
        <p>{props.item.sklad}</p>
      </div>
      <div className="table-row__item table-row__item_l">
        <p>
          {props.cur === 'rub'
            ? `${props.item.cntRUB}₽`
            : props.cur === 'usd'
            ? `${props.item.cntUSD}$`
            : props.cur === 'eur'
            ? `${props.item.cntEUR}€`
            : ''}
        </p>
      </div>
      <div className="table-row__item">
        <p>{props.item.os}</p>
      </div>
      <div className="table-row__item">
        <p>{props.item.ossht ? props.item.ossht : '-'}</p>
      </div>
      <div className="table-row__item table-row__item_count-panel">
        <div className="table-count-input">
          {props.type == 'Плитка' ? (
            <input
              id="kw"
              type="number"
              min="0"
              max={props.item.os}
              step="0.01"
              defaultValue={kw}
              style={{ borderBottom: '1px solid black' }}
              onChange={onChangeVal}
            />
          ) : props.type == 'Ступени' ? (
            <input
              id="kw"
              type="number"
              defaultValue="0"
              disabled
              style={{ color: 'gray' }}
            />
          ) : (
            <p>-</p>
          )}
        </div>
        <div className="table-count-input">
          <input
            id="cnt"
            type="number"
            step="1"
            min="0"
            max={props.item.ossht}
            defaultValue={cnt}
            style={{ borderBottom: '1px solid black' }}
            onChange={onChangeVal}
          />
        </div>
        <div className="table-row__item">
          <p>{sum}</p>
        </div>
      </div>
      {props.isAuth ? (
        <div className="table-row__item good-items-table__title-icons">
          <ItemAddIzbr item={props.item} />
        </div>
      ) : (
        <></>
      )}
      <div className="table-row__item good-items-table__title-icons">
        <ItemAddBasket item={props.item} kw={kw} cnt={cnt}/>
      </div>
    </div>
  );
};
export default OtherTableRow;
