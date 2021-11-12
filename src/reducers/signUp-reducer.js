import {EMAIL_STATUS, SIGN_UP, USERNAME_STATUS} from "../actions/signup-action";


const initialState={
    status: 500,
    userNameStatus: 200,
    emailStatus: 200
}

const signUpReducer=(state=initialState,action)=>{
    switch (action.type){
        case SIGN_UP: {
            return ({
                ...state,
                status: action.status
            })
        }
        case USERNAME_STATUS:{
            return ({
                ...state,
                userNameStatus: action.status
            })
        }
        case EMAIL_STATUS:{
            return ({
                ...state,
                emailStatus: action.status
            })
        }
        default:  return state
    }
}

export default signUpReducer;