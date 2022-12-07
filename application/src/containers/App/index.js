import React from 'react';

import './index.css';


const uri = "/api/user/";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            response: "No value",
            userInformation: "No value"
        }

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
                let viewData = JSON.stringify(JSON.parse(data.value), null, 4)

                this.updateResponse("OK")
                this.updateUserInformation(viewData)
            })
            .catch(e => {
                console.log(e)
                this.updateResponse("Not OK")

                this.updateUserInformation("No value")
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

    // update user information
    updateUserInformation(data) {
        this.setState({
            userInformation: data
        })
    }

    render() {
      return (
          <div id={"app"}>
              <div className={"nav"}>
                  <h4>
                      <a
                          rel={"noreferrer"}
                          href={"https://www.github.com"}
                          target={"_blank"}
                      >
                          <img
                              src={"https://cdn-icons-png.flaticon.com/512/25/25231.png"}
                              width={"50px"}
                              alt={"github logo"}
                          />
                      </a>
                  </h4>
                  <h4
                      className={this.state.response === "OK" ? 'green-span' : this.state.response === "Not OK" ? 'red-span' : 'normal'}
                  >
                      {this.state.response}
                  </h4>
              </div>
              <form
                  onSubmit={this.handleSubmit}
                  className={"form-container"}
              >
                  <label>
                      <span>Enter name</span>
                      <input
                          className={"input-form"}
                          type="text"
                          value={this.state.user}
                          onChange={(e) => this.update(e)}
                      />
                  </label>
                  <input
                      className={"submit-btn"}
                      type="submit"
                      value="Send"
                  />
              </form>
              <div className={"response"}>
                  <pre>
                      { this.state.userInformation }
                  </pre>
              </div>
          </div>
      )
    }
}

export default App;