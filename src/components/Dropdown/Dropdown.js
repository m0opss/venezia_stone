import React from 'react';

import { CaretDownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Dropdown.scss';

const MyDropdown = props => {
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    setTitle(props.title)
  }, [props.title]);

  const handleMenuClick = e => {
    if (props.type == 'login') {
      setVisible(true);
    }
    if (props.type == 'city') {
      setVisible(false);
      setTitle(menu.props.children[e.key].props.children);
    } else {
      setVisible(false);
    }
  };

  const handleVisibleChange = flag => {
    setVisible(flag)
  };

  const menu = <Menu onClick={handleMenuClick}>{props.menuList}</Menu>;

  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      trigger={['click']}
      visible={visible}
      arrow={true}
    >
      <a className={`-${props.type}`} onClick={e => e.preventDefault()}>
        {title} {props.type != 'city' ? <DownOutlined /> : <></>}
      </a>
    </Dropdown>
  );
};

export default MyDropdown;
