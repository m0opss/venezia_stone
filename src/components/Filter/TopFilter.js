import { connect } from 'react-redux';
import React from 'react';
import filterActions from 'actions/filterActions';
import { isMobile, isTablet } from 'react-device-detect';

const TopFilter = props => {
  React.useEffect(() => {
    console.log(props, props.upper_izd);
    if (props.all_upper) {
      props.all_upper.map(izd => {
        if (props.upper_izd.includes(izd)) {
          document.getElementById(izd).setAttribute('style', 'color: #c98505');
        } else {
          document.getElementById(izd).setAttribute('style', 'color: black');
        }
      });
    }
  });

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
      // if (!isMobile) {
      // document
      //   .getElementById(e.target.id)
      //   .setAttribute('style', 'color: #c98505');
      // }
    } else {
      // if (!isMobile) {
      // document
      //   .getElementById(e.target.id)
      //   .setAttribute('style', 'color: black');
      // }
      newArr.splice(newArr.indexOf(e.target.id), 1);
    }
    props.setUpper(newArr);
  };

  if (isMobile && !isTablet) {
    return (
      <>
        {props.all_upper ? (
          props.all_upper.map(i => (
            <div className="top-mobile-filter-line" key={i}>
              <div
                id={i}
                className="second-line__filter-button"
                onClick={setFilterParam}
              >
                {i}
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </>
    );
  } else {
    return (
      <>
        {props.all_upper.map(i => (
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
    activeFields: store.filter_data.activeFields,
    upper_izd: store.filter_data.upper_izd,
    all_upper: store.filter_data.all_upper
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
