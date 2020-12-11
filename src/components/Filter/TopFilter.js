import { connect } from 'react-redux';
import React from 'react';
import filterActions from 'actions/filterActions';
import { isMobile, isTablet } from 'react-device-detect';
import axios from 'axios';

import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { Link } from 'react-router-dom';

const TopFilterItem = props => {
  const [state, setState] = React.useState({});

  const fetchIzd = e => {
    axios
      .get(`https://catalog-veneziastone.ru/api_v0/upperFilter/${e}/`)
      .then(res => {
        setState(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div
      id={props.elem}
      className="second-line__filter-button"
      onClick={() => fetchIzd(props.elem)}
    >
      <Menu menuButton={<MenuButton>{props.elem}</MenuButton>}>
        {Object.keys(state).length > 0 ? (
          Object.keys(state).map(mat => (
            <SubMenu label={mat} key={mat}>
              {state[mat].map(gr => (
                <MenuItem key={gr['gr']}>
                  <Link to={gr['route']}>{gr['gr']}</Link>
                </MenuItem>
              ))}
            </SubMenu>
          ))
        ) : (
          <MenuItem> </MenuItem>
        )}
      </Menu>
    </div>
  );
};

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

  if (isMobile && !isTablet) {
    return (
      <>
        {props.all_upper ? (
          props.all_upper.map(i => (
            <div className="top-mobile-filter-line">
              <TopFilterItem key={i} elem={i} />
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
          <TopFilterItem key={i} elem={i} />
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
