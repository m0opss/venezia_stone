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
        ).toFixed(0)
      );
    } else {
      setSum((kw * parseFloat(pr)).toFixed(0));
    }
  }, [cnt, kw, sum]);

  const onBlurVal = e => {
    setKw(
      (
        Math.ceil(
          parseFloat(e.target.value) /
            (parseFloat(props.item.le) * parseFloat(props.item.he))
        ) *
        parseFloat(props.item.le) *
        parseFloat(props.item.he)
      ).toFixed(3)
    );
  };

  const onChangeVal = e => {
    if (e.target.id == 'cnt') {
      let val = e.target.value;
      val = Math.ceil(parseFloat(val));

      if (val > parseFloat(props.item.kolvo)) {
        val = parseFloat(props.item.kolvo);
      }
      setKw(
        (parseFloat(props.item.le) * parseFloat(props.item.he) * val).toFixed(3)
      );
      setCnt(val);
    } else {
      let tmp = parseFloat(e.target.value);
      if (tmp > parseFloat(props.item.os)) {
        tmp = parseFloat(props.item.os);
      }
      setKw(tmp);
      setCnt(
        Math.ceil(tmp / (parseFloat(props.item.le) * parseFloat(props.item.he)))
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
        <p>{props.item.kw ? props.item.kw : 0}</p>
      </div>
      <div className="table-row__item table-row__item_l">
        <p>{props.item.os}</p>
      </div>
      <div className="table-row__item table-row__item_l">
        <p>{props.item.kolvo ? props.item.kolvo : 0}</p>
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
              onBlur={onBlurVal}
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
            max={props.item.kolvo}
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
