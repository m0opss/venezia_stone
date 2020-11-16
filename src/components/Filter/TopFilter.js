import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import filterActions from 'actions/filterActions';

export const TopFilter = props => {
  const [activeFilter, setActiveFilter] = React.useState('');

  const setFilterParam = e => {
    if (e.target.id == activeFilter) {
      setActiveFilter('');
      props.setUpper([]);
      props.f_share();
      document.getElementById(e.target.id).setAttribute('style', 'color: black');
    } else {
      setActiveFilter(e.target.id);
      props.setUpper([e.target.id]);
      props.f_share();
      [
        'Ступени',
        'Слэбы',
        'Полоса',
        'Плитка',
        'Брусчатка',
        'Мозайка из камня',
        'Бордюр',
        'Прочее'
      ].map(val => {
        document.getElementById(val).setAttribute('style', 'color: black');
        if (e.target.id === val) {
          document.getElementById(val).setAttribute('style', 'color: #c98505');
        }
      });
    }
  };

  return (
    <>
      <div
        id="Слэбы"
        className="second-line__filter-button"
        onClick={e => setFilterParam(e)}
      >
        Слэбы
      </div>
      <div
        id="Полоса"
        className="second-line__filter-button"
        onClick={setFilterParam}
      >
        Полоса
      </div>
      <div
        id="Плитка"
        className="second-line__filter-button"
        onClick={setFilterParam}
      >
        Плитка
      </div>
      <div
        id="Ступени"
        className="second-line__filter-button"
        onClick={setFilterParam}
      >
        Ступени
      </div>
      <div
        id="Брусчатка"
        className="second-line__filter-button"
        onClick={setFilterParam}
      >
        Брусчатка
      </div>
      <div
        id="Мозайка из камня"
        className="second-line__filter-button -double-w"
        onClick={setFilterParam}
      >
        Мозайка из камня
      </div>
      <div
        id="Бордюр"
        className="second-line__filter-button"
        onClick={setFilterParam}
      >
        Бордюр
      </div>
      <div
        id="Прочее"
        className="second-line__filter-button"
        onClick={setFilterParam}
      >
        Прочее
      </div>
      <div className="second-line__filter-button">
        <Link to="/contacts">Контакты</Link>
      </div>
    </>
  );
};

const mapStateToProps = store => {
  return {
    f_share: store.filter_data.f_share,
    prevState: store.filter_data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUpper: data => {
      dispatch(filterActions.setUpper(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopFilter);
