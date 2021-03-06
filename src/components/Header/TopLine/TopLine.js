import React from 'react';
import { Link } from 'react-router-dom';

import SocialContacts from './SocialContacts/SocialContacts';
import ChooseCity from './ChooseCity/ChooseCity';
import Logo from 'components/Logo/Logo';
import AccountButton from './AccountButton/AccountButton';
import BasketButton from './BasketButton/BasketButton';
import izbr from 'images/izbr_icon.svg';
import { connect } from 'react-redux';

import './TopLine.scss';



const TopLine = props => {
  const [city, setCity] = React.useState('Москва')
  return (
    <div className="top-line">
      <div className="top-line__left-block">
        <Logo />
      </div>
      <div className="top-line__center-block">
        <SocialContacts city={city}/>
        <ChooseCity setCity={setCity} city={city}/>
      </div>
      <div className="top-line__right-block">
        <AccountButton />
        {props.isAuth ? (
          <Link to="/izbrannoe" className="izbrannoe-button">
            <img src={izbr} alt="" />
          </Link>
        ) : (
          <></>
        )}
        <BasketButton />
      </div>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    isAuth: store.auth_data.isAuth
  };
};
export default connect(mapStateToProps)(TopLine);
