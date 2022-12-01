import React from 'react';
import './index.css';

class Response extends React.Component {
    constructor(props) {
        super(props);
        this.response = {value: 'No value'};
    }

    render() {
        return (
            <div className={"response"}>
                { this.response.value }
            </div>
        )
    }
}

export default Response;