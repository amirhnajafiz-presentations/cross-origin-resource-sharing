import React from 'react';
import { MyForm } from '../../components/Form';
import Nav from '../../components/Nav';
import Response from "../../components/Response";
import './index.css';

class App extends React.Component {
    render() {
      return (
          <div className={"container"}>
              <Nav />
              <MyForm />
              <Response />
          </div>
      )
    }
}

export default App;