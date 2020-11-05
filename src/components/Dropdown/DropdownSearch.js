import React from 'react';

import { CaretDownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

import './Dropdown.scss';

const DropdownSearch = props => {
  const [state, setState] = React.useState({
    visible: props.visible,
    title: props.title
  });


  const handleVisibleChange = flag => {
    setState({
      ...state,
      visible: flag
    });
    props.setVisible(flag)
  };

  const menu = <Menu>{props.menuList}</Menu>;

  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      trigger={['click']}
      overlayClassName="dropdown-search"
      visible={props.visible}
      placement="bottomCenter"
    >
      <div className=""></div>
    </Dropdown>
  );
};

export default DropdownSearch;
