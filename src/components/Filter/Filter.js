import React, { Suspense } from 'react';

import { connect } from 'react-redux';
import filter_icon from 'images/filter-icon.png';
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

import colors from './filterColors.json';
import materials from './filterMaterials.json';
import { useEffect } from 'react';

const { SubMenu } = Menu;

const Filter = props => {
  const [state, setState] = React.useState({ collapsed: true });
  const [activeFields, setActiveFields] = React.useState([]);

  useEffect(() => {
    let isSubscr = true;
    if (isSubscr) {

      if (localStorage.getItem('filters') !== null) {
        props.setFilters(localStorage.getItem('filters'));
        // setFilters(localStorage.getItem('filters'));
      } else {
        axios
          .get(`https://catalog-veneziastone.ru/api_v0/getFilters/`)
          .then(response => {
            props.setFilters(response.data.filters);
            props.setDefaultFields(Object.fromEntries(Object.keys(response.data.filters).map( key => [key,[]] )));
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
      if(localStorage.getItem('activeFieldKeys') !== null) {
        setActiveFields(localStorage.getItem('activeFieldKeys'))
      }
    }
    return () => (isSubscr = false);
  }, []);

  let m;
  if (document.documentElement.clientWidth <= 800) m = true;

  const handleClick = e => {
    setState({ collapsed: !state.collapsed });
  };
  const setFieldsActive = (fields) => {
    setActiveFields(fields)
    localStorage.setItem('activeFieldKeys', fields)
    
  }
  const filterItemClicked = (e) => {
    let t = [...activeFields]
    if(activeFields.indexOf(e.key) !== -1)
    t.splice(activeFields.indexOf(e.key), 1)
    else t.push(e.key)
    setFieldsActive(t)

    let f = Object.keys(props.filters)[parseFloat(e.key[0])]
    let param = props.filters[f][parseFloat(e.key.length > 2 ? e.key[1]+e.key[2]: e.key[1])]
    
    console.log(parseFloat(e.key.length > 2 ? e.key[1]+e.key[2]: e.key[1]))
    console.log(f)
    console.log(param)
    Object.keys(props.activeFilter).map(field => {
      if( f == field) {
        let tmp = {...props.activeFilter}
        if(tmp[field].indexOf(param) === -1)
          tmp[field].push(param) 
        else
          tmp[field].splice(tmp[field].indexOf(param), 1)
        props.setFilterField(tmp)
      }
    })
  }
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
        selectedKeys={activeFields}
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
          if (filter === 'materials') title = 'Материал';
          else if (filter === 'izdelie') title = 'Изделие';
          else if (filter === 'colors') title = 'Цвет';
          else if (filter === 'countries') title = 'Страна';
          else if (filter === 'obrabotka') title = 'Тип обработки';
          else if (filter === 'thickness') title = 'Толщина';
          else if (filter === 'sklad') title = 'Склад';
          return (
            <SubMenu key={filter} title={title}>
              {props.filters[filter].map((material, ind) => {
                return (
                  <Menu.Item
                    key={`${index}${ind}`}
                    style={{ display: 'flex', alignItems: 'center' }}
                    onClick={filterItemClicked}
                  >
                    { material === 'krd' ? 'Краснодар'
                    : material === 'kzn' ? 'Казань'
                    : material === 'ekb' ? 'Екатеринбург'
                    : material === 'spb' ? 'Санкт-Петербург'
                    : material === 'msc' ? 'Москва'
                    : index == 2 && material === 'Белый' ? 
                      <><div className="filter__color border-color" style={{ background: colors[material] }}/>{material}</> 
                    : index == 2 && material !== 'Белый' ? 
                      <><div className="filter__color" style={{ background: colors[material] }}/>{material}</>
                    : material}
                  </Menu.Item>
                );
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
    choosedMat: store.filter_data.choosedMat,
    filters: store.filter_data.filters,
    activeFilter: store.filter_data.activeFilter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChoosedMat: data => {
      dispatch(filterActions.setChoosedMat(data));
    },
    setFilters: data => {
      dispatch(filterActions.setFilters(data));
    },
    setDefaultFields: data => {
      dispatch(filterActions.setDefaultFields(data));
    },
    setFilterField: data => {
      dispatch(filterActions.setFilterField(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
