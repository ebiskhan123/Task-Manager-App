import React from 'react';
import  Modal  from 'react-modal';

 const OptionModel = (props) => (
    <Modal className="modal modal__body" 
    isOpen ={!!props.selectedTask} 
    contentLabel="Selected Task"
    >
        <h3>Selected Task</h3>
        {props.selectedTask && <p className = "modal__title">{props.selectedTask}</p>}
        <button className="button" onClick={props.handleClearSelectedOption}>Okay</button>
    </Modal>
 );

export default OptionModel;


