import React from 'react';
import { HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';
import Header from './components/Header/Header';

import axios from 'axios';

import './App.scss';
import './components/Content/Content.scss';

import dataActions from './actions/dataAction';
import authActions from './actions/authActions';

const App = props => {
  React.useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      axios
        .post('http://92.63.103.180:8000/account/get_user_info/', {
          key: localStorage.getItem('auth_token')
        })
        .then(response => {
          props.setAuth(true);
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(1, err.response);
          } else if (err.request) {
            // client never received a response, or request never left
            console.log(2, err.request);
          } else {
            // anything else
            console.log(3, err);
          }
        });
    }
  });

  return (
    <HashRouter>
      <Header />
      <Content data={props.data} />
      <Footer />
    </HashRouter>
  );
};

const mapStateToProps = store => {
  return {
    data: store.data,
    isAuth: store.auth_data.isAuth,
    auth_token: store.auth_data.auth_token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataResponse: data => {
      dispatch(dataActions.getDataResponse(data));
    },
    setAuth: data => {
      dispatch(authActions.setAuth(data));
    },
    setToken: data => {
      dispatch(authActions.setToken(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
