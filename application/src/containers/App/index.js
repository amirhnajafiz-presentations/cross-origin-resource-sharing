import React from 'react';

import './index.css';


const uri = "/api/user/";

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
            .then(response => {
                this.updateResponseCode(response.status)
                return response.json()
            })
            .then(data => {
                let viewData = JSON.stringify(JSON.parse(data.value), null, 4)

                this.updateResponse("OK")
                this.updateSpanClass("green-span")
                this.updateUserInformation(viewData)
            })
            .catch(e => {
                console.log(e)
                this.updateResponse("Not OK")
                if (this.state.responseCode >= 400 && this.state.responseCode < 500) {
                    this.updateSpanClass('yellow-span')
                } else if (this.state.responseCode >= 500 && this.state.responseCode < 600) {
                    this.updateSpanClass("red-span")
                }
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
                      className={this.state.spanClass}
                  >
                      {this.state.responseCode !== 0 ? this.state.responseCode + ' - ' : ''}{this.state.response}
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