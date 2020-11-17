import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Logo from 'components/Logo/MobileLogo';
import Filter from 'components/Filter/Filter';
import MobileDropdown from 'components/Dropdown/MobileDropdown';
import BasketButton from '../TopLine/BasketButton/BasketButton';
import MenuList from './MenuList';
import Search from 'components/Search/Search';
import DropdownSearch from 'components/Dropdown/DropdownSearch';

// import izbr from "images/izbrannoe_icon.svg"
import izbr from 'images/izbrannoe_icon.png';
import search from 'images/search.svg';

import './MobileHeader.scss';

const MobileHeader = props => {
  const [dropVisible, setDropVisible] = React.useState(false);
  const [menu, setMenu] = React.useState();


  const clickSearch = () => {
    let menu = (
      <div className="search-drop-lines">
        <Search />
      </div>
    );
    setMenu(menu);
    setDropVisible(true)
  };

  return (
    <div className="top-line--mobile">
      <Logo />
      <BasketButton />
      {props.isAuth ? (
        <Link to="/izbrannoe" className="izbrannoe-button">
          <img className="-icon" src={izbr}  />
        </Link>
      ) : (
        <></>
      )}
      <div className="search-button">
        <img className="-icon" src={search} onClick={clickSearch}/>
      </div>
      <Filter />
      <MobileDropdown type="-mobile" menuList={<MenuList />} />
      <DropdownSearch
        visible={dropVisible}
        setVisible={setDropVisible}
        menuList={menu}
      />
    </div>
  );
};

export default withRouter(MobileHeader);
