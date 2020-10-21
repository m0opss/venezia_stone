import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'antd';

import authActions from 'actions/authActions';

import './MobileHeader.scss';

const MenuList = props => {
  const { setFilterParam, isAuth, setToken, setAuth, ...other } = props;

  const onExitModal = () => {
    setAuth(false);
    setToken('');
  };

  const burger = [
    'Слебы',
    'Полоса',
    'Плитка',
    'Ступени',
    'Брусчатка',
    'Мозайка из камня',
    'Бордюр',
    'Прочее'
  ];

  return (
    <>
      {isAuth ? (
        <>
          <Menu.Item {...other} key="10">
            <p style={{ color: '#c98505', marginBottom: 0 }}>
              Иванов Иван Иванович
            </p>
          </Menu.Item>
          <Menu.Item {...other} key="11">
            <Link to="/personal-data">Персональные данные</Link>
          </Menu.Item>
          <Menu.Item {...other} key="12">
            <Link to="/history">История просмотров</Link>
          </Menu.Item>
          <Menu.Item {...other} key="13">
            <Link to="/izbrannoe">Избранное</Link>
          </Menu.Item>
          <Menu.Item {...other} key="14">
            <div
              className="exit-button"
              style={{ cursor: 'pointer' }}
              onClick={onExitModal}
            >
              Выйти
            </div>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item {...other} key="21">
            <div
              className="second-line__filter-button"
              style={{ cursor: 'pointer' }}
              onClick={onExitModal}
            >
              Войти
            </div>
          </Menu.Item>
          <Menu.Item {...other} key="22">
            <div
              className="second-line__filter-button"
              style={{ cursor: 'pointer' }}
              onClick={onExitModal}
            >
              Зарегистрироваться
            </div>
          </Menu.Item>
        </>
      )}
      <br />
      <br />
      {burger.map((title, index) => {
        return (
          <Menu.Item {...other} key={`${index}`}>
            <div
              id={`${index}`}
              className="second-line__filter-button"
              onClick={setFilterParam}
            >
              {title}
            </div>
          </Menu.Item>
        );
      })}
      <br />
      <br />
      <Menu.Item {...other} key="15">
        <Link to="/contacts">Контакты</Link>
      </Menu.Item>
    </>
  );
};

const mapStateToProps = store => {
  return {
    isAuth: store.auth_data.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuth: data => {
      dispatch(authActions.setAuth(data));
    },
    setToken: data => {
      dispatch(authActions.setToken(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
