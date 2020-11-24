import React, { Suspense } from 'react';

import { connect } from 'react-redux';
import filter_icon from 'images/filter-icon.svg';
import filter_icon_hz from 'images/filter-icon_hz.png';
import close_icon from 'images/close.png';

import { Menu } from 'antd';
import axios from 'axios';
import filterActions from 'actions/filterActions';

import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile
} from 'react-device-detect';
import './Filter.scss';
import 'antd/dist/antd.css';

import data from './filterData';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DecimalStep from './Slider/Slider';

const { SubMenu } = Menu;
const { titles, cities, materials, colors, izdelie } = data;

const Filter = props => {
  const [state, setState] = React.useState({
    collapsed: isMobile ? true : false
  });

  useEffect(() => {
    let isSubscr = true;
    if (isSubscr) {
      axios
        .get(`https://catalog-veneziastone.ru/api_v0/getFilters/`)
        .then(response => {
          props.setFilters(response.data.filters);
          props.setActiveFilters(
            Object.fromEntries(
              Object.keys(response.data.filters).map(key => [key, []])
            )
          );
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
    if (t.indexOf(e.key) !== -1) t.splice(t.indexOf(e.key), 1);
    else t.push(e.key);
    props.setActiveFields(t);
    localStorage.setItem('activeFieldKeys', JSON.stringify(t));
  };

  const izdItemClicked = e => {
    setActiveFields(e);
    let newArr = [...props.upper_izd];
    if (newArr.indexOf(e.key) === -1) {
      newArr.push(e.key);
      document.getElementById(e.key).setAttribute('style', 'color: #c98505');
    } else {
      document.getElementById(e.key).setAttribute('style', 'color: black');
      newArr.splice(newArr.indexOf(e.key), 1);
    }
    props.setUpper(newArr);
  };

  const materialsItemClicked = e => {
    setActiveFields(e);
    let newArr = { ...props.activeFilters };
    if (newArr['materials'].includes(e.key)) {
      newArr['materials'].splice(newArr['materials'].indexOf(e.key), 1);
    } else {
      newArr['materials'].push(e.key);
    }
    props.setActiveFilters(newArr);
  };

  const filterItemClicked = e => {
    setActiveFields(e);
    let f = Object.keys(props.filters)[parseFloat(e.key[0])];
    let param =
      props.filters[f][
        parseFloat(e.key.length > 2 ? e.key[1] + e.key[2] : e.key[1])
      ];

    Object.keys(props.activeFilters).map(field => {
      if (f == field) {
        let tmp = { ...props.activeFilters };
        if (tmp[field].indexOf(param) === -1) tmp[field].push(param);
        else tmp[field].splice(tmp[field].indexOf(param), 1);
        props.setActiveFilters(tmp);
      }
    });
  };

  const resetAll = () => {
    props.setActiveFilters(
      Object.fromEntries(Object.keys(props.filters).map(key => [key, []]))
    );
    props.setActiveFields([]);
    props.setUpper([]);

    localStorage.removeItem('3lvl_active_field');
    localStorage.removeItem('activeFieldKeys');
    document.location.href('/');
  };

  const toggleCost = cost => {
    console.log(cost);
  };

  return (
    <Suspense>
      <div className="filter">
        <div className="filter__button">
          {!state.collapsed && !isMobile ? (
            <>
              <img src={filter_icon} className="-icon" />
              <img
                className="filter__button-click"
                src={filter_icon_hz}
                onClick={handleClick}
              />
            </>
          ) : (
            <img
              src={filter_icon}
              className="filter__button-click -icon"
              onClick={handleClick}
            />
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

          {Object.keys(props.filters).map((filter, index) => {
            let title = '';
            Object.keys(titles).map(t => {
              if (filter == t) title = titles[t];
            });
            if (filter != 'izdelie') {
              return (
                <SubMenu key={filter} title={title}>
                  {props.filters[filter].map((material, ind) => {
                    if (filter === 'materials') {
                      return (
                        <Menu.Item
                          key={material}
                          style={{ display: 'flex', alignItems: 'center' }}
                          onClick={materialsItemClicked}
                        >
                          {material}
                        </Menu.Item>
                      );
                    } else if (filter === 'colors' || filter === 'countries') {
                      return (
                        <Menu.Item
                          key={`${index}${ind}`}
                          style={{ display: 'flex', alignItems: 'center' }}
                          onClick={filterItemClicked}
                        >
                          {index == 2 && material === 'Белый' ? (
                            <>
                              <div
                                className="filter__color border-color"
                                style={{ background: colors[material] }}
                              />
                              {material}
                            </>
                          ) : index == 2 && material !== 'Белый' ? (
                            <>
                              <div
                                className="filter__color"
                                style={{ background: colors[material] }}
                              />
                              {material}
                            </>
                          ) : (
                            material
                          )}
                        </Menu.Item>
                      );
                    } else if (
                      filter === 'obrabotka' ||
                      filter === 'thickness'
                    ) {
                      return (
                        <Menu.Item
                          key={`${index}${ind}`}
                          style={{ display: 'flex', alignItems: 'center' }}
                          onClick={filterItemClicked}
                        >
                          {material}
                        </Menu.Item>
                      );
                    } else if (filter === 'sklad') {
                      return (
                        <Menu.Item
                          key={`${index}${ind}`}
                          style={{ display: 'flex', alignItems: 'center' }}
                          onClick={filterItemClicked}
                        >
                          {Object.keys(cities).map(k => {
                            if (k == material) {
                              return cities[k];
                            }
                          })}
                        </Menu.Item>
                      );
                    }
                  })}
                </SubMenu>
              );
            } else {
              props.setAllUpper(props.filters[filter]);
              return (
                <SubMenu key={filter} title={title}>
                  {props.filters[filter].map(izd => {
                    return (
                      <Menu.Item
                        key={izd}
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={izdItemClicked}
                      >
                        {izd}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            }
          })}
          <SubMenu key="cost-sub" title="Цена за м2">
            <DecimalStep onChange={toggleCost} />
          </SubMenu>
          <Menu.Item key="result-header">Всего найдено:</Menu.Item>
          <Menu.Item
            key="result"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className="">
              1212511 м<sup>2</sup>
            </div>
            <div className="">1124 шт</div>
          </Menu.Item>
          <Menu.Item
            key="reset_all"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            onClick={resetAll}
          >
            Сбросить все
          </Menu.Item>
        </Menu>
      </div>
    </Suspense>
  );
};
const mapStateToProps = store => {
  return {
    filters: store.filter_data.filters,
    activeFilters: store.filter_data.activeFilters,
    activeFields: store.filter_data.activeFields,
    level: store.filter_data.level,
    f_set: store.filter_data.f_set,
    f_dset: store.filter_data.f_dset,
    data: store.data,
    items: store.filter_data.items,
    groups: store.filter_data.groups,
    upper_izd: store.filter_data.upper_izd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilters: data => {
      dispatch(filterActions.setFilters(data));
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
    setActiveFields: data => {
      dispatch(filterActions.setActiveFields(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
