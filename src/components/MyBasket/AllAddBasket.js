import React, { useEffect } from 'react';

import basket from 'images/basket-4lvl.png';
import arr from 'images/arr-4lvl.png';
import basketActions from 'actions/basketActions';
import { connect } from 'react-redux';

const AllAddBasket = props => {
  const [state, setState] = React.useState(true);
  console.log(props.goods)
  // useEffect(() => {
  //   props.basket.map(item => {
  //     props.goods.map(g => {
  //       if (item.ps == g.ps) setState(false);
  //     });
  //   });
  // });

  const onClickItem = e => {
    if (e.target.id == 'add') {
      props.goods.map(g => {
        let flag = false;
        props.basket.map(i => {
          if (i.ps == g.ps) flag = true;
        });
        if (!flag) props.addGood(g);
        // if (!props.basket.includes(g)) props.addGood(g);
      });
    } else {
      props.goods.map(g => {
        let flag = false;
        props.basket.map(i => {
          if (i.ps == g.ps) flag = true;
        });
        if (!flag) props.deleteGood(g);
        if (props.basket.includes(g)) props.deleteGood(g);
      });
    }
    setState(!state);
  };
  if (state) {
    return (
      <>
        <img src={arr} />
        <img id="add" src={basket} onClick={onClickItem} />
      </>
    );
  } else {
    return (
      <>
        <img src={arr} />
        <img id="delete" src={basket} onClick={onClickItem} />
      </>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(AllAddBasket);
