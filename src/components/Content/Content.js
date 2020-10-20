import React from 'react';

import Routes from './Routes';

import './Content.scss';
const Content = props => (
  <div className="content">
    <div className="container">
      <Routes data={props.data} />
    </div>
  </div>
);

export default Content;
