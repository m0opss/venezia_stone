import React from 'react';
import lamp from 'images/lamp.png';
import book from 'images/book.png';

import Valute from 'components/Valute/Valute';
import ButtonsPanel from 'components/4lvl/ButtonsPanel';
import Slider from 'react-slick';
import like from 'images/like.png';
import basket_icon from 'images/basket_icon.png';
import './OtherItemMobile.scss';

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
          <img src={like} />
          <img src={basket_icon} />
        </div>
      </div>
    </div>
  );
};

const OtherItemTablet = props => {
  const [_item, setItem] = React.useState({'prs': []});
  const [selectedEl, setSelectedEl] = React.useState({});

  React.useEffect(() => {
    let isSubscr = true;
    if (!(Object.entries(props.item).length === 0 && props.item.constructor) === Object && isSubscr) {
      setItem(props.item);
      setSelectedEl(item.prs[0]);
    }
    return () => (isSubscr = false);
  });
  let im = 'https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg';
  let item = {
    city: 'Cfyrn-Gtnth,ehu',
    cnt: 12312,
    S: 12312.12,
    cost: 1231
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };
  return (
    <div className="slab-item-mobile">
      <div className="slab-item-mobile__main-title">{selectedEl.bl}</div>
      <ButtonsPanel />
      <Slider {...settings}>
                
      {_item.prs.map(item => (
          <div className="slab-item-carousel__item" selectItem={setSelectedEl}>
            <img src="https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg" />
          </div>
        ))}
      </Slider>
      <div className="slab-item-mobile__main">
        <div className="slab-item-info__options">
          <img src={lamp} />
          <img src={book} />
        </div>
        <div className="slab-item-mobile__main-img">
          {/* <img src={selectedEl.photobl} /> */}
          <img src="https://storage.yandexcloud.net/venezia-photo/materials/Granit.jpg" />
        </div>
      </div>

      <div className="slab-item-mobile__options-group">
        <div className=""></div>
        <Valute />
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
