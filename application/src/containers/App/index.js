import React from 'react';

import Nav from '../../components/Nav';
import Response from "../../components/Response";

import './index.css';

const uri = "http://localhost:3030/api/user/";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
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
            })
            .catch(e => {
                console.log(e)
            })
    }

    // update state
    update(event) {
        this.setState({
            user: event.target.value
        })
    }

    render() {
      return (
          <div id={"app"}>
              <Nav />
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
              <Response />
          </div>
      )
    }
}

export default App;