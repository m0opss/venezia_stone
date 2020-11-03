import React from 'react';

import ColorRange from 'components/ColorRange/ColorRange';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import './OtherItemTablet.scss';
import ItemAddBasket from 'components/MyBasket/ItemAddBasket';
import ItemAddIzbr from 'components/MyBasket/ItemAddIzbr.js';

const GroupItem = props => {
  const [S, setS] = React.useState(0);
  const [cnt, setCnt] = React.useState(0);
  const [sum, setSum] = React.useState(0);

  return (
    <div className="other-items-group__item">
      <div className="other-items-group__line">
        <p className="other-items-group_first-col -city">{props.item.city}</p>
        <div className="other-items-group__centered">
          <p>шт</p>
          <p>
            м<sup>2</sup>
          </p>
        </div>
      </div>
      <div className="other-items-group__line">
        <p className="other-items-group_first-col">Наличие</p>
        <div className="other-items-group__centered">
          <p>{props.item.cnt}</p>
          <p>{props.item.S}</p>
        </div>
      </div>
      <div className="other-items-group__line">
        <p className="other-items-group_first-col">Заказать</p>
        <div className="other-items-group__centered">
          <input type="number" min="0" defaultValue={cnt} step="1" />
          <input type="number" min="0" defaultValue={S} step="0.01" />
        </div>
      </div>
      <div className="other-items-group__line">
        <p className="other-items-group_first-col">
          Цена за м<sup>2</sup>
        </p>
        <div className="other-items-group__centered">
          <p>{props.item.cost} ₽</p>
          <p></p>
        </div>
      </div>
      <div className="other-items-group__line ">
        <p className="other-items-group_first-col">Стоимость</p>
        <div className="other-items-group__centered">
          <p>{sum} ₽</p>
          <p></p>
        </div>
      </div>
      <div className="other-items-group__line basket-item__buttons">
        <div className="">
          <ItemAddIzbr item={props.item} />
          <ItemAddBasket item={props.item} />
        </div>
      </div>
    </div>
  );
};

const OtherItemTablet = props => {
  const [selectedEl, setSelectedEl] = React.useState({});
  React.useEffect(() => {
    let isSubscr = true;
    if (props.item.prs && isSubscr) {
      setSelectedEl(props.item.prs[0]);
    }
    return () => (isSubscr = false);
  });
  let colors = [
    '#2C1D02',
    '#402A02',
    '#402A02',
    '#402A02',
    '#402A02',
    '#402A02',
    '#402A02',
    '#402A02',
    '#402A02'
  ];
  let im = 'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg';
  let item = {
    city: 'Cfyrn-Gtnth,ehu',
    cnt: 12312,
    S: 12312.12,
    cost: 1231
  };
  return (
    <div className="slab-item">
      <div className="slab-item-info">
        <div className="slab-item-info__top slab-item-info__top-tablet">
          <ButtonsPanel />
        </div>
        <div className="slab-item-info__bottom">
          <div className="slab-item-info__left-block slab-item-info__left-block_other slab-item-info__left-block_other-tablet">
            <h1 className="slab-item-info__title">TAN BROWN 30 мм</h1>
            <div className="slab-item-info__parameters">
              <p>Общая площадь</p>
              <p>Количество</p>
              <p>Сумма</p>
            </div>
          </div>
          <div className="slab-item-info__slab-img">
            <img src={im} />
            <ColorRange colors={colors} />
          </div>
        </div>
      </div>
      <div className="other-items-group">
        <GroupItem item={item} />
        <GroupItem item={item} />
        <GroupItem item={item} />
        <GroupItem item={item} />
        <GroupItem item={item} />
        <GroupItem item={item} />
        <GroupItem item={item} />
        <GroupItem item={item} />
        <GroupItem item={item} />
        <GroupItem item={item} />
      </div>
    </div>
  );
};

export default OtherItemTablet;
