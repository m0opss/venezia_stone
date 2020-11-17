import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import Search from 'components/Search/Search';
import TopFilter from 'components/Filter/TopFilter';
import { Menu } from 'antd';
import './SecondLine.scss';
import 'antd/dist/antd.css';

const SecondLine = props => {
  const { match, history } = props;

  return (
    <div className="second-line">
      <TopFilter />
      <Link to="/contacts">Контакты</Link>
      <Search />
    </div>
  );
};
export default withRouter(SecondLine);
