import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import Home from './pages/Home';
import Contacts from './pages/Contacts';
import MyBasket from './pages/MyBasket';
import Material from './pages/Material'
import Materiall from './pages/Materiall'

import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';
import Header from './components/Header/Header';

import './App.scss';
import './components/Content/Content.scss';

import dataActions from './actions/dataAction'

import { allData } from './store/response'


const App = (props) => {
  React.useEffect(() => {
    // axios - запрос выгрузки
    props.getDataResponse(allData)
  }, [])

  return (
    <HashRouter>
      <Header />
      <Content data={props.data}/>
      <Footer />
    </HashRouter>
  )
};

const mapStateToProps = store => {
  return {
    isLogging: store.isLogging.isLogging,
    data: store.data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataResponse: (data) => { dispatch(dataActions.getDataResponse(data)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

