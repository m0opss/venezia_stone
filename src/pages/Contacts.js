import React, { Fragment, useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import vkIcon from '@iconify/icons-mdi/vk';
import facebookIcon from '@iconify/icons-mdi/facebook';
import telegramIcon from '@iconify/icons-mdi/telegram';
import viberIcon from '@iconify/icons-whh/viber';
import whatsappIcon from '@iconify/icons-whh/whatsapp';

import './Contacts.scss';

const AddressCard = props => {
  return (
    <div className="city-card">
      <div className="city-card__wrapper">
        <h1 className="city-card__city" id={props.city} onClick={props.onClick}>
          {props.city}
        </h1>
        <p className="address-card__address">{props.address}</p>
        <p className="address-card__sklad-address">{props.skladAddress}</p>
        <p className="address-card__tel">{props.tel}</p>
        <p className="address-card__time">{props.time}</p>
        <p className="address-card__email">{props.email}</p>
      </div>

      <div className="address-card__soc">
        <Link to="#">
          <Icon icon={viberIcon} color="#6F3FAA" width="1.5em" height="1.5em" />
        </Link>
        <Link to="#">
          <Icon icon={vkIcon} color="#4D76A1" width="1.5em" height="1.5em" />
        </Link>
        <Link to="#">
          <Icon
            icon={facebookIcon}
            color="#3B5998"
            width="1.5em"
            height="1.5em"
          />
        </Link>
        <Link to="#">
          <Icon
            icon={telegramIcon}
            color="#039BE5"
            width="1.5em"
            height="1.5em"
          />
        </Link>
        <Link to="#">
          <Icon
            icon={whatsappIcon}
            color="#4CAF50"
            width="1.5em"
            height="1.5em"
          />
        </Link>
      </div>
    </div>
  );
};
const Contacts = () => {
  const [center, setCenter] = React.useState([55.602576, 37.436086]);
  const [zoom, setZoom] = React.useState(3);
  const [active, setActive] = React.useState([55.602576, 37.436086]);

  useEffect(() => {
    setCenter(active);
  });

  const onSetCity = e => {
    setZoom(13);
    let list = document.getElementsByClassName('city-card__city')
    for (let i of list) {
      i.style.color = "black";
    }
    document.getElementById(e.target.id).style.color = '#be9344';
    if (e.target.id == 'Москва') {
      setActive([55.602576, 37.436086]);
    } else if (e.target.id == 'Краснодар') {
      setActive([45.055212, 39.293164]);
    } else if (e.target.id == 'Екатеринбург') {
      setActive([56.908104, 60.630532]);
    } else if (e.target.id == 'Санкт-Петербург') {
      setActive([59.869955, 30.49139]);
    } else if (e.target.id == 'Казань') {
      setActive([55.938667, 49.320851]);
    } else if (e.target.id == 'Крым') {
      setActive([45.389194, 33.993751]);
    }
  };

  return (
    <div className="contacts-container">
      <h1 className="contacts-h1">Контакты</h1>
      <div className="map">
        <YMaps>
          <Map
            width="100%"
            height="350px"
            state={{
              center: center,
              zoom: zoom
            }}
          >
            <Placemark geometry={[55.602576, 37.436086]} />
            <Placemark geometry={[45.055212, 39.293164]} />
            <Placemark geometry={[56.908104, 60.630532]} />
            <Placemark geometry={[59.869955, 30.49139]} />
            <Placemark geometry={[55.938667, 49.320851]} />
            <Placemark geometry={[45.389194, 33.993751]} />
          </Map>
        </YMaps>
      </div>
      <div className="city-cards">
        <AddressCard
          onClick={onSetCity}
          city="Москва"
          socLinks=""
          address={
            <p>
              Адрес:
              <br />
              г. Москва, поселение Сосенское, деревня Николо-Хованское, квартал
              № 3, вл1037с1
            </p>
          }
          skladAddress={
            <p>
              Cклад плитки:
              <br />
              г. Москва, п. Сосенское дер. Николо-Хованское
            </p>
          }
          tel={
            <p>
              Тел/факс:
              <br />
              +7 (499) 645-98-85
              <br />
              8 (800) 100-5-888
              <br />
              +7 (916) 800-10-66
            </p>
          }
          time={
            <p>
              График работы офиса: <br />
              пн-пт 9.00-18.00, сб 9.00-17.00
            </p>
          }
          email={
            <p>
              E-mail:
              <br />
              msk@veneziastone.com
            </p>
          }
        />
        <AddressCard
          onClick={onSetCity}
          city="Краснодар"
          address={
            <p>
              Адрес:
              <br />
              Краснодар, станица Старокорсунская, ул. Красная, 5А`
            </p>
          }
          socLinks=""
          tel={
            <p>
              Тел/факс:
              <br />
              +7 (861) 299-51-43
              <br />
              8 (800) 100-5-888
              <br />
              +7 (988) 460-56-83
            </p>
          }
          time={
            <p>
              График работы офиса: <br />
              пн-пт с 09.00 до 18.00
            </p>
          }
          email={
            <p>
              E-mail:
              <br />
              krd@veneziastone.com
            </p>
          }
        />
        <AddressCard
          onClick={onSetCity}
          city="Екатеринбург"
          socLinks=""
          address={
            <p>
              Адрес:
              <br />
              620057, Екатеринбург, ул. Таганская, 60
            </p>
          }
          tel={
            <p>
              Тел/факс:
              <br />
              +7 (343) 383-19-00
              <br />
              8 (800) 100-5-888
              <br />
              +7 (909) 000-52-40
            </p>
          }
          time={
            <p>
              График работы офиса: <br />
              пн-пт 9.00-18.00
            </p>
          }
          email={
            <p>
              E-mail:
              <br />
              ekb@veneziastone.com
            </p>
          }
        />
        <AddressCard
          onClick={onSetCity}
          city="Санкт-Петербург"
          socLinks=""
          address={
            <p>
              Адрес:
              <br />
              193079, СПб, Октябрьская Набережная, 104 корп.25
            </p>
          }
          tel={
            <p>
              Тел/факс:
              <br />
              +7 (812) 313-14-14
              <br />
              8 (800) 100-5-888
              <br />
              +7 (921) 383-82-87
            </p>
          }
          time={
            <p>
              График работы офиса: <br />
              пн-пт 9.00-18.00 сб 11.00-16.00
            </p>
          }
          email={
            <p>
              E-mail:
              <br />
              spb@veneziastone.com
            </p>
          }
        />
        <AddressCard
          onClick={onSetCity}
          city="Казань"
          socLinks=""
          address={
            <p>
              Адрес:
              <br />
              422700, Республика Татарстан, Высокогорский район, поселок
              железнодорожной станции Высокая Гора, ул. Чернышевского д.67
              (Станционная д.1)
            </p>
          }
          tel={
            <p>
              Тел/факс:
              <br />
              +7 (843) 249-03-01
              <br />
              8 (800) 100-58-88
              <br />
              +7 (987) 420-84-99
            </p>
          }
          time={
            <p>
              График работы офиса: <br />
              пн-пт 8:30-17:30
            </p>
          }
          email={
            <p>
              E-mail:
              <br />
              kzn@veneziastone.com
            </p>
          }
        />
        <AddressCard
          onClick={onSetCity}
          city="Крым"
          socLinks=""
          address={
            <p>
              Адрес:
              <br />
              Региональный представитель - Кармазин Денис Анатольевич
            </p>
          }
          tel={
            <p>
              Тел/факс:
              <br />
              +7 (978) 758-32-02
            </p>
          }
          email={
            <p>
              E-mail:
              <br />
              dkarmazin@veneziastone.com{' '}
            </p>
          }
        />
      </div>
    </div>
  );
};
export default Contacts;
