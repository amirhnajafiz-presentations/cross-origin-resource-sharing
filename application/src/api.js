const uri = "http://localhost:3030/api/user/"

export function fetchPostRequest(user) {
    let url = uri + user

    fetch(url, null)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))
}