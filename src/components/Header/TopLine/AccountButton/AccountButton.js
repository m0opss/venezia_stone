import React from 'react';
import Authored from './AuthoredAccountButton/Authored';
import Unauthored from './UnauthoredAccountButton/Unauthored';
import { connect } from 'react-redux';

import authActions from 'actions/authActions';
import './AccountButton.scss';

const AccountButton = props => {
  return (
    <div className="top-line__account">
      {props.isAuth ? (
        <Authored setAuth={props.setAuth} setToken={props.setToken} />
      ) : (
        <Unauthored />
      )}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountButton);
