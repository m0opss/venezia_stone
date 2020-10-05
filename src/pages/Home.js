import React from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import materialActions from '../actions/materialAction'
import goodActions from '../actions/goodAction'
import MaterialItem from '../components/Content/MaterialItem/MaterialItem'

const Home = props => {

    React.useEffect( () => {
        // axios - запрос выгрузки
        props.setGoodArray(props.data.mts)
      })

    const handleChooseMaterial = (index) => {
        props.setGoodArray(props.data.mts[index].invgrps)
        // localStorage.setItem("selectedMaterial", index)
    }
    return (
        <div className='home-container'>
            <h1>Натуральный камень в наличии</h1>
            <div className="catalog-items-group">
                {props.goodArray.map((item, index) => (
                    <Link to={`/materials/${index}`} key={index}>
                        <MaterialItem
                            item={item}
                            itemName={item.mt}
                            key={item.mt}
                            onClick={() => handleChooseMaterial(index)} />
                    </Link>
                ))}

            </div>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        selectedMaterial: store.selectedMaterial,
        goodArray: store.goodArray.goodArray
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedMaterial: (data) => { dispatch(materialActions.setSelectedMaterial(data)) },
        setMaterialItemList: (data) => { dispatch(materialActions.setMaterialItemList(data)) },
        setGoodArray: (data) => { dispatch(goodActions.setGoodArray(data))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)