import React, { Children } from 'react';
import { NavLink } from 'react-router-dom';

import './Filter.scss';

import filter_icon from 'images/filter-icon.png';
import arrow_icon from 'images/arrow.png';

import 'antd/dist/antd.css';
import { Menu, Button } from 'antd';

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const MySubMenu = props => {
  return (
    <SubMenu
      key={props.key}
      title={
        <div className="filter__submenu">
          {props.title} <img src={arrow_icon} />
        </div>
      }
    >
      {props.children}
    </SubMenu>
  );
};

const Filter = () => {
  const [state, setState] = React.useState({ collapsed: false });

  const toggleCollapsed = () => {
    setState({
      collapsed: !state.collapsed
    });
  };

  const handleClick = e => {
    console.log('click ', e);
  };

  return (
    <div className="filter">
      <Menu
        onClick={handleClick}
        style={{ width: 267 }}
        defaultSelectedKeys={['1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          icon={<img src={filter_icon} style={{ marginRight: 10 }} />}
          title="Фильтр"
        >
          <SubMenu
            key="material"
            title={
              <div className="filter__submenu">
                Материал <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="izdelie"
            title={
              <div className="filter__submenu">
                Изделие <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="color"
            title={
              <div className="filter__submenu">
                Цвет <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="proc_type"
            title={
              <div className="filter__submenu">
                Тип обработки <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="size"
            title={
              <div className="filter__submenu">
                Размеры <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="thickness"
            title={
              <div className="filter__submenu">
                Толщина <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="cost"
            title={
              <div className="filter__submenu">
                Цена <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="city"
            title={
              <div className="filter__submenu">
                Город <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="bookmatch"
            title={
              <div className="filter__submenu">
                Букматч <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="light"
            title={
              <div className="filter__submenu">
                Подсветка <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="born_place"
            title={
              <div className="filter__submenu">
                Месторождение <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu
            key="status"
            title={
              <div className="filter__submenu">
                Статус <img src={arrow_icon} alt="" />
              </div>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Filter;
