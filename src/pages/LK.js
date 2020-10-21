import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import authActions from 'actions/authActions';
import PersonalData from 'components/LK/PD'

import './LK.scss';


const Izbrannoe = props => {
  return <div className="lk__izbrannoe"></div>;
};

const WatchHistori = props => {
  return <div className="lk__history"></div>;
};

const LK = props => {
  let pd = false;
  let h = false;
  let i = false;
  let modul, title;

  if (props.match.url === '/personal-data') {
    pd = true;
    modul = <PersonalData user_info={props.user_info} />;
    title = <>Персональные данные</>;
  }
  if (props.match.url === '/history') {
    h = true;
    modul = <WatchHistori />;
    title = <>История просмотра</>;
  }
  if (props.match.url === '/izbrannoe') {
    i = true;
    modul = <Izbrannoe />;
    title = <>Избранное</>;
  }

  const onExitModal = () => {
    console.log('exit');
    props.setAuth(false);
    props.setToken('');
  };

  if (props.isAuth) {
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
    auth_token: store.auth_data.auth_token,
    isAuth: store.auth_data.isAuth,
    user_info: store.user_data.user_info
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
