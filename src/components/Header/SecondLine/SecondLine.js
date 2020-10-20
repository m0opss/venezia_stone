import React from 'react';

import { Link, withRouter } from 'react-router-dom';

import './SecondLine.scss';
import 'antd/dist/antd.css';

import find from 'images/find.png';
import searchClear from 'images/searchClear.png';

const Search = props => {
  return (
    <div className="second-line__search">
      <input
        placeholder="Поиск"
        defaultValue={props.searchVal}
        onChange={props.onChangeSearch}
      />
      <img src={find} alt="" />
      <img src={searchClear} alt="" />
    </div>
  );
};

const Burger = props => {
  return (
    <>
      <div
        id="0"
        className="second-line__filter-button"
        onClick={props.setFilterParam}
      >
        Слебы
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
  const [searchVal, setSearchVal] = React.useState('');
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
      <Search searchVal={searchVal} onChangeSearch={onChangeSearch} />
    </div>
  );
};
export default withRouter(SecondLine);
