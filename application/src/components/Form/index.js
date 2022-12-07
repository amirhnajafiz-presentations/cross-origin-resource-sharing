import {useContext, useState} from "react";
import {RespContext} from "../../context";

import './index.css';

// Form component manages to handle the form submit.
function Form() {
    const uri = "http://localhost:3030/api/user/";

    const [user, setUser] = useState()
    const respCtx = useContext(RespContext)

    // handle submits
    const handleSubmit = (event) => {
        event.preventDefault();

        if (user === "") {
            return
        }

        let url = uri + user

        // send http request
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

    return (
        <form
            onSubmit={handleSubmit}
            className={"form-container"}
        >
            <label>
                <span>Enter name</span>
                <input
                    className={"input-form"}
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
            </label>
            <input
                className={"submit-btn"}
                type="submit"
                value="Send"
            />
        </form>
    )
}

export default Form;