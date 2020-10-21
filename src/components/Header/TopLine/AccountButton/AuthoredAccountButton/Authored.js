import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import Dropdown from 'components/Dropdown/Dropdown';

const Authored = props => {
  const onExitModal = () => {
    props.setAuth(false);
    props.setToken('');
  };

  const menu = (
    <>
      <Menu.Item key="1">
        <Link to="/personal-data">Персональные данные</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/history">История просмотров</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/izbrannoe">Избранное</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <div
          className="exit-button"
          style={{ cursor: 'pointer' }}
          onClick={onExitModal}
        >
          Выйти
        </div>
      </Menu.Item>
    </>
  );
  return (
    <Dropdown type="acc-menu" title={'Иванов Иван Иванович'} menuList={menu} />
  );
};
export default Authored;
