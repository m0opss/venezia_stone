import React, { useEffect } from 'react';
import axios from "axios";
import Authored from './AuthoredAccountButton/Authored';
import Unauthored from './UnauthoredAccountButton/Unauthored';

import "./AccountButton.scss";

const AccountButton = props => {
  let [isAuth, setAuth, setToken] = props.authArr.authArr
  // const [token, setToken] = React.useState('')
  React.useEffect(() => {

    // axios.post('http://89.223.120.3:8000/api/v0/account/finish_reset_password/', {
    //   username: phoneValue,
    //   password: passValue,
    //   code: resetSms
    // })
    //   .then(response => {
    //     if (response.data.success === 'True') {

    //     } else {

    //     }
    //   })
    //   .catch(e => { console.log(e) })

  }, [])

  return (
    <div className="top-line__account">
      {isAuth
        ? <Authored />
        : <Unauthored func={[setAuth, setToken]}/>
      }

    </div>
  )
}
export default AccountButton