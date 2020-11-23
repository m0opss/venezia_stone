import React from 'react';
import 'antd/dist/antd.css';
import { Slider, InputNumber} from 'antd';
import './Slider.scss';

const DecimalStep = props => {
  const [minVal, setMinVal] = React.useState(0);
  const [maxVal, setMaxVal] = React.useState(100);

  React.useEffect(() => {
    props.onChange([minVal, maxVal]);
  });

  const onChangeMin = value => {
    if (isNaN(value)) {
      return;
    }
    setMinVal(value);
  };

  const onChangeMax = value => {
    if (isNaN(value)) {
      return;
    }
    setMaxVal(value);
  };
  const onChange = value => {
    setMinVal(value[0]);
    setMaxVal(value[1]);
  };

  return (
    <div className="slider-row">
      <InputNumber
        min={0}
        max={100}
        style={{ margin: '0 12px' }}
        step={0.1}
        value={minVal}
        onChange={onChangeMin}
      />
      <Slider
        min={0}
        max={100}
        range
        onChange={onChange}
        value={[minVal, maxVal]}
        step={0.1}
      />
      <InputNumber
        min={0}
        max={100}
        style={{ margin: '0 12px' }}
        step={0.1}
        value={maxVal}
        onChange={onChangeMax}
      />
    </div>
  );
};
export default DecimalStep;
