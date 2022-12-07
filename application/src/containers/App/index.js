import React from 'react';

import './index.css';


const uri = "http://localhost:3030/api/user/";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            response: "No value",
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
                console.log(data)
                this.updateResponse("OK")
            })
            .catch(e => {
                console.log(e)
                this.updateResponse("Not OK")
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
                  <h4>
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
                  { this.state.response }
              </div>
          </div>
      )
    }
}

export default App;