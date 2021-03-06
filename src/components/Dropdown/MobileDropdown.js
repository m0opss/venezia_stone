import React from 'react';

import { Menu, Dropdown } from 'antd';

import burger from 'images/burger.svg';

import './Dropdown.scss';

const MobileDropdown = props => {
  const [state, setState] = React.useState({
    visible: false
  });

  const handleMenuClick = e => {
    setState({
      ...state,
      visible: false
    });
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
      overlayClassName='dropdown-mobile'
      visible={state.visible}
    >
      <div className={`${props.type}`} onClick={e => e.preventDefault()}>
        <img src={burger} className='-icon'/>
      </div>
    </Dropdown>
  );
};

export default MobileDropdown;
