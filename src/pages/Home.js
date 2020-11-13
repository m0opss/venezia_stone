import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
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
  React.useEffect(() => {
    window.scrollTo(0, 0);
    props.setLvl(1);
    if (localStorage.getItem('activeFilters') !== null) {
      let tmp = JSON.parse(localStorage.getItem('activeFilters'));
      tmp.materials = [];
      localStorage.setItem('activeFilters', JSON.stringify(tmp));
    }
    if (localStorage.getItem('activeFieldKeys') !== null) {
      let tmp = JSON.parse(localStorage.getItem('activeFieldKeys'));
      tmp = tmp.filter(f => {
        if (f[0] != '0') {
          return f;
        }
      });
      props.setActiveFields(tmp);
      localStorage.setItem('activeFieldKeys', JSON.stringify(tmp));
    }
    axios
      .get('https://catalog-veneziastone.ru/api_v0/getMaterials/')
      .then(response => {
        props.getDataResponse(response.data);
        localStorage.setItem('material', []);
        localStorage.setItem('groups', []);
        localStorage.setItem('items', []);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <div className="">
      <div className="home-container">
        {isTablet || isBrowser ? <Filter /> : <></>}
        <TreeView>
          <TreeItem nodeId="main" label="Натуральный камень в наличии">
            <div id="main-group" className="catalog-items-group">
              <MaterialItem
                img={''}
                link={''}
                item={{}}
                itemName={'asdasdsd'}
                key={'asa'}
              />
              <MaterialItem
                img={''}
                link={''}
                item={{}}
                itemName={'asdasdsd'}
                key={'21'}
              />
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
          </TreeItem>
          <TreeItem nodeId="sales" label="Распродажа">
            <div className="catalog-items-group">
              {props.data ? (
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
          </TreeItem>
          <TreeItem nodeId="new" label="Новые поступления камня">
            <div className="catalog-items-group">
              {props.data ? (
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
          </TreeItem>
          <TreeItem nodeId="road" label="Товары в пути">
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
          </TreeItem>
        </TreeView>
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
    },
    setActiveFields: data => {
      dispatch(filterActions.setActiveFields(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
