import React from 'react';
import { MyForm } from '../../components/Form';
import Nav from '../../components/Nav';
import './index.css';

class App extends React.Component {
    render() {
      return (
          <div className={"container"}>
              <Nav />
              <MyForm />
          </div>
      )
    }
}

export default App;