import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import authActions from 'actions/authActions';

import './LK.scss';
import Title from 'antd/lib/skeleton/Title';

const PersonalData = props => {
  return ( 
  <div className="">
    
  </div>);
};
const Izbrannoe = props => {
  return <div className="">izbr</div>;
};
const WatchHistori = props => {
  return <div className="">history</div>;
};

const LK = props => {
  let pd = false;
  let h = false;
  let i = false;
  let modul, title;

  if (props.match.url === '/personal-data') {
    pd = true;
    modul = <PersonalData />;
    title = <h1>Персональные данные</h1>
  }
  if (props.match.url === '/history') {
    h = true;
    modul = <WatchHistori />;
    title = <h1>История просмотра</h1>
  }
  if (props.match.url === '/izbrannoe') {
    i = true;
    modul = <Izbrannoe />;
    title = <h1>Избранное</h1>
  }

  const onExitModal = () => {
    console.log('exit');
    props.setAuth(false);
  };

  if (!props.isAuth) {
    return (
      <div className="lk-container">
        <div className="lk-top">
          <h1>{title}</h1>
          <ul className="lk__navbar">
            <li className={pd ? 'active' : ''}>
              <Link to="/personal-data">Персональные данные</Link>
            </li>
            <li className={h ? 'active' : ''}>
              <Link to="/history">История просмотров</Link>
            </li>
            <li className={i ? 'active' : ''}>
              <Link to="/izbrannoe">Избранное</Link>
            </li>
            <li onClick={onExitModal} style={{ cursor: 'pointer' }}>
              Выйти
            </li>
          </ul>
        </div>

        {modul}
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = store => {
  return {
    auth_token: store.isAuth.auth_token,
    isAuth: store.isAuth.isAuth
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

export default connect(mapStateToProps, mapDispatchToProps)(LK);
