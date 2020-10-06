
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../../pages/Home';
import Contacts from '../../pages/Contacts';
import MyBasket from '../../pages/MyBasket';
import Material from '../../pages/Material'
import Materiall from '../../pages/Materiall'

const Routes = (props) => (
  <div className="content">
    <Switch>
      <Route path='/' exact render={() => <Home data={props.data} />} />
      <Route path='/materials/:materialID' component={Material} />
      <Route path='/material/:materialID/:slabID' component={Materiall} />
      <Route path='/contacts' component={Contacts} />
      <Route path='/personal-data' component={MyBasket} />
      <Route path='/history' component={MyBasket} />
      <Route path='/izbrannoe' component={MyBasket} />
      <Route path='/basket' component={MyBasket} />
      <Route path='*'><Redirect to="/" /></Route>
    </Switch>
  </div>
);

export default Routes;