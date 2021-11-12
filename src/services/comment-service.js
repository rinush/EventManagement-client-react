const EVENT_URL = "https://webdev-group-sp2101-server.herokuapp.com";
//const EVENT_URL="http://localhost:8080"

export const findCommentsForEvent = (eid) =>
    fetch(`${EVENT_URL}/event/${eid}`)
        .then(response => response.json())

export const addCommentForEvent = (comment) =>
    fetch(`${EVENT_URL}/event/comment`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const updateCommentForEvent = (comment) =>
    fetch(`${EVENT_URL}/event/comment`, {
        method: 'PUT',
        body: JSON.stringify(comment),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

const api = {
    findCommentsForEvent,
    addCommentForEvent,
    updateCommentForEvent
};

export default api;