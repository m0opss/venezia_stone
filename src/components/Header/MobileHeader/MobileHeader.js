import React from 'react';
import { Link } from 'react-router-dom';

import Logo from 'components/Logo/Logo';

import Filter from 'components/Filter/Filter';
import BasketButton from '../TopLine/BasketButton/BasketButton';
import izbr from 'images/izbrannoe_icon.png';
import search from 'images/search.png';

import './MobileHeader.scss';

const MobileHeader = props => {
  return (
    <div className="top-line--mobile">
      <Logo />
      <BasketButton basket_counter="2" />
      <Link to="/izbrannoe" className="izbrannoe-button">
        <img src={izbr} />
      </Link>
      <div className="search-button">
        <img src={search} />
      </div>
      <Filter />
    </div>
  );
};
export default MobileHeader;
