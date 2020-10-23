import React from 'react';

import './Footer.scss';
import Logo from 'components/Logo/Logo';

import { Link } from "react-router-dom"
import {Icon} from '@iconify/react';

import vkIcon from '@iconify/icons-mdi/vk';
import facebookIcon from '@iconify/icons-mdi/facebook';
import telegramIcon from '@iconify/icons-mdi/telegram';
import viberIcon from '@iconify/icons-whh/viber';
import whatsappIcon from '@iconify/icons-whh/whatsapp';

import {
  MobileView,
  BrowserView,
  isMobile,
  isTablet
} from 'react-device-detect';

const Footer = props => {
  let style = ''
  if(!isTablet && isMobile) style = '-mobile-footer'
  return (
    <div className="container">
      <div className={`footer__container ${style}`}>
        <Logo />
        <div className="footer__contacts-info">
          Единый бесплатный номер:<br /> 
          8 (800) 100-5-888
        </div>
        <div className="footer__copyright">
          Copyright © 2011 – 2020. <br />Все права защищены.
        </div>
        <div className="footer__social">
            <Link to='#'>
              <Icon icon={viberIcon} color='#6F3FAA' width="1.5em" height="1.5em"/>
            </Link>
            <Link to='#'>
              <Icon icon={vkIcon} color='#4D76A1' width="1.5em" height="1.5em"/>
            </Link>
            <Link to='#'>
              <Icon icon={facebookIcon} color='#3B5998' width="1.5em" height="1.5em"/>
            </Link>
            <Link to='#'>
              <Icon icon={telegramIcon} color='#039BE5' width="1.5em" height="1.5em"/>
            </Link>
            <Link to='#'>
              <Icon icon={whatsappIcon} color='#4CAF50' width="1.5em" height="1.5em"/>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;


