const EVENT_URL = "https://webdev-group-sp2101-server.herokuapp.com";
// const EVENT_URL="http://localhost:8080"



export const getAllEventsByName = (name) =>
    fetch(`${EVENT_URL}/search?name=${name}`)
        .then(response => response.json())