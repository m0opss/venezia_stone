import React from 'react';

import { Link } from 'react-router-dom';

import logo from 'images/header-logo-m.png';

import './Logo.scss';

const MobileLogo = props => {
  return (
    <Link to="/" className="top-line__logo">
      <img src={logo} alt="" />
      <div className="logo__text">
        <p className="logo__line-1 -mobile">Venezia</p>
        <p className="logo__line-2 -mobile">stone company</p>
      </div>
    </Link>
  );
};
export default MobileLogo;
