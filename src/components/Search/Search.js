import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import DropdownSearch from 'components/Dropdown/DropdownSearch';

import searchClear from 'images/searchClear.png';
import find from 'images/find.png';
import './Search.scss';

const Search = props => {
  const [dropVisible, setDropVisible] = React.useState(false);
  const [searchActive, setsearchActive] = React.useState(false);
  const [searchVisible, setSearchVisible] = React.useState(true);
  const [styleVisible, setStyleVisible] = React.useState('');
  const [searchVal, setSearchVal] = React.useState('');
  const [menu, setMenu] = React.useState();

  const onClickMinimize = () => {
    setSearchVisible(false);
    setStyleVisible('search-unvisible');
  };

  const onBlurSearch = e => {
    setSearchVal(e.target.value);
    setsearchActive(false);
  };

  const checkresponse = result => {
    let arr = Object.keys(result).map((k, index) => {
      // return {}
    });
    let menu = <div className=""></div>;

    setMenu(menu);
    setDropVisible(true);
  };

  const onClickSearch = () => {
    if (searchVisible) {
      axios
        .get(`https://catalog-veneziastone.ru/api_v0/Search/${searchVal}/`)
        .then(response => {
          console.log(response);
          checkresponse(response.data);
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(1, err.response);
            // props.setAuth(false);
          } else if (err.request) {
            // client never received a response, or request never left
            console.log(2, err.request);
          } else {
            // anything else
            console.log(3, err);
          }
        });
    }
    setSearchVisible(true);
    setStyleVisible('');
  };

  return (
    <div
      className={`search ${searchActive ? 'search-active' : ''} ${styleVisible} 
      `}
    >
      <DropdownSearch
        visible={dropVisible}
        setVisible={setDropVisible}
        menuList={menu}
      />
      <input
        id="search"
        placeholder="Поиск"
        defaultValue={props.searchVal}
        onChange={props.onChangeSearch}
        onFocus={() => setsearchActive(true)}
        onBlur={onBlurSearch}
      />
      <img src={find} onClick={onClickSearch} />
      <img src={searchClear} onClick={onClickMinimize} />
    </div>
  );
};
export default Search;
