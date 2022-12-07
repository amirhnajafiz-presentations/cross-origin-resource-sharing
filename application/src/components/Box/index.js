import React from "react";

import './index.css';

class Box extends React.Component {
    render() {
        return(
            <div className={"response"}>
                  <pre>
                      { this.props.userInformation }
                  </pre>
            </div>
        )
    }
}

export default Box;