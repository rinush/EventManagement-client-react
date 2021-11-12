

const initialState = {
    events: [],
    event:[]

}

const eventReducer = (state=initialState, action) => {
    switch (action.type) {
        case "GET_ALL_EVENTS":
        case "GET_ALL_EVENTS_BY_NAME":
            return {
                ...state,
                events: action.events
            }
        case "FIND_EVENT_BY_ID":
            return {
                ...state,
                event: action.event
            }
        default:
            return state
    }
}
export default eventReducer