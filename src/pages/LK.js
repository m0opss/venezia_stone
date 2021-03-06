import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import authActions from 'actions/authActions';
import izbrActions from 'actions/izbrActions';
import userActions from 'actions/userActions';
import PersonalData from 'components/LK/PD';
import Izbrannoe from 'components/LK/Izbrannoe';
import BackArrow from 'components/BackArrow/BackArrow';
import WatchHistory from 'components/LK/WatchHistory';
import MyModal from '../components/Modal/Modal';

import './LK.scss';

import {
  MobileView,
  BrowserView,
  isMobile,
  isTablet
} from 'react-device-detect';

const LK = props => {
  let pd = false;
  let h = false;
  let i = false;
  let modul, title;
  const [visibleExitModale, setVisExModal] = React.useState(false);

  if (props.match.url === '/personal-data') {
    pd = true;
    modul = (
      <PersonalData
        token={props.auth_token}
        setUserInfo={props.setUserInfo}
        user_info={props.user_info}
      />
    );
    title = <>Персональные данные</>;
  }
  if (props.match.url === '/history') {
    h = true;
    modul = <WatchHistory token={props.auth_token} />;
    title = <>История просмотров</>;
  }
  if (props.match.url === '/izbrannoe') {
    i = true;
    modul = (
      <Izbrannoe
        cur={props.cur}
        setIzbr={props.setIzbr}
        izbr={props.izbrList}
        token={props.auth_token}
      />
    );
    title = <>Избранное</>;
  }

  const onOkExit = () => {
    props.setAuth(false);
    props.setToken('');
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
  const onExitModal = () => {
    setVisExModal(true);
  };

  if (props.isAuth) {
    return (
      <div className="lk-container">
        <BrowserView>
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
        </BrowserView>
        <MobileView>
          <BackArrow history={props.history} />
          <div className="lk-top -mobile">
            <h1>{title}</h1>
          </div>
        </MobileView>

        {modul}
        <MyModal
          onOk={onOkExit}
          okText="Да"
          cancelText='Нет'
          onCancel={() => setVisExModal(false)}
          buttonAllVision={true}
          visible={visibleExitModale}
          title={'Выйти из кабинета?'}
        >
        </MyModal>
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
    user_info: store.user_data.user_info,
    izbrList: store.izbr_data.izbrList,
    cur: store.valute_data.valute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuth: data => {
      dispatch(authActions.setAuth(data));
    },
    setUserInfo: data => {
      dispatch(userActions.setUserInfo(data));
    },
    setToken: data => {
      dispatch(authActions.setToken(data));
    },
    setIzbr: data => {
      dispatch(izbrActions.setIzbr(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LK);
