import { createContext } from "react";

const UserContext = createContext({
    user: "No value",
    setUser: (data) => {this.user=data}
});

const RespContext = createContext({
    resp: "No value",
    setResp: (message) => {}
});

export {UserContext, RespContext};