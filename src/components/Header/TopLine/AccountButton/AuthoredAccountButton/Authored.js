import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import Dropdown from 'components/Dropdown/Dropdown';

function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}
const createUserName = arr => {
  let userName = '';
  Object.keys(arr).map(name => {
    if (arr[name] != null) {
      if (name === 'last') userName += ucFirst(arr[name]) + ' ';
      else userName += arr[name][0].toUpperCase() + '. ';
    }
  });

  return userName;
};
const Authored = props => {
  const [userName, setUserName] = React.useState('');

  const arr = {
    last: props.user_info.last_name,
    first: props.user_info.first_name,
    middle: props.user_info.middle_name
  };

  React.useEffect(() => {
    let name;
    if ((createUserName(arr) == '')) name = props.user_info.email;
    else name = createUserName(arr);
    setUserName(name);
  });

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
  return <Dropdown type="acc-menu" title={userName} menuList={menu} />;
  // return <Dropdown type="acc-menu" title={'Rfkfiybrjd Bdfy Dbnfkmtdbx'} menuList={menu} />;
};
export default Authored;
