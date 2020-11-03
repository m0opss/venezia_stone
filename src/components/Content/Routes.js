
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../pages/Home';
import Contacts from '../../pages/Contacts';
import MyBasket from '../../pages/MyBasket';
import NumGroups from '../../pages/NumGroups';
import Numenclature from '../../pages/Numenclature';
import SecondLvlSale from '../../pages/SecondLvlSale';
import ThirdLvlSale from '../../pages/ThirdLvlSale';
import FourLvlSale from '../../pages/FourLvlSale';
import SecondLvlNew from '../../pages/SecondLvlNew';
import ThirdLvlNew from '../../pages/ThirdLvlNew';
import FourLvlNew from '../../pages/FourLvlNew';
import LK from '../../pages/LK';
import FourLvl from '../../pages/FourLvl';
import FifthLvl from '../../pages/FifthLvl';
import ResetPass from '../../pages/ResetPass';
import Test from '../../pages/test';


const Routes = props => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route exact path="/contacts" component={Contacts} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/personal-data" component={LK} />
      <Route exact path="/izbrannoe" component={LK} />
      <Route exact path="/history" component={LK} />
      <Route exact path="/basket" component={MyBasket} />
      <Route exact path="/password/*" component={ResetPass}/>
      <Route exact path="/:material"  component={NumGroups} />
      <Route exact path="/sale/:material"  component={SecondLvlSale} />
      <Route exact path="/new/:material"  component={SecondLvlNew} />
      <Route exact path="/sale/:material/:numGroups" component={ThirdLvlSale}/>
      <Route exact path="/new/:material/:numGroups" component={ThirdLvlNew}/>
      <Route exact path="/:material/:numGroups" component={Numenclature}/>
      <Route exact path="/sale/:material/:numGroups/:num" component={FourLvlSale}/>
      <Route exact path="/new/:material/:numGroups/:num" component={FourLvlNew}/>
      <Route exact path="/:material/:numGroups/:num" component={FourLvl}/>
      <Route exact path="/:material/:numGroups/:num/:last" component={FifthLvl}/>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;

// id: "00-00008942"
// ​
// izd: "Слэбы"
// ​
// prs: Array(147) [ {…}, {…}, {…}, … ]

///////////////////////////////////////////
// bl: "BLM04039"
// ​​​
// bty: ""
// ​​​
// cnt: "6470.7"
// ​​​
// he: "2,01"
// ​​​
// le: "1,92"
// ​​​
// os: "3.859"
// ​​​
// photo_product: "https://storage.yandexcloud.net/venezia-photo/M0265280.jpg"
// ​​​
// photobl: "https://storage.yandexcloud.net/venezia-photo/textures/BLM04039.jpg"
// ​​​
// photobltp: "bundle"
// ​​​
// ps: "M0265280"
// ​​​
// sco: "0"
// ​​​
// skl: "msc"
// ​​​
// status: "Балласт"
// ​​​
// typeFoto: "slab"