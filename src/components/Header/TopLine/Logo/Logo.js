import React from 'react';

import {Link} from "react-router-dom"

import logo from "images/header-logo.png"

import "./Logo.scss"

const Logo = props => {
  return (
    <div className="top-line__logo">
      <Link to='/'>
        <img src={logo} alt=""/>
      </Link>
    </div>
  )
}
export default Logo