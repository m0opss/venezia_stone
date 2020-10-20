import React from 'react';

import { Link } from 'react-router-dom';

import logo from 'images/header-logo.png';

import './Logo.scss';

const Logo = props => {
  return (
    <Link to="/" className="top-line__logo">
      <img src={logo} alt="" />
      <div className="logo__text">
        <p className="logo__line-1">Venezia</p>
        <p className="logo__line-2">stone company</p>
        <p className="logo__line-3">с нами выгодно и надежно</p>
      </div>
    </Link>
  );
};
export default Logo;
