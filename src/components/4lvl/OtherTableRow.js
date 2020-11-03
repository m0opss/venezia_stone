import React from 'react';

import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';

const OtherTableRow = props => {
  console.log(props.item);
  const [type, setType] = React.useState(props.type);
  const [kw, setKw] = React.useState(1);
  const [cnt, setCnt] = React.useState(1);
  const [sum, setSum] = React.useState(1);

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
          {type == 'Плитка' ? (
            <input
              cnt="kw"
              type="number"
              min="0"
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
            defaultValue={cnt}
            style={{ borderBottom: '1px solid black' }}
            onBlur={onChangeVal}
          />
        </div>
        <div className="table-row__item">
          <p>{sum}₽</p>
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
