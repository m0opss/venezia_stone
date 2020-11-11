import React, { Suspense } from 'react';


import filter_icon from 'images/filter-icon.svg';
import filter_icon_hz from 'images/filter-icon_hz.png';
import close_icon from 'images/close.png';
import { Menu } from 'antd';
import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile
} from 'react-device-detect';
import './Filter.scss';
import 'antd/dist/antd.css';

import colors from './filterColors.json';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const RenderFilter = props => {
  return (
    <Suspense>
      <div className="filter">
        <div className="filter__button">
          {!props.state.collapsed && !m ? (
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
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </div>
    </Suspense>
  );
};

export default RenderFilter
