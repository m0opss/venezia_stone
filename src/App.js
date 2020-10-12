import React from 'react';
import { HashRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import { Breadcrumb } from 'antd';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';
import Header from './components/Header/Header';

import './App.scss';
import './components/Content/Content.scss';


import dataActions from './actions/dataAction'
import authActions from './actions/authActions'

import { allData } from './store/response'


const App = (props) => {
  React.useEffect(() => {
    // axios - запрос выгрузки
    props.getDataResponse(allData)
  }, [])

  return (
    <HashRouter>
      <Header />
      <Breadcrumb separator=">" />
      <Content data={props.data}/>
      <Footer />
    </HashRouter>
  )
};

const mapStateToProps = store => {
  
  return {
    // isAuth: store.isAuth.isAuth,
    data: store.data,
    // auth_token: store.isAuth.auth_token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataResponse: (data) => { dispatch(dataActions.getDataResponse(data)) },
    // setAuth: (data) => {dispatch(authActions.setAuth(data))},
    // setToken: (data) => {dispatch(authActions.setToken(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

