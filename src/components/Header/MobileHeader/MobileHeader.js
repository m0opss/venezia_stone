import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Logo from 'components/Logo/MobileLogo';
import Filter from 'components/Filter/Filter';
import MobileDropdown from 'components/Dropdown/MobileDropdown';
import BasketButton from '../TopLine/BasketButton/BasketButton';
import MenuList from './MenuList';

// import izbr from "images/izbrannoe_icon.svg"
import izbr from 'images/izbrannoe_icon.png';
import search from 'images/search.svg';

import './MobileHeader.scss';

const MobileHeader = props => {
  const { match, history } = props;

  const setFilterParam = e => {
    console.log(e.target.id);
    history.push('/');
  };
  console.log('mobile', props)
  return (
    <div className="top-line--mobile">
      <Logo />
      <BasketButton basket_counter="2" />
      {props.isAuth ? (
        <Link to="/izbrannoe" className="izbrannoe-button">
          <img className="-icon" src={izbr} />
        </Link>
      ) : (
        <></>
      )}
      <div className="search-button">
        <img className="-icon" src={search} />
      </div>
      <Filter />
      <MobileDropdown
        type="-mobile"
        menuList={<MenuList setFilterParam={setFilterParam} />}
      />
    </div>
  );
};

export default withRouter(MobileHeader);
