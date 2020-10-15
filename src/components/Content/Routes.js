
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Home from '../../pages/Home';
import Contacts from '../../pages/Contacts';
import MyBasket from '../../pages/MyBasket';
import NumGroups from '../../pages/NumGroups';
import Numenclature from '../../pages/Numenclature';
import LK from '../../pages/LK';

import dataActions from 'actions/dataAction';

const Routes = props => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/:material" component={NumGroups} />
      {/* <Route path="/:material/*" component={Numenclature} /> */}
      <Route path="/contacts" component={Contacts} />
      <Route path="/personal-data" component={LK} />
      <Route path="/history" component={LK} />
      <Route path="/izbrannoe" component={LK} />
      <Route path="/basket" component={MyBasket} />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
