import React from 'react';
import SecondLine from './SecondLine/SecondLine'
import TopLine from './TopLine/TopLine'

import './Header.scss'

const Header = (props) => (
  <div className='container'>
    <div className='header-container'>
      <TopLine />
      <SecondLine />
    </div>

  </div>
);

export default Header;