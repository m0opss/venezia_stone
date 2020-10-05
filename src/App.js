import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import Home from './pages/Home';
import Contacts from './pages/Contacts';
import MyBasket from './pages/MyBasket';
import Material from './pages/Material'
import Materiall from './pages/Materiall'

import Footer from './components/Footer/Footer';
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
      <div className='container'>
        <Header />
        <div className='content-container'>
          <Switch>
            <Route path='/' exact render={() => <Home data={props.data} />} />
            <Route path='/materials/:materialID' component={Material} />
            <Route path='/material/:materialID/:slabID' component={Materiall} />;
            <Route path='/contacts' component={Contacts} />
            <Route path='/basket' component={MyBasket} />
            <Route path='*'><Redirect to="/" /></Route>
          </Switch>
        </div>
      </div>
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

