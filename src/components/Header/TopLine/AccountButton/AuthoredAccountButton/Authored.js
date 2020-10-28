import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import Dropdown from 'components/Dropdown/Dropdown';

const Authored = props => {
  const [userInfo, setUserInfo] = React.useState(props.user_info);

  React.useEffect(() => {
    // console.log(userName);
  }, [userInfo]);

  const onExitModal = () => {
    props.setAuth(false);
    props.setToken('');
  };

  let userName = '';
  const arr = [
    props.user_info.last_name,
    props.user_info.first_name,
    // props.user_info.first_name[0] + '.',
    props.user_info.middle_name
    // props.user_info.middle_name[0] + '.'
  ];

  arr.map(name => {
    if (name != null) {
      userName += name + ' ';
    }
  });

  if (
    props.user_info.last_name == null &&
    !props.user_info.first_name == null &&
    !props.user_info.middle_name == null
  )
    userName = props.user_info.email;

  // console.log(userName, userName);
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
