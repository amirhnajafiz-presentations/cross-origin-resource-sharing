// backend api uri
const uri = "/api/user/";

// calling get request to our backend api.
function fetchGetRequest(user) {
    let url = uri + user;

    return fetch(url, null);
}

export {fetchGetRequest};