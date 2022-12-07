import React from "react";
import {RespContext} from "../../context";

import './index.css';

const uri = "http://localhost:3030/api/user/";

// Form component manages to handle the form submit.
class Form extends React.Component {
    constructor(props) {
        super(props);

        // setting the component state
        this.state = {
            user: ""
        };

        // binding the submit method
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handle submits
    handleSubmit(event) {
        event.preventDefault();

        if (this.state.user === "") {
            return
        }

        let url = uri + this.state.user

        // send http request
        fetch(url, null)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                RespContext.setResp("OK")
            })
            .catch(e => {
                console.log(e)
                RespContext.setResp("Not OK")
            })
    }

    // change user
    changeUser(event) {
        // setting the user new value
        this.setState({
            user: event.target.value
        });
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