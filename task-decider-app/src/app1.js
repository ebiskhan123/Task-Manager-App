class Indecision extends React.Component {

    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handeleAdd = this.handeleAdd.bind(this);
        this.handleSingleDelete = this.handleSingleDelete.bind(this);
        this.state = {
            options: ["one", "two"]
        };
    }

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

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }

    handleSingleDelete(optionToDelete) {
        console.log(optionToDelete)
        this.setState((prevState) => {
            return ({
                options: prevState.options.filter((option) => {
                    return optionToDelete !== option;
                })
            });
        });
    }


    handeleAdd(option) {
        if (!option) {
            return 'Enter a valid option to add'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }

    handlePick() {
        let pos = Math.floor(Math.random() * this.state.options.length);
        alert(pos)
    }

    render() {
        const title = "Indecision";
        const subTitle = "This is the subtitle";

        return (
            <div>
                <Header title={title} subt={subTitle} />
                <Action mustdisable={!(this.state.options.length > 0)} handlepick={this.handlePick} />
                <Options options={this.state.options} handledeleteoptions={this.handleDeleteOptions} handleSingleDelete={this.handleSingleDelete} />
                <AddOption addoptions={this.handeleAdd}></AddOption>
            </div>
        );
    }
}


const Header = (props) => {

    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subt}</h2>
        </div>
    );

};


const Action = (props) => {

    return (
        <div>
            <button onClick={props.handlepick} disabled={props.mustdisable} >What should I do</button>
        </div>
    );
};

const Options = (props) => {

    return (
        <div>
            <button onClick={props.handledeleteoptions}>Remove All</button>
            {props.options.map((option) => <Option key={option} optionText={option} handleSingleDelete={props.handleSingleDelete}></Option>)}
        </div>
    );

};


const Option = (props) => {
    return (
        <div>
            Option: {props.optionText}
            <button onClick={(e) => { props.handleSingleDelete(props.optionText) }
            }>Remove
        </button>
        </div>
    );
};


class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            error: undefined
        };
    }

    submitForm(e) {
        e.preventDefault();
        let option = e.target.elements.option.value.trim();
        let error = this.props.addoptions(option);

        this.setState(() => ({ error }));


    }
    render() {
        return (
            <div>
                {this.state.error && <p >{this.state.error}</p>}
                <form onSubmit={this.submitForm}>
                    <input type="text" name="option"></input>
                    <button > Add option</button>
                </form>
            </div>
        );
    }
}


ReactDOM.render(<Indecision />, document.getElementById('app'));

