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
  const [email, setEmail] = React.useState(null);
  const [first_name, setFName] = React.useState(null);
  const [last_name, setLName] = React.useState(null);
  const [middle_name, setMName] = React.useState(null);
  const [user_name, setUserName] = React.useState(null);

  React.useEffect(() => {
    setEmail(localStorage.getItem('email'));
    setFName(localStorage.getItem('first_name'));
    setLName(localStorage.getItem('last_name'));
    setMName(localStorage.getItem('middle_name'));
    setMName(localStorage.getItem('middle_name'));
    let name;
    if (
      createUserName({
        last: last_name,
        first: first_name,
        middle: middle_name
      }) == ''
    )
      name = email;
    else
      name = createUserName({
        last: last_name,
        first: first_name,
        middle: middle_name
      });
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
  if(user_name != null) return <Dropdown type="acc-menu" title={user_name} menuList={menu} />;
  else return <></>
  // return <Dropdown type="acc-menu" title={'Rfkfiybrjd Bdfy Dbnfkmtdbx'} menuList={menu} />;
};
export default Authored;
