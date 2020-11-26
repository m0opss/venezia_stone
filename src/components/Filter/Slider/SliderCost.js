import React from 'react';
import 'antd/dist/antd.css';
import { Slider, InputNumber } from 'antd';
import './Slider.scss';
import Valute from 'components/Valute/Valute';

const SliderCost = props => {
  const [minDefVal, setMinDefVal] = React.useState(
    props.cur === 'rub'
      ? props.defVal.price_RUB.cntRUB__min != ''
        ? parseFloat(props.defVal.price_RUB.rub__min)
        : 0
      : props.cur === 'usd'
      ? props.defVal.price_USD.cntUSD__min != ''
        ? parseFloat(props.defVal.price_USD.usd__min)
        : 0
      : props.cur === 'eur'
      ? props.defVal.price_EUR.cntEUR__min != ''
        ? parseFloat(props.defVal.price_EUR.eur__min)
        : 0
      : 0
  );
  const [maxDefVal, setMaxDefVal] = React.useState(
    props.cur === 'rub'
      ? parseFloat(props.defVal.price_RUB.rub__max)
      : props.cur === 'usd'
      ? parseFloat(props.defVal.price_USD.usd__max)
      : props.cur === 'eur'
      ? parseFloat(props.defVal.price_EUR.eur__max)
      : 0
  );
  const [minVal, setMinVal] = React.useState(minDefVal);
  const [maxVal, setMaxVal] = React.useState(maxDefVal);

  const onChangeMin = value => {
    if (isNaN(value)) {
      return;
    }
    setMinVal(value);
    props.onChange([value, maxVal]);
  };

  const onChangeMax = value => {
    if (isNaN(value)) {
      return;
    }
    setMaxVal(value);
    props.onChange([minVal, value]);
  };
  const onChange = value => {
    setMinVal(value[0]);
    setMaxVal(value[1]);
  };
  const onAChange = () => {
    props.onChange([minVal, maxVal]);
  };

  return (
    <div className="slider-row">
      <Valute />
      <div className="">
        <div className="slider-row__subrow">
          <span style={{ margin: '0px 16px' }}>от:</span>
          <InputNumber
            min={parseFloat(minDefVal)}
            max={parseFloat(maxDefVal)}
            style={{ width: '85px' }}
            step={0.1}
            value={parseFloat(minVal)}
            onChange={onChangeMin}
          />
        </div>
        <div className="slider-row__subrow">
          <span style={{ margin: '0px 15px' }}>до:</span>
          <InputNumber
            min={parseFloat(minDefVal)}
            max={parseFloat(maxDefVal)}
            style={{ width: '85px' }}
            step={0.1}
            value={parseFloat(maxVal)}
            onChange={onChangeMax}
          />
        </div>
      </div>
      <Slider
        min={parseFloat(minDefVal)}
        max={parseFloat(maxDefVal)}
        range
        onChange={onChange}
        onAfterChange={onAChange}
        value={[parseFloat(minVal), parseFloat(maxVal)]}
        step={0.1}
      />
    </div>
  );
};
export default SliderCost;
