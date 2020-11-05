import React, { useEffect } from 'react';

import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';
import { Link } from 'react-router-dom';

const OtherTableRow = props => {
  const [kw, setKw] = React.useState(props.type == 'Плитка' ? 0 : undefined);
  const [cnt, setCnt] = React.useState(0);
  const [sum, setSum] = React.useState(0);

  useEffect(() => {
    if (kw == undefined) {
      let pr;
      if (props.cur === 'rub') pr = props.item.cntRUB;
      else if (props.cur === 'usd') pr = props.item.cntUSD;
      else if (props.cur === 'eur') pr = props.item.cntEUR;
      setSum(cnt * pr);
    } else {
      setSum(kw * cnt);
    }
  });

  const onChangeVal = e => {
    if (e.target.id == 'cnt') {
      setCnt(e.target.value);
    } else {
      setKw(e.target.value);
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
        <p>{props.item.ossht}</p>
      </div>
      <div className="table-row__item table-row__item_count-panel">
        <div className="table-count-input">
          {props.type == 'Плитка' ? (
            <input
              cnt="kw"
              type="number"
              min="0"
              max={parseFloat(props.item.os)}
              step="0.01"
              defaultValue={kw}
              style={{ borderBottom: '1px solid black' }}
              onBlur={onChangeVal}
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
            max={parseFloat(props.item.ossht)}
            defaultValue={cnt}
            style={{ borderBottom: '1px solid black' }}
            onBlur={onChangeVal}
          />
        </div>
        <div className="table-row__item">
          <p>{sum}</p>
        </div>
      </div>

      <div className="table-row__item good-items-table__title-icons">
        <ItemAddIzbr item={props.item} />
      </div>
      <div className="table-row__item good-items-table__title-icons">
        <ItemAddBasket item={props.item} />
      </div>
    </div>
  );
};
export default OtherTableRow;
