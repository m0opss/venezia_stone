import React from 'react';

import { CaretDownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Dropdown.scss';

const MyDropdown = props => {
  const [state, setState] = React.useState({
    visible: false,
    title: props.title
  });

  const handleMenuClick = e => {
    if (props.type == 'login') {
      setState({
        ...state,
        visible: true
      });
    }
    if (props.type == 'city') {
      setState({
        ...state,
        visible: false,
        title: menu.props.children[e.key].props.children,
        choosedCity: e.key
      });
    } else {
      setState({
        ...state,
        visible: false,
        choosedCity: e.key
      });
    }
  };

  const handleVisibleChange = flag => {
    setState({
      ...state,
      visible: flag
    });
  };

  const menu = <Menu onClick={handleMenuClick}>{props.menuList}</Menu>;

  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      trigger={['click']}
      visible={state.visible}
      arrow={true}
    >
      <a className={`-${props.type}`} onClick={e => e.preventDefault()}>
        {state.title} {props.type != 'city' ? <DownOutlined /> : <></>}
      </a>
    </Dropdown>
  );
};

export default MyDropdown;
