
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../pages/Home';
import Contacts from '../../pages/Contacts';
import MyBasket from '../../pages/MyBasket';
import NumGroups from '../../pages/NumGroups';
import Numenclature from '../../pages/Numenclature';
import LK from '../../pages/LK';
import FourLvl from '../../pages/FourLvl';
import FifthLvl from '../../pages/FifthLvl';
import ResetPass from '../../pages/ResetPass';
import Test from '../../pages/test';
import NumGroupsSearch from '../../pages/NumGroupsSearch';
import NumenclatureSearch from '../../pages/NumenclatureSearch';
import HomeSearch from '../../pages/HomeSearch';
import FourLvlSearch from '../../pages/FourLvlSearch';
import NumGroupsNew from '../../pages/NumGroupsNew';
import NumenclatureNew from '../../pages/NumenclatureNew';


const Routes = props => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search/materials" exact component={HomeSearch} />
      <Route exact path="/contacts" component={Contacts} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/personal-data" component={LK} />
      <Route exact path="/izbrannoe" component={LK} />
      <Route exact path="/history" component={LK} />
      <Route exact path="/basket" component={MyBasket} />
      <Route exact path="/account/password/*" component={ResetPass}/>
      <Route exact path="/:material"  component={NumGroups} />
      <Route exact path="/search/nom-groups"  component={NumGroupsSearch} />
      <Route exact path="/sale/:material"  component={NumGroupsNew} />
      <Route exact path="/sale/:material/:numGroups" component={NumenclatureNew}/>
      <Route exact path="/search/products" component={FourLvlSearch}/>
      <Route exact path="/search/nomenclatures" component={NumenclatureSearch}/>
      <Route exact path="/new/:material"  component={NumGroupsNew} />
      <Route exact path="/new/:material/:numGroups" component={NumenclatureNew}/>
      <Route exact path="/:material/:numGroups" component={Numenclature}/>
      <Route exact path="/sale/:material/:numGroups/:num" component={FourLvl}/>
      <Route exact path="/new/:material/:numGroups/:num" component={FourLvl}/>
      <Route exact path="/:material/:numGroups/:num" component={FourLvl}/>
      <Route exact path="/:material/:numGroups/:num/:last" component={FifthLvl}/>
      <Route exact path="/sale/:material/:numGroups/:num/:last" component={FifthLvl}/>
      <Route exact path="/new/:material/:numGroups/:num/:last" component={FifthLvl}/>
      {/* <Route path="*">
        <Redirect to="/" />
      </Route> */}
    </Switch>
  );
};

export default Routes;
