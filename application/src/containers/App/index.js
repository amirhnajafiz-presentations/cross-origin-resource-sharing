import React from 'react';

import Nav from "../../components/Nav";
import Box from "../../components/Box";
import Description from "../../components/Description";

import {fetchGetRequest} from "../../api";

import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            response: "No value",
            responseCode: 0,
            spanClass: "normal",
            userInformation: "No value"
        }

        // binding the submit method
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    // handle submits
    handleSubmit(event) {
        event.preventDefault();

        if (this.state.user === "") {
            return
        }

        // send http request
        fetchGetRequest(this.state.user)
            .then(response => {
                // get the code
                const code = response.status;

                // update the status code
                this.updateResponseCode(code);

                // status ok
                if (code === 200) {
                    this.updateSpanClass("green-span");

                    return response.json();
                } else if (code >= 400 && code < 500) {
                    this.updateSpanClass('yellow-span');
                } else if (code >= 500 && code < 600) {
                    this.updateSpanClass("red-span");
                } else {
                    this.updateSpanClass("normal");
                }

                return null;
            })
            .then(data => {
                if (data === null) {
                    this.updateResponse("Not OK");
                    this.updateUserInformation("No value");

                    return;
                }

                let viewData = JSON.stringify(JSON.parse(data.value), null, 4);

                this.updateResponse("OK");
                this.updateUserInformation(viewData);
            })
            .catch(e => {
                console.error(e);

                this.updateResponseCode(0)
                this.updateSpanClass("normal");
                this.updateResponse("Not OK");
                this.updateUserInformation("No value");
            })
    }

    // update state
    update(event) {
        this.setState({
            user: event.target.value
        })
    }

    // update response message
    updateResponse(message) {
        this.setState({
            response: message
        })
    }

    // update response code
    updateResponseCode(code) {
        this.setState({
            responseCode: code
        })
    }

    // update user information
    updateUserInformation(data) {
        this.setState({
            userInformation: data
        })
    }

    // update class name of span
    updateSpanClass(className) {
        this.setState({
            spanClass: className
        })
    }

    // reset the input
    resetForm() {
        this.setState({
            user: ""
        })
    }

    render() {
      return (
          <div id={"app"}>
              <Nav
                  spanClass={this.state.spanClass}
                  response={this.state.response}
                  responseCode={this.state.responseCode}
              />
              <Description/>
              <form
                  onSubmit={this.handleSubmit}
                  className={"form-container"}
              >
                  <label>
                      <span>Enter user Github account name</span>
                      <input
                          className={"input-form"}
                          type="text"
                          value={this.state.user}
                          placeholder={"Github account"}
                          onChange={(e) => this.update(e)}
                      />
                  </label>
                  <div>
                      <input
                          className={"clear-btn"}
                          type="reset"
                          value="Clear"
                          onClick={this.resetForm}
                      />
                      <input
                          className={"submit-btn"}
                          type="submit"
                          value="Send"
                      />
                  </div>
              </form>
              <Box
                  userInformation={this.state.userInformation}
              />
          </div>
      )
    }
}

export default App;