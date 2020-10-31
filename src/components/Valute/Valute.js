import React from 'react';

import { connect } from 'react-redux';
import valuteActions from 'actions/valuteActions';

import './Valute.scss';

const Valute = props => {
  const [customStyleRoot, setCustomRoot] = React.useState(
    props.rootStyle ? props.rootStyle : ''
  );
  const [customStyleSpan, setCustomSpan] = React.useState(
    props.spanStyle ? props.spanStyle : ''
  );

  React.useEffect(() => {
    ['rub', 'eur', 'usd'].map(val => {
      document.getElementById(val).setAttribute('style', 'color: black');
      if (val === props.valute)
        document.getElementById(val).setAttribute('style', 'color: #c98505');
    });
  });

  const onToggleValute = e => {
    props.setValute(e.target.id);
  };

  return (
    <div className={`valute-line ${customStyleRoot}`}>
      <span
        id="rub"
        className={`valute-line-item ${customStyleSpan}`}
        onClick={onToggleValute}
      >
        RUB
      </span>
      <span
        id="usd"
        className={`valute-line-item ${customStyleSpan}`}
        onClick={onToggleValute}
      >
        USD
      </span>
      <span
        id="eur"
        className={`valute-line-item ${customStyleSpan}`}
        onClick={onToggleValute}
      >
        EUR
      </span>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    valute: store.valute_data.valute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setValute: data => {
      dispatch(valuteActions.setValute(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Valute);
