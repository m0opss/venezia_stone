import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import materialActions from '../actions/materialAction';
import dataActions from 'actions/dataAction';
import a_z from 'images/a-z.png';

import listIcon from 'images/str.png';
import pltk from 'images/pltk.png';
import listIcon_a from 'images/str_a.png';
import pltk_a from 'images/pltk_a.png';

import { Icon } from '@iconify/react';
import sortIcon from '@iconify/icons-dashicons/sort';

import NumGroupItem from '../components/Content/NumGroupItem/NumGroupItem';

import './NumGroups.scss';

const sortArr = arr => {
  let tmp = [...arr];
  tmp.sort((a, b) => {
    let nameA = a.gr.toLowerCase(),
      nameB = b.gr.toLowerCase();
    console.log(nameA, nameB);
    if (nameA < nameB)
      return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return tmp;
};

const NumGroups = props => {
  const [numGroups, setNumGroups] = React.useState([]);
  const [style_pltk, setHover_pltk] = React.useState(true);
  const [actionOption1, setActionOption1] = React.useState('');
  const [actionOption2, setActionOption2] = React.useState('');
  const [actionOption3, setActionOption3] = React.useState('');

  const [num_groups_items, setNum_groups_items] = React.useState(
    'num-gr-items-group'
  );

  React.useEffect(() => {
    axios
      .get(`http://92.63.103.180:8000/api_v0/${props.match.params.material}/`)
      .then(response => {
        // props.setNumGroups(response.data);
        setNumGroups(sortArr(response.data.grs));
        // localStorage.setItem('material', `${response.data.mt} ${response.data.ph}`)
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleValOption = e => {
    if (e.target.id === 'val-opt-1') {
      setActionOption1('-active-opt');
      setActionOption2('');
      setActionOption3('');
    }
    if (e.target.id === 'val-opt-2') {
      setActionOption2('-active-opt');
      setActionOption1('');
      setActionOption3('');
    }
    if (e.target.id === 'val-opt-3') {
      setActionOption3('-active-opt');
      setActionOption1('');
      setActionOption2('');
    }
  };

  const alphSorted = numGroups => {
    let tmp = [...numGroups];
    tmp.reverse();
    setNumGroups(tmp);
  };

  const toggleStyle_pltk = () => {
    setHover_pltk(true);
    setNum_groups_items('num-gr-items-group');
  };
  const toggleStyle_list = () => {
    setHover_pltk(false);
    setNum_groups_items('num-gr-items-group-list');
  };

  return (
    <>
      <div className="num-gr-options">
        <p
          id="val-opt-1"
          className={`num-gr-options__valuta ${actionOption1}`}
          onClick={e => handleValOption(e)}
        >
          RUB
        </p>
        <p
          id="val-opt-2"
          className={`num-gr-options__valuta ${actionOption2}`}
          onClick={e => handleValOption(e)}
        >
          USD
        </p>
        <p
          id="val-opt-3"
          className={`num-gr-options__valuta ${actionOption3}`}
          onClick={e => handleValOption(e)}
        >
          EUR
        </p>
        <div className="num-gr-options__color_sort">
          <Icon
            icon={sortIcon}
            width="2.5em"
            height="2.5em"
            className="num-gr-options__color_icon"
          />
        </div>
        <div
          className="num-gr-options__sort_alph"
          onClick={() => alphSorted(numGroups)}
        >
          <img src={a_z} />
        </div>
        <div className="" onClick={() => toggleStyle_pltk()}>
          <img src={style_pltk ? pltk_a : pltk} />
        </div>
        <div className="" onClick={() => toggleStyle_list()}>
          <img src={style_pltk ? listIcon : listIcon_a} />
        </div>
      </div>

      <div className={num_groups_items}>
        <div
          className="num-gr-items-group-col"
          style={style_pltk ? { display: 'none' } : { display: 'grid' }}
        >
          <p>Фото</p>
          <p>Название</p>
          <p>Количество SKU</p>
          <p>Общая площадь</p>
          <p>Цена от</p>
        </div>

        {numGroups.map(item => (
          <NumGroupItem
            pltk={style_pltk}
            key={item.id}
            img={item.photo}
            link={props.match.url + '/' + item.id}
            item={item}
            itemName={item.gr}
            id={item.id}
          />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = store => {
  return {
    selectedMaterial: store.material.selectedMaterial
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedMaterial: data => {
      dispatch(materialActions.setSelectedMaterial(data));
    },
    setNumGroups: data => {
      dispatch(dataActions.setNumGroups(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumGroups);
