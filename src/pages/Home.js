import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import filterActions from '../actions/filterActions';
import dataActions from 'actions/dataAction';
import MaterialItem from '../components/Content/MaterialItem/MaterialItem';
import Filter from 'components/Filter/Filter';
import {
  MobileView,
  BrowserView,
  isTablet,
  TabletView
} from 'react-device-detect';

import './Home.scss';

const Home = props => {
  const [dropdownMain, setDropdownMain] = React.useState(true);
  const [dropdownSales, setDropdownSales] = React.useState(false);
  const [dropdownNew, setDropdownNew] = React.useState(false);
  const [dropdownRoad, setDropdownRoad] = React.useState(false);

  React.useEffect(() => {
    axios
      .get('https://catalog-veneziastone.ru/api_v0/getMaterials/')
      .then(response => {
        props.getDataResponse(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const openListMain = () => {
    setDropdownMain(!dropdownMain);
    setDropdownSales(false);
    setDropdownNew(false);
    setDropdownRoad(false);
    // const el = document.getElementById('main');
    // el.scrollIntoView({ behavior: 'smooth' });
  };
  const openListSales = () => {
    setDropdownMain(false);
    setDropdownSales(!dropdownSales);
    setDropdownNew(false);
    setDropdownRoad(false);
    // const el = document.getElementById('sales');
    // el.scrollIntoView({ behavior: 'smooth' });
  };
  const openListNew = () => {
    setDropdownMain(false);
    setDropdownSales(false);
    setDropdownNew(!dropdownNew);
    setDropdownRoad(false);
    // const el = document.getElementById('new');
    // console.log(el);
    // el.scrollIntoView({ behavior: 'smooth' });
  };
  const openListRoad = () => {
    setDropdownMain(false);
    setDropdownSales(false);
    setDropdownNew(false);
    setDropdownRoad(!dropdownRoad);
    // const el = document.getElementById('road');
    // el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="content-wrapper">
        <TabletView>
          <Filter />
        </TabletView>
        <BrowserView>
          <Filter />
        </BrowserView>
      <div className="home-container">
        <div
          id="main"
          className="home-bottom-links__link"
          onClick={openListMain}
        >
          Натуральный камень в наличии
        </div>
        <div className="catalog-items-group">
          {dropdownMain ? (
            props.data.mts.map(item => (
              <MaterialItem
                img={item.photo_material}
                link={item.ph}
                item={item}
                itemName={item.mt}
                key={item.mt}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div
          id="sales"
          className="home-bottom-links__link"
          onClick={openListSales}
        >
          <span>Распродажа</span>
        </div>
        <div className="catalog-items-group">
          {dropdownSales ? (
            props.data.mts.map(item => (
              <MaterialItem
                img={item.photo_material}
                link={item.ph}
                item={item}
                itemName={item.mt}
                key={item.mt}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div id="new" className="home-bottom-links__link" onClick={openListNew}>
          Новые поступления камня
        </div>
        <div className="catalog-items-group">
          {dropdownNew ? (
            props.data.mts.map(item => (
              <MaterialItem
                img={item.photo_material}
                link={item.ph}
                item={item}
                itemName={item.mt}
                key={item.mt}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div
          id="road"
          className="home-bottom-links__link"
          onClick={openListRoad}
        >
          Товары в пути
        </div>
        <div className="catalog-items-group">
          {dropdownRoad ? (
            props.data.mts.map(item => (
              <MaterialItem
                img={item.photo_material}
                link={item.ph}
                item={item}
                itemName={item.mt}
                key={item.mt}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    data: store.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataResponse: data => {
      dispatch(dataActions.getDataResponse(data));
    },
    setMatList: data => {
      dispatch(filterActions.setMatList(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
