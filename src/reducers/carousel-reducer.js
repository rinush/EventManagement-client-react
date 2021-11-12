import{FIND_TRENDING_EVENTS} from "../actions/carousel-actions";

const initialState={
    events:[]
}

const CarouselReducer=(state=initialState,action)=>{
    switch (action.type){
        case FIND_TRENDING_EVENTS:
            return{
                ...state,
                events: action.events
            }
        default: return state;
    }
}

export default CarouselReducer;