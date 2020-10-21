import React from 'react';
import Authored from './AuthoredAccountButton/Authored';
import Unauthored from './UnauthoredAccountButton/Unauthored';
import { connect } from 'react-redux';

import authActions from 'actions/authActions';
import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';

import './AccountButton.scss';

const AccountButton = props => {
  return (
    <div className="top-line__account">
      {props.isAuth ? (
        <Authored setAuth={props.setAuth} setToken={props.setToken} user_info={props.user_info}/>
      ) : (
        <Unauthored
          title={
            <Icon
              type="login"
              icon={accountIcon}
              color="#C98505"
              width="2em"
              height="2em"
            />
          }
        />
      )}
    </div>
  );
};

const mapStateToProps = store => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountButton);
