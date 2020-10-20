import React from 'react';

import { connect } from 'react-redux';

import authActions from 'actions/authActions';
import Login from './Log';
import Register from './Register';

import './Login.scss';

const Auth = props =>
  props.isReg ? (
    <Register setVisible={props.setVisible} />
  ) : (
    <Login
      setAuth={props.setAuth}
      setToken={props.setToken}
      setVisible={props.setVisible}
      setIsReg={props.setIsReg}
    />
  );

const mapStateToProps = store => {
  return {
    auth_token: store.auth_data.auth_token,
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
// 6Ld92NYZAAAAAGxOdWjx7wQ-CbTfhJDqmtRMY9on
// 6Ld92NYZAAAAAKELvIbIOCmxEGAb3ffLurCncDEw secret
