import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'antd';

import authActions from 'actions/authActions';

import MobileAuth from './MobileAuth';
import Auth from '../TopLine/AccountButton/UnauthoredAccountButton/Auth/Auth';

import './MobileHeader.scss';

const MenuList = props => {
  const { setFilterParam, isAuth, setToken, setAuth, ...other } = props;

  const [isReg, setIsReg] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const onExitModal = () => {
    setAuth(false);
    setToken('');
  };


  const burger = [
    'Слэбы',
    'Полоса',
    'Плитка',
    'Ступени',
    'Брусчатка',
    'Мозайка из камня',
    'Бордюр',
    'Прочее'
  ];

  const menu = (
    <Menu.Item key="1">
      <Auth isReg={isReg} setIsReg={setIsReg} setVisible={setVisible} />
    </Menu.Item>
  );

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
          <Menu.Item {...other} key="21"></Menu.Item>
          <MobileAuth
            visible={visible}
            setVisible={setVisible}
            setIsReg={setIsReg}
            title={props.title}
            menuList={menu}
          >
            <Menu.Item {...other} key="21">
              Войти
            </Menu.Item>
          </MobileAuth>
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
