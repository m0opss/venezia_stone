import React from 'react';
import { HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';
import Header from './components/Header/Header';

import axios from 'axios';

import './App.scss';
import './components/Content/Content.scss';

import authActions from './actions/authActions';
import userActions from './actions/userActions';
import filterActions from 'actions/filterActions';
import izbrActions from './actions/izbrActions';

const App = props => {
  React.useEffect(() => {
    let isSubscr = true;
    if (isSubscr) {
      axios
        .get('https://catalog-veneziastone.ru/api_v0/getUpperFilters/', {
          token: localStorage.getItem('auth_token')
        })
        .then(response => {
          props.setAllUpper(response.data.izd)
        })
        .catch(err => {
          if (err.response) {
            console.log(1, err.response);
          } else if (err.request) {
            console.log(2, err.request);
          } else {
            console.log(3, err);
          }
        });
      if (localStorage.getItem('auth_token') !== null) {
        axios
          .post('https://catalog-veneziastone.ru/account/get_user_info/', {
            token: localStorage.getItem('auth_token')
          })
          .then(response => {
            props.setToken(localStorage.getItem('auth_token'));
            props.setUserInfo(response.data);
            props.setAuth(true);
          })
          .catch(err => {
            if (err.response) {
              console.log(1, err.response);
              props.setAuth(false);
            } else if (err.request) {
              console.log(2, err.request);
            } else {
              console.log(3, err);
            }
          });
      }
      if (props.isAuth) {
        axios
          .post(
            `https://catalog-veneziastone.ru/api_v0/showSelectedFavourite/`,
            {
              token: localStorage.getItem('auth_token')
            }
          )
          .then(response => {
            props.setIzbrPs(response.data.products);
            localStorage.setItem(
              'selectedFavourite',
              JSON.stringify(response.data.products)
            );
          });
      }
    }
    return () => (isSubscr = false);
  });

  return (
    <HashRouter>
      <Header isAuth={props.isAuth} />
      <Content data={props.data} />
      <Footer />
    </HashRouter>
  );
};

const mapStateToProps = store => {
  return {
    data: store.data,
    isAuth: store.auth_data.isAuth,
    auth_token: store.auth_data.auth_token,
    basket: store.basket_data.basket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBasket: data => {
      dispatch(basketActions.setBasket(data));
    },
    setAuth: data => {
      dispatch(authActions.setAuth(data));
    },
    setAllUpper: data => {
      dispatch(filterActions.setAllUpper(data));
    },
    setToken: data => {
      dispatch(authActions.setToken(data));
    },
    setUserInfo: data => {
      dispatch(userActions.setUserInfo(data));
    },
    setIzbrPs: data => {
      dispatch(izbrActions.setIzbrPs(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
