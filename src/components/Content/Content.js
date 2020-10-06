import React from 'react';

import Routes from './Routes'

import './Content.scss'

const Content = (props) => (
  <div className="content">
    <Routes data={props.data}/>
  </div>
);

export default Content;