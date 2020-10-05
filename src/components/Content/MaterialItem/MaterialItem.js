import React from 'react'


import './MaterialItem.scss';

const MaterialItem = (props) => {
    return (
        <div className='catalog-item' onClick={props.onClick}>
            <img src="" alt="" />
            {props.itemName}
        </div>

    )
}
export default MaterialItem