const EVENT_URL = "https://webdev-group-sp2101-server.herokuapp.com";
// const EVENT_URL="http://localhost:8080"



export const getAllEvents = () =>
    fetch(`${EVENT_URL}/events`)
        .then(response => response.json())

export const getAllEventsByName = (name) =>
    fetch(`${EVENT_URL}/search?name=${name}`)
        .then(response => response.json())

export const findEventById = (eid) =>
    fetch(`${EVENT_URL}/event/${eid}`)
        .then(response => response.json())

const api = {
    getAllEvents, findEventById,getAllEventsByName
};

export default api;