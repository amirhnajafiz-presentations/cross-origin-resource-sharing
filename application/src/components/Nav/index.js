import React from "react";

import './index.css'

class Nav extends React.Component {
    render() {
        return (
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
                    className={this.props.spanClass}
                >
                    {this.props.responseCode !== 0 ? this.props.responseCode + ' - ' : ''}{this.props.response}
                </h4>
            </div>
        )
    }
}

export default Nav;