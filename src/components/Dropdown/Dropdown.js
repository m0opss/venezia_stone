import React from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

const MyDropdown = (props) => {
  const [state, setState] = React.useState({
    visible: false,
    title: props.title,
  })

  const handleMenuClick = e => {
    if (menu.props.children[e.key]) {
      setState({
        ...state,
        visible: false,
        title: menu.props.children[e.key].props.children,
        choosedCity: e.key
      });
    }
    else {
      setState({
        ...state,
        visible: false,
        choosedCity: e.key
      });
    }
  };

  const handleVisibleChange = flag => {
    console.log(state)
    setState({
      ...state,
      visible: flag
    });
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {props.menuList}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      trigger={['click']}
      visible={state.visible}
    >
      <a className="top-line__title" onClick={e => e.preventDefault()}>
        {state.title} <DownOutlined />
      </a>
    </Dropdown>
  );
}

export default MyDropdown