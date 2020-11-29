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
  MobileView,
  BrowserView,
  isTablet,
  isMobile,
  isBrowser
} from 'react-device-detect';

import './Filter.scss';
import 'antd/dist/antd.css';

import data from './filterData';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SliderCost from './Slider/SliderCost';
import SliderSize from './Slider/SliderSize';

const { SubMenu } = Menu;
const { titles, cities, materials, colors, izdelie } = data;

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
  }, [sale, props.sale]);

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
    localStorage.setItem('upper_izd', JSON.stringify(newArr));
  };

  const materialsItemClicked = e => {
    setActiveFields(e);
    let newArr = { ...props.activeFilters };
    console.log('filter newarr', newArr);
    if (newArr['materials']) {
      if (newArr['materials'].includes(e.key)) {
        newArr['materials'].splice(newArr['materials'].indexOf(e.key), 1);
      } else {
        newArr['materials'].push(e.key);
      }
    }
    props.setActiveFilters(newArr);
    localStorage.setItem('activeFilters', JSON.stringify(newArr));
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
        localStorage.setItem('activeFilters', JSON.stringify(tmp));
      }
    });
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

    localStorage.removeItem('3lvl_active_field');
    localStorage.removeItem('activeFieldKeys');
  };

  const toggleCost = cost => {
    props.setCost(cost);
  };

  const toggle_le = sizes => {
    props.setLe(sizes);
  };
  const toggle_he = sizes => {
    props.setHe(sizes);
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
      <div
        className={`filter ${
          isBrowser && !props.built_in ? 'browser-filter' : ''
        }`}
      >
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
            if (filter == 'izdelie') {
              if (props.lvl != '4') {
                // props.setAllUpper(props.filters[filter]);
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
              } else {
                return <></>;
              }
            } else if (filter == 'prices') {
              return (
                <SubMenu key="cost-sub" title="Цена за м2">
                  <SliderCost
                    cur={props.cur}
                    defVal={props.filters[filter]}
                    onChange={toggleCost}
                  />
                </SubMenu>
              );
            } else if (filter == 'sizas') {
              return (
                <SubMenu key="size-sub" title="Размеры">
                  <SliderSize
                    defVal={props.filters[filter]}
                    onChange_le={toggle_le}
                    onChange_he={toggle_he}
                  />
                </SubMenu>
              );
            } else {
              return (
                <SubMenu key={filter} title={title}>
                  {props.filters[filter].map((material, ind) => {
                    if (filter === 'materials') {
                      if (props.lvl != '3') {
                        return (
                          <Menu.Item
                            key={material}
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={materialsItemClicked}
                          >
                            {material}
                          </Menu.Item>
                        );
                      } else {
                        return <></>;
                      }
                    } else if (filter === 'colors' || filter === 'countries') {
                      if (props.lvl != '3') {
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
                      } else {
                        return <></>;
                      }
                    } else if (
                      filter === 'obrabotka' ||
                      filter === 'thickness'
                    ) {
                      if (props.lvl != '4') {
                        return (
                          <Menu.Item
                            key={`${index}${ind}`}
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={filterItemClicked}
                          >
                            {material}
                          </Menu.Item>
                        );
                      } else {
                        return <></>;
                      }
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
            }
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
          <Menu.Item
            key="reset_all"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={resetAll}
          >
            <p
              style={{ color: '#be9344', fontSize: '16px', fontWeight: 'bold' }}
            >
              СБРОСИТЬ ВСЁ
            </p>
          </Menu.Item>
        </Menu>
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
