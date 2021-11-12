import {combineReducers} from "redux";
import CarouselReducer from "./carousel-reducer";
import RecommendationReducer from "./recommendation-reducer";
import SearchReducer from "./search-reducer";
import eventReducer from "./event-reducer";
import navBarReducer from "./navBar-reducer";
import userReducer from "./user-reducer";
import commentReducer from "./comment-reducer";
import sessionReducer from "./session-reducer";
import signUpReducer from "./signUp-reducer";

export default combineReducers({
    carousel: CarouselReducer,
    recommended: RecommendationReducer,
    search: SearchReducer,
    eventReducer,
    navBarReducer,
    userReducer,
    commentReducer,
    sessionReducer,
    signUpReducer
})