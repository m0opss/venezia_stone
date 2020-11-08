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
    setStyleVisible('search-invisible');
  };

  const onBlurSearch = e => {
    setSearchVal(e.target.value);
    setsearchActive(false);
  };

  const checkresponse = result => {
    let arr = Object.keys(result).map (
      (k, index) =>
        k == 'mts' ? (
          <Link key={k} to="/" className="search-drop-line">
            Материалы <span>совпадений - {result[k].length}</span>
          </Link>
        ) : k == 'grs' ? (
          <Link key={k} to="/" className="search-drop-line">
            Номенклатурные группы <span>совпадений - {result[k].length}</span>
          </Link>
        ) : k == 'itms' ? (
          <Link key={k}  to="/" className="search-drop-line">
            Номенклатуры <span>совпадений - {result[k].length}</span>
          </Link>
        ) : k == 'prs' ? (
          <Link key={k} to="/" className="search-drop-line">
            Продукты <span>совпадений - {result[k].length}</span>
          </Link>
        ) : (
          <></>
        )
    );
    let menu = <div className="search-drop-lines">
      {arr}
    </div>
    
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
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClickSearch()
    }
  }

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
        onKeyPress={handleKeyPress}
        onFocus={() => setsearchActive(true)}
        onBlur={onBlurSearch}
      />
      <img src={find} onClick={onClickSearch} />
      <img src={searchClear} onClick={onClickMinimize} />
    </div>
  );
};
export default Search;
