
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../pages/Home';
import Contacts from '../../pages/Contacts';
import MyBasket from '../../pages/MyBasket';
import NumGroups from '../../pages/NumGroups';
import Numenclature from '../../pages/Numenclature';
import LK from '../../pages/LK';


const Routes = props => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route exact path="/contacts" component={Contacts} />
      <Route exact path="/personal-data" component={LK} />
      <Route exact path="/history" component={LK} />
      <Route exact path="/izbrannoe" component={LK} />
      <Route exact path="/basket" component={MyBasket} />
      <Route exact path="/:material"  component={NumGroups} />
      <Route exact path="/:material/:numGroups" component={Numenclature}/>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
