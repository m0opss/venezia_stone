import React from 'react';
import { connect } from 'react-redux';
import izbr_icon_accent from 'images/izbr_icon_accent.svg';
import izbr_icon from 'images/izbr_icon.svg';
import axios from 'axios';

const ItemAddIzbr = props => {
  const [state, setState] = React.useState(true);

  const onFetchItem = id => {
    axios
      .post(`https://catalog-veneziastone.ru/api_v0/${id}/`, {
        token: props.auth_token,
        id_product: props.item.ps
      })
      .then(response => {
        console.log('added');
      });
  };
  const clickItemIzbr = e => {
    onFetchItem(e.target.id);
    setState(!state);
  };
  if (props.isAuth) {
    if (state) {
      return <img id="addFavourite" src={izbr_icon} onClick={clickItemIzbr} />;
    } else {
      return (
        <img
          id="deleteFavourite"
          src={izbr_icon_accent}
          onClick={clickItemIzbr}
        />
      );
    }
  } else {
    return <></>;
  }
};

const mapStateToProps = store => {
  return {
    isAuth: store.auth_data.isAuth,
    auth_token: store.auth_data.auth_token
  };
};

export default connect(mapStateToProps)(ItemAddIzbr);
