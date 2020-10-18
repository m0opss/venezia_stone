import React from 'react';

import { connect } from 'react-redux';
import filter_icon from 'images/filter-icon.png';

import 'antd/dist/antd.css';
import './Filter.scss';

import filterActions from 'actions/filterActions';

import { Menu } from 'antd';

import colors from './filterColors.json';
import materials from './filterMaterials.json';
import { render } from 'react-testing-library';

const { SubMenu } = Menu;

const Filter = props => {
  const [state, setState] = React.useState({ collapsed: false });

  const handleClick = e => {
    console.log('click ', e);
  };
  console.log(materials.materials);
  return (
    <div className="filter">
      <Menu
        onClick={handleClick}
        style={{ width: 327 }}
        defaultSelectedKeys='sub1'
        mode="inline"
        multiple={true}
      >
        <SubMenu
          key="sub1"
          icon={<img src={filter_icon} style={{ marginRight: 10 }} />}
          title="Фильтр"
        >
          <SubMenu key="material" title="Материал">
            {materials.materials.map((material, index) =>  {return(
              <Menu.Item
                key={`1${index}`}
                onClick={() => props.setChoosedMat(material)}
              >
                {material}
              </Menu.Item>
            )})}
          </SubMenu>
          <SubMenu key="izdelie" title="Изделие">
            <Menu.Item key="20">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu key="color" title="Цвет">
            {Object.keys(colors).map((color, index) => {
              return(
                <Menu.Item key={`3${index}`} style={{display:'flex', alignItems:'center'}}>
                  <div className="filter__color" style={{background:colors[color]}}></div>
                  {color}
                </Menu.Item>
              );
            })}
          </SubMenu>
          {/*  
          <SubMenu key="proc_type" title="Тип обработки">
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu key="size" title="Размеры">
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu key="thickness" title="Толщина">
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu key="cost" title="Цена">
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu key="city" title="Город">
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu key="bookmatch" title="Букматч">
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu key="light" title="Подсветка">
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu key="born_place" title="Месторождение">
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
          <SubMenu key="status" title="Статус">
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu> */}
        </SubMenu>
      </Menu>
    </div>
  );
};
const mapStateToProps = store => {
  return {
    choosedMat: store.filter.choosedMat,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChoosedMat: data => {
      dispatch(filterActions.setChoosedMat(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
