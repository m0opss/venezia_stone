import { connect } from 'react-redux';
import React from 'react';
import filterActions from 'actions/filterActions';
import { isMobile, isTablet } from 'react-device-detect';
import { Menu } from 'antd';

export const TopFilter = props => {
  const up_filter = [
    'Слэбы',
    'Полоса',
    'Плитка',
    'Ступени',
    'Брусчатка',
    'Мозайка из камня',
    'Бордюр',
    'Прочее'
  ];

  const setFilterParam = e => {
    let t = [...props.activeFields];
    if (t.indexOf(e.target.id) !== -1) {
      t.splice(t.indexOf(e.target.id), 1);
    } else {
      t.push(e.target.id);
    }
    props.setActiveFields(t);
    localStorage.setItem('activeFieldKeys', JSON.stringify(t));

    let newArr = [...props.upper_izd];
    if (newArr.indexOf(e.target.id) === -1) {
      newArr.push(e.target.id);
      document
        .getElementById(e.target.id)
        .setAttribute('style', 'color: #c98505');
    } else {
      document
        .getElementById(e.target.id)
        .setAttribute('style', 'color: black');
      newArr.splice(newArr.indexOf(e.target.id), 1);
    }
    props.setUpper(newArr);
    // props.f_share();
  };

  if (isMobile && !isTablet) {
    return (
      <>
        {up_filter.map(i => (
          <div className="top-mobile-filter-line" key={i}>
            <div
              id={i}
              className="second-line__filter-button"
              onClick={setFilterParam}
            >
              {i}
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        {up_filter.map(i => (
          <div
            id={i}
            key={i}
            className="second-line__filter-button"
            onClick={setFilterParam}
          >
            {i}
          </div>
        ))}
      </>
    );
  }
};

const mapStateToProps = store => {
  return {
    f_share: store.filter_data.f_share,
    activeFields: store.filter_data.activeFields,
    upper_izd: store.filter_data.upper_izd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUpper: data => {
      dispatch(filterActions.setUpper(data));
    },
    setActiveFields: data => {
      dispatch(filterActions.setActiveFields(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopFilter);
