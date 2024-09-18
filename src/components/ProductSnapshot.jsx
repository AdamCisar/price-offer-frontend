import React from 'react';

const ProductSnapshot = (props) => {
    return (
        <>
            <td>   {props.name}   </td>
            <td>   {props.price}   </td>
        </>
    )
}

export default ProductSnapshot