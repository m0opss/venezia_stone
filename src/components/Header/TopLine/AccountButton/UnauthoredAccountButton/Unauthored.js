import React from 'react';

import { Menu } from 'antd';
import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';

import DropdownLogin from 'components/Dropdown/DropdownLogin'
import Login from './Login/Login'



const Unauthored = props => {
  
  const [isReg, setIsReg] = React.useState(false)

  const menu = (
    <Menu.Item key="1">
      <Login
        isReg={isReg}
        setIsReg={setIsReg}
        func={props.func}
      />
    </Menu.Item>
  )

  return (
    <DropdownLogin
      type='login'
      setIsReg={setIsReg}
      title={
        <Icon
          type='login'
          icon={accountIcon}
          color="#C98505"
          width="2em"
          height="2em"
        />}
      menuList={menu}
    />
  )
}
export default Unauthored