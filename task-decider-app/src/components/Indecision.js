

import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModel from './OptionModel';

export default class Indecision extends React.Component {

    state = {
        options: ["one", "two"],
        selectedTask: undefined
    };

    componentDidMount() {
        try {
            const options = JSON.parse(localStorage.getItem('options'))
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            console.log("Exception")
        }
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options',json)
        }
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    }

    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedTask: undefined }));
    }

    handleSingleDelete = (optionToDelete) => {
        console.log(optionToDelete)
        this.setState((prevState) => {
            return ({
                options: prevState.options.filter((option) => {
                    return optionToDelete !== option;
                })
            });
        });
    }

    handeleAdd = (option) => {
        if (!option) {
            return 'Enter a valid option to add'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }

    handlePick = ()  =>{
        let pos = Math.floor(Math.random() * this.state.options.length);
        this.setState(()=>({
            selectedTask : this.state.options[pos]
        }));
    }

    render() {
        const title = "My Task Manager";
        const subTitle = "Manage your tasks with this tool by deciding what to do next";

        return (
            <div>
                <Header title={title} subt={subTitle} />
                <div className="container">
                <Action mustdisable={!(this.state.options.length > 0)} 
                handlepick={this.handlePick} />
                <div className="widget">
                <Options options={this.state.options} handledeleteoptions={this.handleDeleteOptions}
                 handleSingleDelete={this.handleSingleDelete} />
                <AddOption addoptions={this.handeleAdd}></AddOption>
                </div>
                </div>
                <OptionModel selectedTask = {this.state.selectedTask} 
                handleClearSelectedOption = {this.handleClearSelectedOption}/>
            </div>
        );
    }
}