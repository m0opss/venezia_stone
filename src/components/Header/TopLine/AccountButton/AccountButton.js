import React, { useEffect } from 'react';
import axios from 'axios';
import Authored from './AuthoredAccountButton/Authored';
import Unauthored from './UnauthoredAccountButton/Unauthored';
import { connect } from 'react-redux';

import './AccountButton.scss';

const AccountButton = props => {

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
        <Unauthored />
      )}
    </div>
  );
};

const mapStateToProps = store => {
  return {
    isAuth: store.isAuth.isAuth,
  };
};


export default connect(mapStateToProps)(AccountButton);
