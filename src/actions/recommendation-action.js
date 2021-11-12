import {getRecommendedEvents, getRecommendedEventsOnLocation,findRecommendationsForUser} from "../services/recommendation-service";

export const FIND_RECOMMENDED_EVENTS="FIND_RECOMMENDED_EVENTS";
export const FIND_RECOMMENDED_EVENTS_ON_LOCATION="FIND_RECOMMENDED_EVENTS_ON_LOCATION";
export const CLEAR_RECOMMENDATIONS="CLEAR_RECOMMENDATIONS";
export const USER_RECOMMENDATIONS="USER_RECOMMENDATIONS"

const findRecommended=(dispatch)=>{
    getRecommendedEvents()
        .then(events => dispatch({
            type: FIND_RECOMMENDED_EVENTS,
            events:events.events
        }))
}

const findRecommendationLocation=(dispatch,location)=>{
    getRecommendedEventsOnLocation(location)
        .then(events=>dispatch({
            type:FIND_RECOMMENDED_EVENTS_ON_LOCATION,
            events: events.events
        }))
}

const clearRecommendations=(dispatch)=>{
    dispatch({
        type: CLEAR_RECOMMENDATIONS
    })
}

const findRecommendationForUser=(dispatch,userId)=>{
    findRecommendationsForUser(userId)
        .then(response=>dispatch({
            type: USER_RECOMMENDATIONS,
            events: response
        }))
}

export default {findRecommended,clearRecommendations,findRecommendationLocation,findRecommendationForUser}
