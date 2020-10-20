import React from 'react';

import { CaretDownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

import './Dropdown.scss';

const DropdownLogin = props => {
  const [state, setState] = React.useState({
    visible: props.visible,
    title: props.title
  });

  const setLoginPanel = () => {
    props.setIsReg(false);
  };

  React.useEffect(() => {
    if (state.visible == false) {
      setTimeout(setLoginPanel, 300);
    }
  }, [state.visible]);

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
      overlayClassName="dropdown-login"
      visible={props.visible}
      placement="bottomRight"
    >
      <a className={`-${props.type}`} onClick={e => e.preventDefault()}>
        {state.title} <CaretDownOutlined />
      </a>
    </Dropdown>
  );
};

export default DropdownLogin;
