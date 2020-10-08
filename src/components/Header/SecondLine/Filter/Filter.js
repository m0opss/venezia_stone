import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd';

import './Filter.scss'

import 'antd/dist/antd.css'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;


const Filter = () => {

  const handleClick = e => {
  };

  return (
    <div className='filter'>
      <Menu
        onClick={handleClick}
        style={{ width: 296, height: 45 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme='dark'
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <span>Фильтр</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Filter