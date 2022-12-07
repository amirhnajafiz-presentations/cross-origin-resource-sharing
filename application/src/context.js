import { createContext } from "react";

const UserContext = createContext({
    user: '',
    setUser: (data) => {this.user=data}
});

const RespContext = createContext({
    resp: '',
    setResp: (data) => {this.resp=data}
});

export {UserContext, RespContext};