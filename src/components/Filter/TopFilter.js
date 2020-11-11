import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import filterActions from 'actions/filterActions';
export const TopFilter = props => {
  const setFilterParam = e => {
    props.setUpper([e.target.id]);
    props.f_share()
  };
  return (
    <>
      <div
        id="Слэбы"
        className="second-line__filter-button"
        onClick={(e) => setFilterParam(e)}
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
