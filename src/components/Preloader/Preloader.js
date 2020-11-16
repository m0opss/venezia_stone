import React from 'react';
import { Spin } from 'antd';

import { Loading3QuartersOutlined } from '@ant-design/icons';

import './Preloader.scss';

const antIcon = <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />;

const Preloader = props => {
  if (props.isLoading) {
    return (
      <div className="preloader-wrapper">
        <Spin indicator={antIcon} size="large" />
      </div>
    );
  } else {
    return <>{props.children}</>;
  }
};
export default Preloader;
