import React from 'react';
import SecondLine from './SecondLine/SecondLine';
import TopLine from './TopLine/TopLine';
import MobileHeader from './MobileHeader/MobileHeader';
import Filter from 'components/Filter/Filter';
import './Header.scss';

const Header = props => {
  let header;

  if (document.documentElement.clientWidth >= 800) {
    header = (
      <>
        <TopLine />
        <SecondLine />
        <Filter />
      </>
    );
  } else {
    header = <MobileHeader />;
  }

  return (
    <div className="header-container">
      <div className="container">{header}</div>
    </div>
  );
};
export default Header;
