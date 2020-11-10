import React, { Suspense } from 'react';

import { connect } from 'react-redux';
import filter_icon from 'images/filter-icon.svg';
import filter_icon_hz from 'images/filter-icon_hz.png';
import close_icon from 'images/close.png';

import { Menu } from 'antd';
import axios from 'axios';
import filterActions from 'actions/filterActions';
import dataActions from 'actions/dataAction';
import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile
} from 'react-device-detect';
import './Filter.scss';
import 'antd/dist/antd.css';

import colors from './filterColors.json';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const Filter = props => {
  const [state, setState] = React.useState({ collapsed: true });
  useEffect(() => {
    let isSubscr = true;
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

  let m;
  if (document.documentElement.clientWidth <= 800) m = true;

  const handleClick = e => {
    setState({ collapsed: !state.collapsed });
  };

  const setActiveFields = fields => {
    localStorage.setItem('activeFieldKeys', JSON.stringify(fields));
  };

  const fetchFilters = () => {
    localStorage.setItem('activeFilters', JSON.stringify(props.activeFilters));
    let gr = props.groups ? [props.groups] : [];
    let its = props.items ? [props.items] : [];
    let headers = props.activeFilters;
    if (headers.materials.length == 0)
      headers.materials = [localStorage.getItem('material')];

    axios
      .post('https://catalog-veneziastone.ru/api_v0/Filter/', {
        ...headers,
        items: its,
        level: [props.level],
        groups: gr
      })
      .then(response => {
        if (!isMobile) {
          if (props.level == 2) props.setData(response.data.mts[0].grs);
          if (props.level == 3) props.setData(response.data.grs[0].itms);
          if (props.level == 4) props.setData(response.data.itms[0]);
        } else {
          if (props.level == 2)
            localStorage.setItem(
              'grps',
              JSON.stringify(response.data.mts[0].grs)
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
  };

  const filterItemClicked = e => {
    let t = [...props.activeFields];
    if (t.indexOf(e.key) !== -1) t.splice(t.indexOf(e.key), 1);
    else t.push(e.key);
    props.setActiveFields(t);
    setActiveFields(t);

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

    fetchFilters();
  };
  const titles = {
    materials: 'Материал',
    izdelie: 'Изделие',
    colors: 'Цвет',
    countries: 'Страна',
    obrabotka: 'Тип обработки',
    thickness: 'Толщина',
    sklad: 'Склад'
  };
  const materials = {
    Гранит: 'Granit',
    Травертин: 'Travertin',
    Сланец: 'Slanets',
    Оникс: 'Oniks',
    Мрамор: 'Mramor',
    Лабрадорит: 'Labradorit',
    Керамика: 'Keramika',
    Кварцит: 'Kvartsit',
    'Кварцевый агломерат': 'Kvartsevyy_aglomerat',
    Известняк: 'Izvestnyak',
    'Искусственный мрамор': 'Iskusstvennyy_mramor',
    Эксклюзив: 'Eksklyuziv'
  };
  const cities = {
    krd: 'Краснодар',
    kzn: 'Казань',
    ekb: 'Екатеринбург',
    spb: 'Санкт-Петербург',
    msc: 'Москва'
  };

  return (
    <Suspense>
      <div className="filter">
        <div className="filter__button">
          {!state.collapsed && !m ? (
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
          style={{ width: 320 }}
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

            return (
              <SubMenu key={filter} title={title}>
                {/* Цикл по всем вкладкам */}
                {props.filters[filter].map((material, ind) => {
                  if (filter === 'materials') {
                    {
                      /* Для вкладки материалы - переводит с русского по словарю materials */
                    }
                    let mat_eng = material;
                    Object.keys(materials).map(mat => {
                      if (mat == material) mat_eng = materials[mat];
                    });

                    return props.level == 1 ? (
                      <Menu.Item
                        key={`${index}${ind}`}
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={filterItemClicked}
                      >
                        <Link to={`/${mat_eng}`}>{material}</Link>
                      </Menu.Item>
                    ) : (
                      <Menu.Item
                        disabled
                        key={`${index}${ind}`}
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={filterItemClicked}
                      >
                        <Link to={`/${mat_eng}`}>{material}</Link>
                      </Menu.Item>
                    );
                  } else if (filter === 'colors' || filter === 'countries') {
                    return props.level == 2 ? (
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
                    ) : (
                      <Menu.Item
                        disabled
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
                    filter === 'izdelie' ||
                    filter === 'obrabotka' ||
                    filter === 'thickness'
                  ) {
                    return props.level == 3 ? (
                      <Menu.Item
                        key={`${index}${ind}`}
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={filterItemClicked}
                      >
                        {material}
                      </Menu.Item>
                    ) : (
                      <Menu.Item
                        disabled
                        key={`${index}${ind}`}
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={filterItemClicked}
                      >
                        {material}
                      </Menu.Item>
                    );
                  } else if (filter === 'sklad') {
                    return props.level == 4 ? (
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
                    ) : (
                      <Menu.Item
                        disabled
                        key={`${index}${ind}`}
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={filterItemClicked}
                      >
                        {material === 'krd'
                          ? 'Краснодар'
                          : material === 'kzn'
                          ? 'Казань'
                          : material === 'ekb'
                          ? 'Екатеринбург'
                          : material === 'spb'
                          ? 'Санкт-Петербург'
                          : material === 'msc'
                          ? 'Москва'
                          : material}
                      </Menu.Item>
                    );
                  }
                  // return (
                  //   <Menu.Item
                  //     key={`${index}${ind}`}
                  //     style={{ display: 'flex', alignItems: 'center' }}
                  //     onClick={filterItemClicked}
                  //   >
                  //     {material === 'krd' ? (
                  //       'Краснодар'
                  //     ) : material === 'kzn' ? (
                  //       'Казань'
                  //     ) : material === 'ekb' ? (
                  //       'Екатеринбург'
                  //     ) : material === 'spb' ? (
                  //       'Санкт-Петербург'
                  //     ) : material === 'msc' ? (
                  //       'Москва'
                  //     )  : (
                  //       material
                  //     )}
                  //   </Menu.Item>
                  // );
                })}
              </SubMenu>
            );
          })}
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
    data: store.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilters: data => {
      dispatch(filterActions.setFilters(data));
    },
    // setMobData: data => {
    //   dispatch(filterActions.setMobData(data));
    // },
    setActiveFilters: data => {
      dispatch(filterActions.setActiveFilters(data));
    },
    setActiveFields: data => {
      dispatch(filterActions.setActiveFields(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
