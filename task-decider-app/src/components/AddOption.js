
import React from 'react';

export default class AddOption extends React.Component {
    
    state = {
        error: undefined
    };


    submitForm = (e) => {
        e.preventDefault();
        let option = e.target.elements.option.value.trim();
        let error = this.props.addoptions(option);

        this.setState(() => ({ error }));

        if(!error){
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p  className = "add-option-error">{this.state.error}</p>}
                <form  className="add-option" onSubmit={this.submitForm}>
                    <input className="add-option__input" type="text" name="option"></input>
                    <button className="button" > Add option</button>
                </form>
            </div>
        );
    }
}

