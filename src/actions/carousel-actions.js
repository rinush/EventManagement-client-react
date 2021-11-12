import {getTrendingEvents} from "../services/carousel-services";
import {SET_LOADING} from "./navBar-actions";

export const FIND_TRENDING_EVENTS="FIND_TRENDING_EVENTS";

const findTrending=(dispatch)=>{
    getTrendingEvents()
        .then(events => {
            dispatch({
                type: FIND_TRENDING_EVENTS,
                events: events.events
            })
            dispatch({
                type: SET_LOADING,
                loading: false
            })
        })
}

const carouselActions={findTrending}

export default carouselActions;