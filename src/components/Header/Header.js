import React from 'react';
import SecondLine from './SecondLine/SecondLine'
import TopLine from './TopLine/TopLine'

import './Header.scss'

const Header = () => (
  <div className='header-container'>
      <TopLine/>
      <SecondLine />
  </div>
);

export default Header;