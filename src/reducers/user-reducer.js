import {FOLLOW, SET_USER_DETAILS, UNFOLLOW} from "../actions/user-actions";

const initialState = {
    user: [],
    userDetails:{
        user:{},
        followers:[],
        following:[]
    }
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case "FIND_USER_BY_ID":
        case "ADD_EVENT_TO_INTERESTED_FOR_USER":
        case "DELETE_EVENT_FROM_INTERESTED_FOR_USER":
        case "ADD_EVENT_TO_ATTENDING_FOR_USER":
        case "DELETE_EVENT_FROM_ATTENDING_FOR_USER":
            return {
                ...state,
                user: action.user
            }
        case SET_USER_DETAILS:{
            return ({
                ...state,
                userDetails: action.userDetails
            })
        }
        case FOLLOW:
        case UNFOLLOW:
            return ({
                ...state,
                userDetails: {...state.userDetails,followers: action.followers}
            })
        default:
            return state
    }
}
export default userReducer