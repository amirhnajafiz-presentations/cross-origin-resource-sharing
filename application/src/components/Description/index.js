import React from "react";

import './index.css';

class Description extends React.Component {
    render() {
        return (
            <div className={"des-root"}>
                <h2>
                    CORS Policy fixing with proxy server!
                </h2>
                <p style={{textAlign: "justify"}}>
                    In this application, we are going to get Github users public repositories from our
                    HTTP server that is running on <b>localhost:8080</b>.
                    You can see that we don't get CORS error, because we are using a proxy server.<br />
                    By using a proxy server we will be able to send HTTP requests without CORS headers and
                    get the response from remote server that we want.
                </p>
                <small style={{float: "right"}}>
                    Created by <i>Amirhossein Najafizade</i>
                </small>
            </div>
        );
    }
}

export default Description;