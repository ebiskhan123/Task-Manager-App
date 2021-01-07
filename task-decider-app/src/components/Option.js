import React from 'react';

 const Option = (props) => (
    <div className ="option option__text">
        <p>{props.index}.  {props.optionText} </p>
        <button
        className ="button button--link" 
        onClick={(e) => { props.handleSingleDelete(props.optionText) }
        }>Remove
    </button>
    </div>
)

export default Option;