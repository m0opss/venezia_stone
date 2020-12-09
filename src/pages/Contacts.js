import React, { Fragment, useEffect } from 'react';
import { YMaps, Map, Placemark, RoutePanel } from 'react-yandex-maps';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Breadcrumb } from 'antd';
import vkIcon from '@iconify/icons-mdi/vk';
import facebookIcon from '@iconify/icons-mdi/facebook';
import telegramIcon from '@iconify/icons-mdi/telegram';
import viberIcon from '@iconify/icons-whh/viber';
import whatsappIcon from '@iconify/icons-whh/whatsapp';

import './Contacts.scss';
import { isMobile, isTablet } from 'react-device-detect';

const AddressCard = props => {
  const onRouteClick = e => {
    document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
    props.onClickRoute(props.address);
  };
  return (
    <div className="city-card">
      <div className="city-card__wrapper">
        <h1 className="city-card__city" id={props.city} onClick={props.onClick}>
          {props.city}
        </h1>
        <div>
          <p>
            Адрес:
            <br />
          </p>
          <p className="address-card__address" onClick={onRouteClick}>
            {props.address}
          </p>
        </div>
        <p className="address-card__sklad-address">{props.skladAddress}</p>
        <p className="address-card__tel">{props.tel}</p>
        <p className="address-card__time">{props.time}</p>
        <p className="address-card__email">{props.email}</p>
      </div>

      <div className="address-card__soc">
        <a href={props.socLinks} target="_blank">
          <Icon
            icon={whatsappIcon}
            color="#4CAF50"
            width="1.5em"
            height="1.5em"
          />
        </a>
      </div>
    </div>
  );
};
const Contacts = () => {
  const [center, setCenter] = React.useState([55.602576, 37.436086]);
  const [zoom, setZoom] = React.useState(3);
  const [active, setActive] = React.useState([55.602576, 37.436086]);
  const [route, setRoute] = React.useState('');
  const [route_active, setRouteActive] = React.useState(false);

  useEffect(() => {
    setCenter(active);
  });

  const onSetCity = e => {
    setZoom(13);
    let list = document.getElementsByClassName('city-card__city');
    for (let i of list) {
      i.style.color = 'black';
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
  const onClickRoute = str => {
    setRouteActive(true);
    setRoute(str);
  };
  const coordinates = [
    [55.602576, 37.436086],
    [45.055212, 39.293164],
    [56.908104, 60.630532],
    [59.869955, 30.49139],
    [55.938667, 49.320851],
    [45.389194, 33.993751]
  ];
  return (
    <div className="contacts-container">
      {isMobile && !isTablet ? (
        <></>
      ) : (
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
          <Breadcrumb.Item>Контакты</Breadcrumb.Item>
        </Breadcrumb>
      )}

      <h1 className="contacts-h1">Контакты</h1>
      <div className="map">
        <YMaps query={{ apikey: '1db1bd5b-a62b-4767-bcfe-cc05a08186a6' }}>
          <Map
            width="100%"
            height="350px"
            state={{
              center: center,
              zoom: zoom
            }}
          >
            {coordinates.map(coordinate => (
              <Placemark geometry={coordinate} />
            ))}

            {route_active ? (
              <RoutePanel
                defaultState={{
                  from: 'Москва, Льва Толстого 16',
                  to: 'метро Черемушки'
                }}
                state={{
                  from: 'Москва, Льва Толстого 16',
                  to: 'метро Черемушки'
                }}
                options={{ float: 'right' }}
              />
            ) : (
              <></>
            )}
          </Map>
        </YMaps>
      </div>
      <div className="city-cards">
        <AddressCard
          onClick={onSetCity}
          onClickRoute={onClickRoute}
          city="Москва"
          socLinks="https://api.whatsapp.com/send?phone=+79771005888"
          address="
              г. Москва, поселение Сосенское, деревня Николо-Хованское, квартал
              № 3, вл1037с1"
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
              <a href="tel:+74996459885">+7 (499) 645-98-85</a>
              <br />
              <a href="tel:88001005888">8 (800) 100-5-888</a>
              <br />
              <a href="tel:+79168001066">+7 (916) 800-10-66</a>
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
              <a href="mailto:mskb@veneziastone.com">msk@veneziastone.com</a>
            </p>
          }
        />
        <AddressCard
          onClick={onSetCity}
          onClickRoute={onClickRoute}
          city="Санкт-Петербург"
          socLinks="https://api.whatsapp.com/send?phone=+79771005888"
          address="193079, СПб, Октябрьская Набережная, 104 корп.25"
          tel={
            <p>
              Тел/факс:
              <br />
              <a href="tel:+78612995143">+7 (812) 313-14-14</a>
              <br />
              <a href="tel:88001005888">8 (800) 100-5-888</a>
              <br />
              <a href="tel:+79213838287">+7 (921) 383-82-87</a>
            </p>
          }
          time={
            <p>
              График работы офиса: <br />
              пн-пт 9.00-18.00, сб 11.00-16.00
            </p>
          }
          email={
            <p>
              E-mail:
              <br />
              <a href="mailto:spb@veneziastone.com">spb@veneziastone.com</a>
            </p>
          }
        />
        <AddressCard
          onClick={onSetCity}
          onClickRoute={onClickRoute}
          city="Краснодар"
          socLinks="https://api.whatsapp.com/send?phone=+79771005888"
          address="Краснодар, станица Старокорсунская, ул. Красная, 5А`"
          socLinks=""
          tel={
            <p>
              Тел/факс:
              <br />
              <a href="tel:+78612995143">+7 (861) 299-51-43</a>
              <br />
              <a href="tel:88001005888">8 (800) 100-5-888</a>
              <br />
              <a href="tel:+79884605683"> +7 (988) 460-56-83</a>
            </p>
          }
          time={
            <p>
              График работы офиса: <br />
              пн-пт 09.00-18.00
            </p>
          }
          email={
            <p>
              E-mail:
              <br />
              <a href="mailto:krd@veneziastone.com">krd@veneziastone.com</a>
            </p>
          }
        />
        <AddressCard
          onClick={onSetCity}
          onClickRoute={onClickRoute}
          city="Екатеринбург"
          socLinks="https://api.whatsapp.com/send?phone=+79771005888"
          address="620057, Екатеринбург, ул. Таганская, 60"
          tel={
            <p>
              Тел/факс:
              <br />
              <a href="tel:+73433831900">+7 (343) 383-19-00</a>
              <br />
              <a href="tel:88001005888">8 (800) 100-5-888</a>
              <br />
              <a href="tel:+79090005249">+7 (909) 000-52-40</a>
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
              <a href="mailto:ekb@veneziastone.com">ekb@veneziastone.com</a>
            </p>
          }
        />

        <AddressCard
          onClick={onSetCity}
          onClickRoute={onClickRoute}
          city="Казань"
          socLinks="https://api.whatsapp.com/send?phone=+79771005888"
          address="422700, Республика Татарстан, Высокогорский район, поселок железнодорожной станции Высокая Гора, ул. Чернышевского д.67
              (Станционная д.1)"
          tel={
            <div>
              Тел/факс:
              <br />
              <a href="tel:+78432490301">+7 (843) 249-03-01</a>
              <br />
              <a href="tel:88001005888">8 (800) 100-58-88</a>
              <br />
              <a href="tel:+79874208499"> +7 (987) 420-84-99</a>
            </div>
          }
          time={
            <p>
              График работы офиса: <br />
              пн-пт 8.30-17.30
            </p>
          }
          email={
            <p>
              E-mail:
              <br />
              <a href="mailto:kzn@veneziastone.com">kzn@veneziastone.com</a>
            </p>
          }
        />
        <AddressCard
          onClick={onSetCity}
          onClickRoute={onClickRoute}
          city="Крым"
          socLinks="https://api.whatsapp.com/send?phone=+79771005888"
          address="Региональный представитель - Кармазин Денис Анатольевич"
          tel={
            <div>
              Тел/факс:
              <br />
              <a href="tel:+79787583202">+7 (978) 758-32-02</a>
            </div>
          }
          email={
            <p>
              E-mail:
              <br />
              <a href="mailto:dkarmazin@veneziastone.com">
                dkarmazin@veneziastone.com
              </a>
            </p>
          }
        />
      </div>
    </div>
  );
};
export default Contacts;
