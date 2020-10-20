import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import filterActions from '../actions/filterActions';
import dataActions from 'actions/dataAction';
import MaterialItem from '../components/Content/MaterialItem/MaterialItem';


import './Home.scss';

const Home = props => {
  React.useEffect(() => {
    axios
      .get('http://92.63.103.180:8000/api_v0/getMaterials/')
      .then(response => {
        props.getDataResponse(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <div className="home-container">
      <h1>Натуральный камень в наличии</h1>
      <div className="catalog-items-group">
        {props.data.mts.map((item) => (
          <MaterialItem
            img={item.photo_material}
            link={item.ph}
            item={item}
            itemName={item.mt}
            key={item.mt}
          />
        ))}
      </div>
      <div className="home-bottom-links">
        <div className="home-bottom-links__link">
          <span>Распродажа</span>
        </div>
        <div className="home-bottom-links__link">Новые поступления камня</div>
        <div className="home-bottom-links__link">Товары в поступления </div>
      </div>

    </div>
  );
};

const mapStateToProps = store => {
  return {
    data: store.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataResponse: data => {
      dispatch(dataActions.getDataResponse(data));
    },
    setMatList: data => {
      dispatch(filterActions.setMatList(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
