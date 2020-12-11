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
import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import './Home.scss';

var CancelToken = axios.CancelToken;
var cancel;
const Home = props => {
  const [isMatLoading, setMatLoading] = React.useState(true);
  const [isNewLoading, setNewLoading] = React.useState(true);
  const [isSaleLoading, setSaleLoading] = React.useState(true);
  const [matList, setMatList] = React.useState([]);
  const [saleList, setSaleList] = React.useState([]);
  const [newList, setNewList] = React.useState([]);

  React.useEffect(() => {
    props.setLvl(1);
    console.log("EFFFFFF", props.activeFilters)
    document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });

    setMatLoading(true);
    setNewLoading(true);
    setSaleLoading(true);
    // props.setNew([]);
    // props.setSale([]);

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
          nw: props.nw,
          on_sale: props.sale
        })
      );
      axios({
        method: 'post',
        url: 'https://catalog-veneziastone.ru/api_v0/Filter/',
        data: {
          ...header,
          items: [],
          level: [1],
          groups: [],
          token: [],
          nw: props.nw,
          on_sale: props.sale
        },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      })
        .then(res => {
          cancel();
          // setMatLoading(false);
          setTimeout(() => setMatLoading(false), 600);
          console.log(res.data);
          setMatList(res.data.mts);
        })
        .catch(function(err) {
          if (axios.isCancel(err)) {
            console.log(err);
          } else {
            console.log('im server response error', err);
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
        });
    }

    return () => (isSubscr = false);
  }, [
    props.activeFilters,
    props.upper_izd,
    props.cost,
    props.le,
    props.he,
    props.nw,
    props.sale
  ]);

  const setActiveFields = key => {
    let t = [...props.activeFields];
    if (t.indexOf(key) === -1) t.push(key);
    props.setActiveFields(t);
    localStorage.setItem('activeFieldKeys', JSON.stringify(t));
  };

  const clickItem = (itemName, type) => {
    setActiveFields(itemName);
    let newArr = { ...props.activeFilters };
    // let newArr = { ...act };
    if (newArr['materials'] && !newArr['materials'].includes(itemName)) {
      newArr['materials'].push(itemName);
    }
    console.log(123123123, newArr)
    props.setActiveFilters(newArr);
    localStorage.setItem('activeFilters', JSON.stringify(newArr));
    if (type == 'sale') {
      props.setSale([1]);
    }
    if (type == 'new') {
      props.setNew([1]);
    }
  };
  let all_kw = 0;
  matList.map(el => {
    all_kw += el.kw;
  });


  return (
    <div className="">
      <div className="home-container">
        {isTablet || isBrowser ? (
          <Filter lvl={1} all_cnt={matList.length} all_kw={all_kw.toFixed(3)} />
        ) : (
          <></>
        )}
        <TreeView defaultExpanded={['main']}>
          <TreeItem nodeId="main" label="Натуральный камень в наличии">
            <Preloader isLoading={isMatLoading}>
              <div id="main-group" className="catalog-items-group">
                {matList ? (
                  matList.map(item => (
                    <MaterialItem
                      onClick={clickItem}
                      activeFilters={props.activeFilters}
                      img={item.photo_material}
                      item={item}
                      itemName={item.mt}
                      key={item.mt}
                    />
                  ))
                ) : (
                  <></>
                )}
                {(isTablet || isBrowser) && matList.length % 3 == 1 ? (
                  <>
                    <div className="material_empty"></div>
                    <div className="material_empty"></div>
                  </>
                ) : (isTablet || isBrowser) && matList.length % 3 == 2 ? (
                  <>
                    <div className="material_empty"></div>
                  </>
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
                {(isTablet || isBrowser) && matList.length % 3 == 1 ? (
                  <>
                    <div className="material_empty"></div>
                    <div className="material_empty"></div>
                  </>
                ) : (isTablet || isBrowser) && matList.length % 3 == 2 ? (
                  <>
                    <div className="material_empty"></div>
                  </>
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
                {(isTablet || isBrowser) && matList.length % 3 == 1 ? (
                  <>
                    <div className="material_empty"></div>
                    <div className="material_empty"></div>
                  </>
                ) : (isTablet || isBrowser) && matList.length % 3 == 2 ? (
                  <>
                    <div className="material_empty"></div>
                  </>
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
    nw: store.filter_data.nw,
    filters: store.filter_data.filters
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
    },
    setLvl: data => {
      dispatch(filterActions.setLvl(data));
    },
    setCost: data => {
      dispatch(filterActions.setCost(data));
    },
    setLe: data => {
      dispatch(filterActions.setLe(data));
    },
    setHe: data => {
      dispatch(filterActions.setHe(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
