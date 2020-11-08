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
  TabletView,
  isBrowser
} from 'react-device-detect';

import './Home.scss';

const Home = props => {
  const [dropdownMain, setDropdownMain] = React.useState(true);
  const [dropdownSales, setDropdownSales] = React.useState(false);
  const [dropdownNew, setDropdownNew] = React.useState(false);
  const [dropdownRoad, setDropdownRoad] = React.useState(false);

  const [dropClassMain, setDropClassMain] = React.useState(
    'home-bottom-links__link-active'
  );
  const [dropClassSales, setDropClassSales] = React.useState('');
  const [dropClassNew, setDropClassNew] = React.useState('');
  const [dropClassRoad, setDropClassRoad] = React.useState('');

  const [dataSale, setDataSale] = React.useState([]);
  const [dataNew, setDataNew] = React.useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    props.setLvl(1);

    axios
      .get('https://catalog-veneziastone.ru/api_v0/getMaterials/')
      .then(response => {
        props.getDataResponse(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const resetStyle = () => {
    setDropClassMain('');
    // const successMsg = document.getElementById('main-group')
    // successMsg.classList.remove('hidden-group')
    setDropClassSales('');
    setDropClassNew('');
    setDropClassRoad('');
  };

  const openListMain = () => {

    if (!dropdownMain) {
      setDropClassMain('home-bottom-links__link-active');
      setDropClassSales('');
      setDropClassNew('');
      setDropClassRoad('');
    } else {
      resetStyle();
    }
    setDropdownMain(!dropdownMain);
    setDropdownSales(false);
    setDropdownNew(false);
    setDropdownRoad(false);
    // const el = document.getElementById('main');
    // el.scrollIntoView({ behavior: 'smooth' });
  };
  const openListSales = () => {
    if (!dropdownSales) {
      setDropClassMain('');
      setDropClassSales('home-bottom-links__link-active');
      setDropClassNew('');
      setDropClassRoad('');
    } else {
      resetStyle();
    }
    setDropdownMain(false);
    setDropdownSales(!dropdownSales);
    setDropdownNew(false);
    setDropdownRoad(false);
    // const el = document.getElementById('sales');
    // el.scrollIntoView({ behavior: 'smooth' });
  };
  const openListNew = () => {
    if (!dropdownNew) {
      setDropClassMain('');
      setDropClassSales('');
      setDropClassNew('home-bottom-links__link-active');
      setDropClassRoad('');
    } else {
      resetStyle();
    }
    setDropdownMain(false);
    setDropdownSales(false);
    setDropdownNew(!dropdownNew);
    setDropdownRoad(false);
    // const el = document.getElementById('new');
    // console.log(el);
    // el.scrollIntoView({ behavior: 'smooth' });
  };
  const openListRoad = () => {
    if (!dropdownRoad) {
      setDropClassMain('');
      setDropClassSales('');
      setDropClassNew('');
      setDropClassRoad('home-bottom-links__link-active');
    } else {
      resetStyle();
    }
    setDropdownMain(false);
    setDropdownSales(false);
    setDropdownNew(false);
    setDropdownRoad(!dropdownRoad);
    // const el = document.getElementById('road');
    // el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="">
      <div className="home-container">
        {isTablet || isBrowser ? <Filter /> : <></>}
        <div
          id="main"
          className={`home-bottom-links__link ${dropClassMain}`}
          onClick={openListMain}
        >
          Натуральный камень в наличии
        </div>
        <div id="main-group" className="catalog-items-group">
          {dropdownMain && props.data ? (
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
          className={`home-bottom-links__link ${dropClassSales}`}
          onClick={openListSales}
        >
          <span>Распродажа</span>
        </div>
        <div className="catalog-items-group">
          {dropdownSales && props.data ? (
            props.data.sale.map(item => (
              <MaterialItem
                img={item.photo_material}
                link={'sale/' + item.ph}
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
          id="new"
          className={`home-bottom-links__link ${dropClassNew}`}
          onClick={openListNew}
        >
          Новые поступления камня
        </div>
        <div className="catalog-items-group">
          {dropdownNew && props.data ? (
            props.data.new.map(item => (
              <MaterialItem
                img={item.photo_material}
                link={'new/' + item.ph}
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
          className={`home-bottom-links__link ${dropClassRoad}`}
          onClick={openListRoad}
        >
          Товары в пути
        </div>
        <div className="catalog-items-group">
          {dropdownRoad && props.data ? (
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
    },
    setLvl: data => {
      dispatch(filterActions.setLvl(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
