import React, { useEffect } from 'react';

import basket_icon_black from 'images/basket_icon_black.svg';
import basket_icon_accent from 'images/basket_icon_accent.svg';
import basketActions from 'actions/basketActions';
import { connect } from 'react-redux';

const ItemAddBasket = props => {
  const [state, setState] = React.useState(true);

  useEffect(() => {
    setState(true)
    props.basket.map(item => {
      if(item.ps == props.item.ps) setState(false)

    })
  })

  const onClickItem = e => {
    if (e.target.id == 'add') {
      props.addGood(props.item);
    } else {
      props.deleteGood(props.item);
    }
    setState(!state);
  };
  if (state) {
    return <img id="add" src={basket_icon_black} onClick={onClickItem} />;
  } else {
    return <img id="delete" src={basket_icon_accent} onClick={onClickItem} />;
  }
};
const mapStateToProps = store => {
  return {
    basket: store.basket_data.basket
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addGood: data => {
      dispatch(basketActions.addGood(data));
    },
    deleteGood: data => {
      dispatch(basketActions.deleteGood(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemAddBasket);
