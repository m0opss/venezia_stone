import React from 'react';

import { Menu } from 'antd';
import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';

import DropdownLogin from 'components/Dropdown/DropdownLogin'
import Auth from './Auth/Auth'



const Unauthored = props => {
  
  const [isReg, setIsReg] = React.useState(false)
  const [visible, setVisible] = React.useState(false);

  const menu = (
    <Menu.Item key="1">
      <Auth
        isReg={isReg}
        setIsReg={setIsReg}
        setVisible={setVisible}
      />
    </Menu.Item>
  )

  return (
    <DropdownLogin
      visible={visible}
      setVisible={setVisible}
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