import {GET_LOCATION, SET_LOADING} from "../actions/navBar-actions";

const initialState={
    location:"",
    loading: true
}


const navBarReducer=(state=initialState,action)=>{
    switch (action.type){
        case GET_LOCATION:
            return(
        {
        ...state,
        location: action.location
        }
            )
        case SET_LOADING:
            return (
                {
                    ...state,
                    loading: action.loading
                }
            )
        default: return state;
    }
}

export default navBarReducer;