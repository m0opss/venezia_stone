import React, { useEffect } from 'react';

import arr from 'images/arr-4lvl.png';
import like from 'images/izbr_icon.svg';
import like_a from 'images/izbr_icon_accent.svg';
import { connect } from 'react-redux';
import axios from 'axios';
import izbrActions from 'actions/izbrActions';

const AllAddIzbr = props => {
  const [state, setState] = React.useState(true);

  const onFetchItem = (id, ps) => {
    axios
      .post(`https://catalog-veneziastone.ru/api_v0/${id}/`, {
        token: props.auth_token,
        id_product: ps
      })
      .then(response => {
        axios
          .post(
            `https://catalog-veneziastone.ru/api_v0/showSelectedFavourite/`,
            {
              token: localStorage.getItem('auth_token')
            }
          )
          .then(response => {
            props.setIzbrPs(response.data.products);
          })
          .catch(err => {
            if (err.response) {
              // client received an error response (5xx, 4xx)
              console.log(1, err.response);
              // props.setAuth(false);
            } else if (err.request) {
              // client never received a response, or request never left
              console.log(2, err.request);
            } else {
              // anything else
              console.log(3, err);
            }
          });
      });
  };

  const onClickItem = e => {
    if (e.target.id == 'addFavourite') {
      props.goods.map(g => {
        let flag = false;
        props.izbr.map(i => {
          if (i.ps == g.ps) flag = true;
        });
        if (!flag) onFetchItem(e.target.id, g.ps);
      });
    } else {
      props.goods.map(g => {
        let flag = false;
        props.izbr.map(i => {
          if (i.ps == g.ps) flag = true;
        });
        if (!flag) onFetchItem(e.target.id, g.ps);
      });
    }
    setState(!state);
  };

  if (props.isAuth) {
    if (state) {
      return (
        <>
          <img src={arr} />
          <img id="addFavourite" src={like} onClick={onClickItem} />
        </>
      );
    } else {
      return (
        <>
          <img src={arr} />
          <img id="deleteFavourite" src={like_a} onClick={onClickItem} />
        </>
      );
    }
  } else {
    return <></>;
  }
};

const mapStateToProps = store => {
  return {
    isAuth: store.auth_data.isAuth,
    auth_token: store.auth_data.auth_token,
    izbr: store.izbr_data.izbrPsList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setIzbrPs: data => {
      dispatch(izbrActions.setIzbrPs(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllAddIzbr);
