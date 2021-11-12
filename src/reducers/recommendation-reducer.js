import {
    CLEAR_RECOMMENDATIONS,
    FIND_RECOMMENDED_EVENTS,
    FIND_RECOMMENDED_EVENTS_ON_LOCATION, USER_RECOMMENDATIONS
} from "../actions/recommendation-action";

const initialState={
    recommendedEvents:[],
    events:[],
    userRecommendations:[]
}

const RecommendationReducer=(state=initialState,action)=>{
    switch (action.type){
        case FIND_RECOMMENDED_EVENTS:
            return{
                ...state,
                events: action.events
            }
        case FIND_RECOMMENDED_EVENTS_ON_LOCATION:
            return {
                ...state,
                recommendedEvents: action.events
            }
        case CLEAR_RECOMMENDATIONS:
            return {
                ...state,
            }
        case USER_RECOMMENDATIONS: {
            return ({
                ...state,
                userRecommendations: action.events
            })
        }
        default: return state;
    }
}

export default RecommendationReducer;