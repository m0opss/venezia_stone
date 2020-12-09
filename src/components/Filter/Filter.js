import React, { Suspense } from 'react';

import { Switch } from 'antd';

import { connect } from 'react-redux';
import filter_icon from 'images/filter-icon.svg';
import filter_icon_hz from 'images/filter-icon_hz.png';
import close_icon from 'images/close.png';

import { Menu } from 'antd';
import axios from 'axios';
import filterActions from 'actions/filterActions';

import {
  isTablet,
  isMobile,
  isBrowser
} from 'react-device-detect';

import './Filter.scss';
import 'antd/dist/antd.css';

import data from './filterData';
import { useEffect } from 'react';
import FilterItem from './FilterItems/FilterItem';


const { titles } = data;

const Filter = props => {
  const [state, setState] = React.useState({
    collapsed: isMobile ? true : props.lvl == 4 ? true : false
  });
  const [sale, setSale] = React.useState(false);
  const [news, setNew] = React.useState(props.nw.length == 1 ? true : false);

  useEffect(() => {
    let isSubscr = true;
    if (props.sale.length == 1) {
      setSale(true);
    }
    if(props.lvl == 1) {
      resetAll()
    }
    if (isSubscr) {
      axios
        .get(`https://catalog-veneziastone.ru/api_v0/getFilters/`)
        .then(response => {
          props.setFilters(response.data.filters);
          if (localStorage.getItem('activeFilters') !== null) {
            props.setActiveFilters(
              JSON.parse(localStorage.getItem('activeFilters'))
            );
          } else {
            props.setActiveFilters(
              Object.fromEntries(
                Object.keys(response.data.filters).map(key => [key, []])
              )
            );
            localStorage.setItem(
              'activeFilters',
              JSON.stringify(
                Object.fromEntries(
                  Object.keys(response.data.filters).map(key => [key, []])
                )
              )
            );
          }
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

      if (localStorage.getItem('activeFieldKeys') !== null) {
        props.setActiveFields(
          JSON.parse(localStorage.getItem('activeFieldKeys'))
        );
      }
    }
    return () => (isSubscr = false);
  }, []);

  const handleClick = e => {
    setState({ collapsed: !state.collapsed });
  };

  const setActiveFields = e => {
    let t = [...props.activeFields];
    if (t.indexOf(e) !== -1) t.splice(t.indexOf(e), 1);
    else t.push(e);
    props.setActiveFields(t);
    localStorage.setItem('activeFieldKeys', JSON.stringify(t));
  };

  const resetAll = () => {
    props.setActiveFilters(
      Object.fromEntries(Object.keys(props.filters).map(key => [key, []]))
    );
    localStorage.setItem(
      'activeFilters',
      JSON.stringify(
        Object.fromEntries(Object.keys(props.filters).map(key => [key, []]))
      )
    );

    props.setActiveFields([]);
    props.setUpper([]);
    props.setCost([]);
    props.setLe([]);
    props.setHe([]);
    console.log(sale);
    setSale(false);
    setNew(false);
    props.setSale([]);
    props.setNew([]);

    localStorage.removeItem('activeFieldKeys');
  };

  const toggleSale = checked => {
    if (checked) {
      props.setSale([1]);
    } else {
      props.setSale([]);
    }
  };

  const toggleNew = checked => {
    if (checked) {
      props.setNew([1]);
    } else {
      props.setNew([]);
    }
  };

  return (
    <Suspense>
      <div className={isMobile ? '' : `filter-wrapper`}>
        <div
          className={`filter ${
            isBrowser && !props.built_in ? 'browser-filter' : ''
          }`}
        >
          <div className="filter__button">
            <img
              src={filter_icon}
              className="filter__button-click -icon"
              onClick={handleClick}
            />
            {!state.collapsed && !isMobile ? (
              <>
                <img
                  className="filter__button-click"
                  src={filter_icon_hz}
                  onClick={resetAll}
                />
              </>
            ) : (
              <></>
            )}
          </div>

          <Menu
            style={{ width: 230 }}
            mode="inline"
            multiple={true}
            inlineCollapsed={state.collapsed}
            selectedKeys={JSON.parse(localStorage.getItem('activeFieldKeys'))}
            defaultOpenKeys={props.activeFields}
          >
            {isMobile && !isTablet ? (
              <img
                src={close_icon}
                className="close-filter"
                onClick={() => setState({ collapsed: !state.collapsed })}
              />
            ) : (
              <></>
            )}
            <Menu.Item
              key="res_kw"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              Всего, м²: {props.all_kw}
            </Menu.Item>
            <Menu.Item
              key="res_cnt"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              Всего, шт: {props.all_cnt}
            </Menu.Item>
            {Object.keys(props.filters).map(filter => {
              let title = '';
              Object.keys(titles).map(t => {
                if (filter == t) title = titles[t];
              });
              return (
                <FilterItem
                  key={filter}
                  lvl={props.lvl}
                  sub_name={filter}
                  sub_elements={props.filters[filter]}
                  sub_title={title}
                  setCost={props.setCost}
                  setLe={props.setLe}
                  setHe={props.setHe}
                  activeFilters={props.activeFilters}
                  setActiveFields={setActiveFields}
                  setActiveFilters={props.setActiveFilters}
                />
              );
            })}

            <Menu.Item
              key="switch_sale"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              Распродажа
              {sale ? (
                <Switch
                  defaultChecked
                  className="filter-switch"
                  onChange={toggleSale}
                />
              ) : (
                <Switch className="filter-switch" onChange={toggleSale} />
              )}
            </Menu.Item>
            <Menu.Item
              key="switch_new"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              Новинки
              {news ? (
                <Switch
                  defaultChecked
                  className="filter-switch"
                  onChange={toggleNew}
                />
              ) : (
                <Switch className="filter-switch" onChange={toggleNew} />
              )}
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Suspense>
  );
};
const mapStateToProps = store => {
  return {
    filters: store.filter_data.filters,
    cur: store.valute_data.valute,
    activeFilters: store.filter_data.activeFilters,
    activeFields: store.filter_data.activeFields,
    level: store.filter_data.level,
    items: store.filter_data.items,
    groups: store.filter_data.groups,
    upper_izd: store.filter_data.upper_izd,
    sale: store.filter_data.sale,
    nw: store.filter_data.nw
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilters: data => {
      dispatch(filterActions.setFilters(data));
    },
    setSale: data => {
      dispatch(filterActions.setSale(data));
    },
    setNew: data => {
      dispatch(filterActions.setNew(data));
    },
    setAllUpper: data => {
      dispatch(filterActions.setAllUpper(data));
    },
    setUpper: data => {
      dispatch(filterActions.setUpper(data));
    },
    setActiveFilters: data => {
      dispatch(filterActions.setActiveFilters(data));
    },
    setCost: data => {
      dispatch(filterActions.setCost(data));
    },
    setLe: data => {
      dispatch(filterActions.setLe(data));
    },
    setHe: data => {
      dispatch(filterActions.setHe(data));
    },
    setActiveFields: data => {
      dispatch(filterActions.setActiveFields(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
