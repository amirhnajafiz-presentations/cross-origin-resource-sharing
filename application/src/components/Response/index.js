import React from 'react';
import './index.css';

class Response extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: 'No value'
        };
    }

    render() {
        return (
            <div className={"response"}>
                { this.state.response }
            </div>
        )
    }
}

export default Response;