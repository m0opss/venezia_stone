import React from 'react';

import './Footer.scss';
import Logo from 'components/Logo/Logo';

import { Icon } from '@iconify/react';

import vkIcon from '@iconify/icons-mdi/vk';
import facebookIcon from '@iconify/icons-mdi/facebook';
import instagrammIcon from '@iconify/icons-mdi/instagram';
import viberIcon from '@iconify/icons-whh/youtube';
import whatsappIcon from '@iconify/icons-whh/whatsapp';

import {
  MobileView,
  BrowserView,
  isMobile,
  isTablet
} from 'react-device-detect';

const Footer = props => {
  let style = '';
  if (!isTablet && isMobile) style = '-mobile-footer';
  return (
    <div className="footer__wrapper">
      <div className="container">
        <div className={`footer__container ${style}`}>
          <Logo />
          <div className="footer__contacts-info">
            Единый бесплатный номер:
            <br />8 (800) 100-5-888
          </div>
          <div className="footer__copyright">
            Copyright © 2011 – 2020. <br />
            Все права защищены.
          </div>
          <div className="footer__social">
            <a href="https://www.youtube.com/VeneziaStoneCompany" target='_blank' >
              <Icon
                icon={viberIcon}
                color="red"
                width="1.5em"
                height="1.5em"
              />
            </a>
            <a href="https://vk.com/venezia.stone" target='_blank' >
              <Icon
                icon={vkIcon}
                color="#4D76A1"
                width="1.5em"
                height="1.5em"
              />
            </a>
            <a href="https://www.facebook.com/veneziastone" target='_blank' >
              <Icon
                icon={facebookIcon}
                color="#3B5998"
                width="1.5em"
                height="1.5em"
              />
            </a>
            <a href="https://www.instagram.com/venezia.stone.company/" target='_blank' >
              <Icon
                icon={instagrammIcon}
                width="1.5em"
                height="1.5em"
              />
            </a>
            <a  href="https://api.whatsapp.com/send?phone=+79771005888" target='_blank' >
              <Icon
                icon={whatsappIcon}
                color="#4CAF50"
                width="1.5em"
                height="1.5em"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
