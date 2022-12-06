import React from "react";
import './index.css';

class Form extends React.Component {
    state = { user: '' }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.user === "") {
            return
        }

        alert(`Input:\n${this.state.user}`);
    }

    changeUser(event) {
        this.setState({user: event.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className={"main_form"}>
                <label style={{display: "block"}}>
                    <span className={"main_label"}>Enter name:</span>
                    <input
                        className={"input_form"}
                        type="text"
                        value={this.state.user}
                        onChange={(e) => this.changeUser(e)}
                    />
                </label>
                <input className={"main_submit"} type="submit" value="Send" />
            </form>
        )
    }
}

export default Form;