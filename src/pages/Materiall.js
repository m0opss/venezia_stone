import React from 'react'
import { connect } from 'react-redux'

import { Link } from "react-router-dom"
import goodActions from '../actions/goodAction'
import MaterialItem from '../components/Content/MaterialItem/MaterialItem'

const Materiall = (props) => {
    let materialID = parseInt(props.match.params.materialID)
    let slabID = parseInt(props.match.params.slabID)
    
    React.useEffect(() => {
        if (props.data.mts[materialID] != undefined) {
            console.log(props.data.mts[materialID].invgrps)
            console.log(slabID)
            console.log(props.data.mts[materialID].invgrps[slabID].invitems)

        }
    })

    const handleClick = (index) => {
        
    }

    return (
        <div className='home-container'>
            <div className="catalog-items-group">
                123
                {props.goodArray.map((item, index) => (
                <Link to={`/material/${materialID}/${slabID}`} key={index}>
                        <MaterialItem
                            item={item}
                            itemName={item.invgrp}
                            itemImg={item}
                            key={item.invgrpid}
                            onClick={() => handleClick(index)} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
const mapStateToProps = store => {
    return {
        goodArray: store.goodArray.goodArray,
        data: store.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setGoodArray: (data) => { dispatch(goodActions.setGoodArray(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Materiall)