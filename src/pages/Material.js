import React from 'react';
import { connect } from 'react-redux';

import { Link, Route } from 'react-router-dom';
import goodActions from '../actions/goodAction';
import MaterialItem from '../components/Content/MaterialItem/MaterialItem';
import Filter from 'components/Filter/Filter';
import { MobileView, BrowserView, isTablet } from 'react-device-detect';

const Material = props => {
  let materialID = parseInt(props.match.params.materialID);
  React.useEffect(() => {
    if (props.data.mts[materialID] != undefined)
      props.setGoodArray(props.data.mts[materialID].invgrps);
  });

  const handleClick = index => {
    // console.log(props.data.mts[materialID].invgrps[index].invitems)
    // props.setGoodArray(props.data.mts[materialID].invgrps[index].invitems)
  };

  return (
    <div className="home-container">
      <BrowserView>
        <Filter />
      </BrowserView>
      <div className="catalog-items-group">
        {props.goodArray.map((item, index) => {
          return (
            <Link to={`/material/${materialID}/${index}`} key={index}>
              <MaterialItem
                item={item}
                itemName={item.invgrp}
                itemImg={item}
                key={item.invgrpid}
                onClick={() => handleClick(index)}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = store => {
  return {
    goodArray: store.goodArray.goodArray,
    data: store.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGoodArray: data => {
      dispatch(goodActions.setGoodArray(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Material);
