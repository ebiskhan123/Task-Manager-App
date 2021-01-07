import React from 'react';
import Option from './Option';

const Options = (props) => {

    return (
        <div>
            {(props.options.length ==0 && <h4 className ="widget__message"> You do an have any Tasks. Please add tasks to continue.</h4>)}
            <div className ="widget-header">
            <h3>Your options</h3>
            <button 
            className =" button button--link"
            onClick={props.handledeleteoptions}>
                Remove All</button>
                </div>
            {props.options.map((option, index) => <Option
             className="option" 
             index = {index +1}
            key={option} optionText={option} 
            handleSingleDelete={props.handleSingleDelete}>
            </Option>)}
        </div>
    );
};

export default Options;