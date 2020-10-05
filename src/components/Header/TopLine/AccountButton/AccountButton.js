import React from 'react';

import {Icon} from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';
import "./AccountButton.scss"

const AccountButton = props => {
  return (
    <div className="top-line__account">
      <Icon icon={accountIcon} color="#C98505" width="2em" height="2em"/>
    </div>
  )
}
export default AccountButton