import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import filterActions from '../actions/filterActions';
import MaterialItem from '../components/Content/MaterialItem/MaterialItem';
import { headerCreator } from 'components/Filter/headerCreator';
import Preloader from 'components/Preloader/Preloader';

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
  const [isMatLoading, setMatLoading] = React.useState(true);
  const [isNewLoading, setNewLoading] = React.useState(true);
  const [isSaleLoading, setSaleLoading] = React.useState(true);
  const [matList, setMatList] = React.useState([]);
  const [saleList, setSaleList] = React.useState([]);
  const [newList, setNewList] = React.useState([]);
  React.useEffect(() => {
    document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
    setMatLoading(true);
    setNewLoading(true);
    setSaleLoading(true);
    props.setNew([]);
    props.setSale([]);

    let isSubscr = true;
    if (isSubscr) {
      let header = headerCreator(
        props.activeFilters,
        props.upper_izd,
        props.cur,
        props.cost,
        props.le,
        props.he
      );
      console.log(
        JSON.stringify({
          ...header,
          items: [],
          level: [1],
          groups: [],
          token: [],
          nw: [],
          on_sale: []
        })
      );
      axios
        .post('https://catalog-veneziastone.ru/api_v0/Filter/', {
          ...header,
          items: [],
          level: [1],
          groups: [],
          token: [],
          nw: [],
          on_sale: []
        })
        .then(response => {
          setMatList(response.data.mts);
          setMatLoading(false);
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(1, err.response);
            // props.setAuth(false);
          } else if (err.request) {
            // client never received a response, or request never left
            console.log(2, err.request);
          } else {
            // anything else
            console.log(3, err);
          }
        });
      axios
        .post('https://catalog-veneziastone.ru/api_v0/Filter/', {
          ...header,
          items: [],
          level: [1],
          groups: [],
          token: [],
          nw: [1],
          on_sale: []
        })
        .then(response => {
          setNewList(response.data.mts);
          setNewLoading(false);
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(1, err.response);
            // props.setAuth(false);
          } else if (err.request) {
            // client never received a response, or request never left
            console.log(2, err.request);
          } else {
            // anything else
            console.log(3, err);
          }
        });
      axios
        .post('https://catalog-veneziastone.ru/api_v0/Filter/', {
          ...header,
          items: [],
          level: [1],
          groups: [],
          token: [],
          nw: [],
          on_sale: [1]
        })
        .then(response => {
          setSaleList(response.data.mts);
          setSaleLoading(false);
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(1, err.response);
            // props.setAuth(false);
          } else if (err.request) {
            // client never received a response, or request never left
            console.log(2, err.request);
          } else {
            // anything else
            console.log(3, err);
          }
        });
    }
    return () => (isSubscr = false);
  }, [props.activeFilters, props.upper_izd, props.cost, props.le, props.he]);
  // }, []);

  const setActiveFields = key => {
    let t = [...props.activeFields];
    if (t.indexOf(key) === -1) t.push(key);
    props.setActiveFields(t);
    localStorage.setItem('activeFieldKeys', JSON.stringify(t));
  };

  const clickItem = (itemName, type) => {
    setActiveFields(itemName);
    let newArr = { ...props.activeFilters };
    console.log('Home newarr', newArr)
    if (newArr['materials'] && !newArr['materials'].includes(itemName)) {
      newArr['materials'].push(itemName);
    }
    props.setActiveFilters(newArr);
    localStorage.setItem('activeFilters', JSON.stringify(newArr));
    if (type == 'sale') {
      props.setSale([1]);
    }
    if (type == 'new') {
      props.setNew([1]);
    }
  };

  return (
    <div className="">
      <div className="home-container">
        {isTablet || isBrowser ? <Filter /> : <></>}
        <TreeView defaultExpanded={['main']}>
          <TreeItem nodeId="main" label="Натуральный камень в наличии">
            <Preloader isLoading={isMatLoading}>
              <div id="main-group" className="catalog-items-group">
                {matList ? (
                  matList.map(item => (
                    <MaterialItem
                      onClick={clickItem}
                      img={item.photo_material}
                      // link={item.ph}
                      item={item}
                      itemName={item.mt}
                      key={item.mt}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </Preloader>
          </TreeItem>
          <TreeItem nodeId="sales" label="Распродажа">
            <Preloader isLoading={isSaleLoading}>
              <div className="catalog-items-group">
                {saleList ? (
                  saleList.map(item => (
                    <MaterialItem
                      onClick={clickItem}
                      type="sale"
                      img={item.photo_material}
                      item={item}
                      itemName={item.mt}
                      key={item.mt}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </Preloader>
          </TreeItem>
          <TreeItem nodeId="new" label="Новые поступления камня">
            <Preloader isLoading={isNewLoading}>
              <div className="catalog-items-group">
                {newList ? (
                  newList.map(item => (
                    <MaterialItem
                      onClick={clickItem}
                      type="new"
                      img={item.photo_material}
                      item={item}
                      itemName={item.mt}
                      key={item.mt}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </Preloader>
          </TreeItem>
          {/* <TreeItem nodeId="road" label="Товары в пути">
            <div className="catalog-items-group">
              {props.data ? (
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
          </TreeItem> */}
        </TreeView>
      </div>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    activeFilters: store.filter_data.activeFilters,
    activeFields: store.filter_data.activeFields,
    upper_izd: store.filter_data.upper_izd,
    cur: store.valute_data.valute,
    cost: store.filter_data.cost,
    le: store.filter_data.le,
    he: store.filter_data.he,
    sale: store.filter_data.sale,
    nw: store.filter_data.nw
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSale: data => {
      dispatch(filterActions.setSale(data));
    },
    setNew: data => {
      dispatch(filterActions.setNew(data));
    },
    setActiveFields: data => {
      dispatch(filterActions.setActiveFields(data));
    },
    setActiveFilters: data => {
      dispatch(filterActions.setActiveFilters(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
