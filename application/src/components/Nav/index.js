import {useContext} from 'react';

import {RespContext} from "../../context";

import './index.css';

// Nav component.
function Nav() {
    const respCtx = useContext(RespContext)

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
            <h4>
                {respCtx.resp}
            </h4>
        </div>
    )
}

export default Nav;