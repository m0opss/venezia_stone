import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import filterActions from '../actions/filterActions';

import MaterialItem from '../components/Content/MaterialItem/MaterialItem';
import Filter from 'components/Filter/Filter';
import { isTablet, isBrowser, isMobile } from 'react-device-detect';

import './Home.scss';

const Home = props => {
  React.useEffect(() => {
    if (!isMobile) {
      document.body.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
    if (localStorage.getItem('activeFilters') !== null) {
      let tmp = JSON.parse(localStorage.getItem('activeFilters'));
      tmp.materials = [];
      localStorage.setItem('activeFilters', JSON.stringify(tmp));
    }
    if (localStorage.getItem('activeFieldKeys') !== null) {
      let tmp = JSON.parse(localStorage.getItem('activeFieldKeys'));
      tmp = tmp.filter(f => {
        if (f[0] != '0') {
          return f;
        }
      });
      props.setActiveFields(tmp);
      localStorage.setItem('activeFieldKeys', JSON.stringify(tmp));
    }
    props.setData(JSON.parse(localStorage.getItem('searchData')).mts);
  }, [localStorage.getItem('searchData')]);

  return (
    <div className="">
      <div className="home-container">
        {isTablet || isBrowser ? <Filter /> : <></>}

        <div id="main-group" className="catalog-items-group">
          {props.data ? (
            props.data.mts.map(item => (
              <MaterialItem
                img={item.photo_material}
                link={item.ph}
                item={item}
                itemName={item.mt}
                key={item.mt}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    data: store.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMatList: data => {
      dispatch(filterActions.setMatList(data));
    },
    setActiveFields: data => {
      dispatch(filterActions.setActiveFields(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
