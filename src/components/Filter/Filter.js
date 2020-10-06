import React from 'react'
import { NavLink } from 'react-router-dom'

import './Filter.scss'

import 'antd/dist/antd.css'
import { Menu, Button } from 'antd';

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Filter = () => {

  const [state, setState] = React.useState({ collapsed: false })

  const toggleCollapsed = () => {
    setState({
      collapsed: !state.collapsed
    });
  };

  return (
    <div className='filter'>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"

        inlineCollapsed={state.collapsed}>
        <SubMenu key="sub1" icon={< MailOutlined />} title="Фильтр">
          <SubMenu key="sub2" icon={< AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </SubMenu>

      </Menu>
    </div>
  );
}

export default Filter