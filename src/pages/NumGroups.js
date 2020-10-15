import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Numenclature from 'pages/Numenclature';
import materialActions from '../actions/materialAction';
import dataActions from 'actions/dataAction';

import NumGroupItem from '../components/Content/NumGroupItem/NumGroupItem';

const NumGroups = props => {
  const [numGroups, setNumGroups] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`http://92.63.103.180:8000/api_v0/${props.match.params.material}/`)
      .then(response => {
        props.setNumGroups(response.data);
        setNumGroups(response.data.grs);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <div className="num-groups-container">
      <div className="catalog-items-group">
        {numGroups.map((item, index) => (
          <NumGroupItem
            key={item.id}
            img={item.photo}
            link={props.match.url + '/' + item.id}
            item={item}
            itemName={item.gr}
            id={item.id}
          />
        ))}
        <Route
          path={`/${props.match.params.material}/:numGroups`}
          component={Numenclature}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(NumGroups);
