import React, { useEffect } from 'react';
import axios from 'axios';
import Authored from './AuthoredAccountButton/Authored';
import Unauthored from './UnauthoredAccountButton/Unauthored';
import { connect } from 'react-redux';

import './AccountButton.scss';

const AccountButton = props => {
  // let [isAuth, setAuth, setToken] = props.authArr.authArr
  // const [token, setToken] = React.useState('')
  React.useEffect(() => {
    // axios.post('http://89.223.120.3:8000/api/v0/account/finish_reset_password/', {
    //   username: phoneValue,
    //   password: passValue,
    //   code: resetSms
    // })
    //   .then(response => {
    //     if (response.data.success === 'True') {
    //     } else {
    //     }
    //   })
    //   .catch(e => { console.log(e) })
  }, []);
  return (
    <div className="top-line__account">
      {props.isAuth ? (
        <Authored />
      ) : (
        <Unauthored func={[props.setAuth, props.setToken]} />
      )}
    </div>
  );
};
const mapStateToProps = store => {
  return {
    isAuth: store.isAuth.isAuth,
    auth_token: store.isAuth.auth_token
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
