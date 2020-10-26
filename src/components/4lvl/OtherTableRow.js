import React from 'react';

import like from 'images/like-4lvl.png';
import basket from 'images/basket-4lvl.png';

const OtherTableRow = props => {
  const [type, setType] = React.useState('as');
  const [S, setS] = React.useState(type == 'plitka' ? '' : '-');
  const [cnt, setCnt] = React.useState('');
  const [sum, setSum] = React.useState(0);

  return (
    <div className="good-items-table__item ">
      <div className="table-row__item table-row__item_l">
        <p>{props.item.skl}</p>
      </div>
      <div className="table-row__item table-row__item_l">
        <p>{props.item.cost}</p>
      </div>
      <div className="table-row__item">
        <p>{props.item.s}</p>
      </div>
      <div className="table-row__item">
        <p>{props.item.cnt}</p>
      </div>
      <div className="table-row__item table-row__item_count-panel">
        <div className="table-count-input">
          {type == 'plitka' ? (
            <input
              type="number"
              defaultValue={S}
              step="0.01"
              style={{ borderBottom: '1px solid black' }}
            />
          ) : (
            <p>-</p>
          )}
        </div>
        <div className="table-count-input">
          <input
            type="number"
            step="1"
            min='0'
            defaultValue={cnt}
            style={{ borderBottom: '1px solid black' }}
          />
        </div>
        <div className="table-row__item">
          <p>{sum}₽</p>
        </div>
      </div>

      <div className="table-row__item good-items-table__title-icons">
        <img src={like} />
      </div>
      <div className="table-row__item good-items-table__title-icons">
        <img src={basket} />
      </div>
    </div>
  );
};
export default OtherTableRow