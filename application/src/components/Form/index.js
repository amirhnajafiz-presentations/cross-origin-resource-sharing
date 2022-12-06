import React from "react";
import './index.css';

// Form component manages to handle the form submit.
class Form extends React.Component {
    constructor(props) {
        super(props);

        // setting the component state
        this.state = {
            user: ""
        }

        // binding the submit method
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // handle submits
    handleSubmit(event) {
        event.preventDefault();

        if (this.state.user === "") {
            return
        }

        alert(`Input:\n${this.state.user}`);
    }

    // change user
    changeUser(event) {
        // setting the user new value
        this.setState({
            user: event.target.value
        })
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className={"form-container"}
            >
                <label>
                    <span>Enter name</span>
                    <input
                        className={"input-form"}
                        type="text"
                        value={this.state.use}
                        onChange={(e) => this.changeUser(e)}
                    />
                </label>
                <input
                    className={"submit-btn"}
                    type="submit"
                    value="Send"
                />
            </form>
        )
    }
}

export default Form;