import React from 'react';

import Form from '../../components/Form';
import Nav from '../../components/Nav';
import Response from "../../components/Response";

import './index.css';

class App extends React.Component {
    render() {
      return (
          <div id={"app"}>
              <Nav />
              <Form />
              <Response />
          </div>
      )
    }
}

export default App;