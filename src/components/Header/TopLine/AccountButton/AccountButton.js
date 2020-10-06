import React from 'react';

import Authored from './AuthoredAccountButton/Authored'
import Unauthored from './UnauthoredAccountButton/Unauthored'

import "./AccountButton.scss"

const AccountButton = props => {
  let isLogging = true
  return (
    <div className="top-line__account">
      {isLogging
        ? <Authored />
        : <Unauthored />
      }

    </div>
  )
}
export default AccountButton