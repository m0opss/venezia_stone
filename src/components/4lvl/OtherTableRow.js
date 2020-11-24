import React, { useEffect } from 'react';

import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';

const OtherTableRow = props => {
  const [kw, setKw] = React.useState(0);
  const [cnt, setCnt] = React.useState(0);
  const [sum, setSum] = React.useState(0);

  useEffect(() => {
    let pr;
    if (props.cur === 'rub') pr = props.item.cntRUB;
    else if (props.cur === 'usd') pr = props.item.cntUSD;
    else if (props.cur === 'eur') pr = props.item.cntEUR;
    if (props.type != 'Плитка') {
      setSum(
        (
          parseFloat(props.item.le) *
          parseFloat(props.item.he) *
          parseFloat(pr) *
          cnt
        ).toFixed(2)
      );
    } else {
      setSum((kw * parseFloat(pr)).toFixed(2));
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
        Math.ceil(
          parseFloat(e.target.value) /
            (parseFloat(props.item.le) * parseFloat(props.item.he))
        )
      );
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
            ? `${
                props.item.cntRUB == 'По запросу'
                  ? props.item.cntRUB
                  : `${props.item.cntRUB}₽`
              }`
            : props.cur === 'usd'
            ? `${
                props.item.cntUSD == 'По запросу'
                  ? props.item.cntUSD
                  : `${props.item.cntUSD}$`
              }`
            : props.cur === 'eur'
            ? `${
                props.item.cntEUR == 'По запросу'
                  ? props.item.cntEUR
                  : `${props.item.cntEUR}€`
              }`
            : ''}
        </p>
      </div>
      <div className="table-row__item">
        <p>{props.item.os}</p>
      </div>
      <div className="table-row__item">
        <p>{props.item.kolvo}</p>
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
              value={kw}
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
            value={cnt}
            style={{ borderBottom: '1px solid black' }}
            onChange={onChangeVal}
          />
        </div>
        <div className="table-row__item">
          <p>{sum != NaN ? sum : 0}</p>
        </div>
      </div>
      {props.isAuth ? (
        <div className="table-row__item good-items-table__title-icons">
          <ItemAddIzbr
            item={{ ...props.item, type: props.type, S: kw, cnt: cnt }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="table-row__item good-items-table__title-icons">
        <ItemAddBasket
          item={{ ...props.item, type: props.type, S: kw, cnt: cnt }}
        />
      </div>
    </div>
  );
};
export default OtherTableRow;
