import {useContext} from 'react';
import {RespContext} from "./context";

const uri = "http://localhost:3030/api/user/";

const respCtx = useContext(RespContext)

export function fetchPostRequest(user) {
    let url = uri + user;

    fetch(url, null)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            respCtx.setResp("OK")
        })
        .catch(e => {
            console.log(e)
            respCtx.setResp("Not OK")
        })
}