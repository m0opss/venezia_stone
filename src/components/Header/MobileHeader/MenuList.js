import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'antd';

import authActions from 'actions/authActions';
import filterActions from 'actions/filterActions';
import MobileAuth from './MobileAuth';
import Auth from '../TopLine/AccountButton/UnauthoredAccountButton/Auth/Auth';

import './MobileHeader.scss';
import { TopFilter } from '../../Filter/TopFilter';

function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}
const createUserName = arr => {
  let userName = '';
  Object.keys(arr).map(name => {
    if (arr[name] != null && arr[name] != 'null' && arr[name] != '') {
      if (name === 'last') userName += ucFirst(arr[name]) + ' ';
      else {
        if (arr[name][0]) userName += arr[name][0].toUpperCase() + '. ';
      }
    }
  });
  return userName;
};

const MenuList = props => {
  const { setFilterParam, isAuth, setToken, setAuth, ...other } = props;

  const [isReg, setIsReg] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const [email, setEmail] = React.useState(null);
  const [first_name, setFName] = React.useState(null);
  const [last_name, setLName] = React.useState(null);
  const [middle_name, setMName] = React.useState(null);
  const [user_name, setUserName] = React.useState(null);

  React.useEffect(() => {
    setEmail(
      localStorage.getItem('email') != null ? localStorage.getItem('email') : ''
    );
    setFName(
      localStorage.getItem('first_name') != null
        ? localStorage.getItem('first_name')
        : ''
    );
    setLName(
      localStorage.getItem('last_name') != null
        ? localStorage.getItem('last_name')
        : ''
    );
    setMName(
      localStorage.getItem('middle_name') != null
        ? localStorage.getItem('middle_name')
        : ''
    );
    let name;
    if (
      createUserName({
        last: last_name,
        first: first_name,
        middle: middle_name
      }) == ''
    ) {
      name = email;
    } else {
      name = createUserName({
        last: last_name,
        first: first_name,
        middle: middle_name
      });
    }
    setUserName(name);
  });

  const onExitModal = () => {
    setAuth(false);
    setToken('');
    localStorage.removeItem('last_name');
    localStorage.removeItem('basket');
    localStorage.removeItem('middle_name');
    localStorage.removeItem('activeFilters');
    localStorage.removeItem('groups');
    localStorage.removeItem('first_name');
    localStorage.removeItem('selectedFavourite');
    localStorage.removeItem('activeFieldKeys');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('items');
    localStorage.removeItem('searchData');
  };
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
            <p style={{ color: '#c98505', marginBottom: 0 }}>{user_name}</p>
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
      <TopFilter
        activeFields={props.active_fields}
        upper_izd={props.upper_izd}
        setUpper={props.setUpper}
        setActiveFields={props.setActiveFields}
      />
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
    isAuth: store.auth_data.isAuth,
    active_fields: store.filter_data.activeFields,
    upper_izd: store.filter_data.upper_izd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuth: data => {
      dispatch(authActions.setAuth(data));
    },
    setToken: data => {
      dispatch(authActions.setToken(data));
    },
    setUpper: data => {
      dispatch(filterActions.setUpper(data));
    },
    setActiveFields: data => {
      dispatch(filterActions.setActiveFields(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
