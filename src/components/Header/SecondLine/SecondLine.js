import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import Search from 'components/Search/Search'

import './SecondLine.scss';
import 'antd/dist/antd.css';




export const Burger = props => {
  return (
    <>
      <div
        id="0"
        className="second-line__filter-button"
        onClick={props.setFilterParam}
      >
        Слэбы
      </div>
      <div
        id="1"
        className="second-line__filter-button"
        onClick={props.setFilterParam}
      >
        Полоса
      </div>
      <div
        id="2"
        className="second-line__filter-button"
        onClick={props.setFilterParam}
      >
        Плитка
      </div>
      <div
        id="3"
        className="second-line__filter-button"
        onClick={props.setFilterParam}
      >
        Ступени
      </div>
      <div
        id="4"
        className="second-line__filter-button"
        onClick={props.setFilterParam}
      >
        Брусчатка
      </div>
      <div
        id="5"
        className="second-line__filter-button -double-w"
        onClick={props.setFilterParam}
      >
        Мозайка из камня
      </div>
      <div
        id="6"
        className="second-line__filter-button"
        onClick={props.setFilterParam}
      >
        Бордюр
      </div>
      <div
        id="7"
        className="second-line__filter-button"
        onClick={props.setFilterParam}
      >
        Прочее
      </div>
      <div className="second-line__filter-button">
        <Link to="/contacts">Контакты</Link>
      </div>
    </>
  );
};

const SecondLine = props => {
  const { match, history } = props;

  const setFilterParam = e => {
    console.log(e.target.id);
    history.push('/');
  };

  const onChangeSearch = e => {
    console.log(e.target.value);
  };

  return (
    <div className="second-line">
      <Burger setFilterParam={setFilterParam} />
      <Search  onChangeSearch={onChangeSearch} />
    </div>
  );
};
export default withRouter(SecondLine);
