import {FIND_EVENTS_BY_NAME,SEARCH_TEXT_UPDATE} from "../actions/search-actions";


const initialState = {
    searchText: "",
    events: []
}

const SearchReducer = (state=initialState, action) => {
    switch (action.type) {
        case FIND_EVENTS_BY_NAME:
            return {
                ...state,
                events: action.events
            }
        case SEARCH_TEXT_UPDATE:
            return {
                ...state.events,
                searchText: action.text
            }
        default:
            return state
    }
}
export default SearchReducer