import React from 'react';

import { Menu } from 'antd';


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
      title={ props.title}
      menuList={menu}
    />
  )
}
export default Unauthored