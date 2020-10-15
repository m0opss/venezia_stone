import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import materialActions from '../actions/materialAction';
import dataActions from 'actions/dataAction';

import NumenclatureItem from '../components/Content/NumenclatureItem/NumenclatureItem';


const Numenclature = props => {
  console.log(props)
  const [numemclature, setNumemclature] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`http://92.63.103.180:8000/api_v0${props.match.url}/`)
      .then(response => {
        // props.setNumGroups(response.data);
        // setNumGroups(response.data.grs);
        setNumemclature(response.data.itms)
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <div className="numenclature-container">
      <div className="catalog-items-group">
        {numemclature.map((item, index) => (
          <NumenclatureItem
            key={item.id}
            img={item.photo}
            link={props.match.url + '/' + item.id}
            item={item}
            itemName={item.gr}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    selectedMaterial: store.material.selectedMaterial,
    data: store.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedMaterial: data => {
      dispatch(materialActions.setSelectedMaterial(data));
    },
    setNumGroups: data => {
      dispatch(dataActions.setNumGroups(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Numenclature);
