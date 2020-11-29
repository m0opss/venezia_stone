import React from 'react';
import 'antd/dist/antd.css';
import { Slider, InputNumber } from 'antd';
import './Slider.scss';

const SliderSize = props => {
  let def_le_min = props.defVal['le'].length__min;
  let def_le_max = props.defVal['le'].length__max;
  let def_he_min = props.defVal['he'].height__min;
  let def_he_max = props.defVal['he'].height__max;
  const [le_minVal, le_setMinVal] = React.useState(def_le_min);
  const [le_maxVal, le_setMaxVal] = React.useState(def_le_max);
  const [he_minVal, he_setMinVal] = React.useState(def_he_min);
  const [he_maxVal, he_setMaxVal] = React.useState(def_he_max);

  // React.useEffect(() => {
  //   props.onChange([minVal, maxVal]);
  // });

  const le_onChange = value => {
    le_setMinVal(value[0]);
    le_setMaxVal(value[1]);
  };
  const le_onAChange = () => {
    if (le_minVal == def_le_min && le_maxVal == def_le_max) {
      props.onChange_le([]);
    } else {
      props.onChange_le([le_minVal, le_maxVal]);
    }
  };
  const he_onChange = value => {
    he_setMinVal(value[0]);
    he_setMaxVal(value[1]);
  };

  const he_onAChange = () => {
    if (he_minVal == def_he_min && he_maxVal == def_he_max) {
      props.onChange_he([]);
    } else {
      props.onChange_he([he_minVal, he_maxVal]);
    }
  };

  return (
    <div className="slider-row">
      <div className="slider-row__subrow">Длина:</div>
      <div className="">
        <span style={{ margin: '0px 5px' }}>от:</span>
        <InputNumber
          min={parseFloat(def_le_min)}
          max={parseFloat(def_le_max)}
          style={{ width: '70px' }}
          step={0.01}
          value={parseFloat(le_minVal)}
          onChange={le_setMinVal}
        />
        <span style={{ margin: '0px 5px' }}>до:</span>
        <InputNumber
          min={parseFloat(def_le_min)}
          max={parseFloat(def_le_max)}
          style={{ width: '70px' }}
          step={0.01}
          value={parseFloat(le_maxVal)}
          onChange={le_setMaxVal}
        />
        <Slider
          min={parseFloat(def_le_min)}
          max={parseFloat(def_le_max)}
          range
          onChange={le_onChange}
          onAfterChange={le_onAChange}
          value={[le_minVal, le_maxVal]}
          step={0.01}
        />
      </div>
      <div className="slider-row__subrow">Ширина:</div>
      <div className="">
        <span style={{ margin: '0px 5px' }}>от:</span>
        <InputNumber
          min={parseFloat(def_he_min)}
          max={parseFloat(def_he_max)}
          style={{ width: '70px' }}
          step={0.01}
          value={parseFloat(he_minVal)}
          onChange={he_setMinVal}
        />
        <span style={{ margin: '0px 5px' }}>до:</span>
        <InputNumber
          min={parseFloat(def_he_min)}
          max={parseFloat(def_he_max)}
          style={{ width: '70px' }}
          step={0.01}
          value={parseFloat(he_maxVal)}
          onChange={he_setMaxVal}
        />
        <Slider
          min={parseFloat(def_he_min)}
          max={parseFloat(def_he_max)}
          range
          onChange={he_onChange}
          onAfterChange={he_onAChange}
          value={[he_minVal, he_maxVal]}
          step={0.01}
        />
      </div>
    </div>
  );
};
export default SliderSize;
