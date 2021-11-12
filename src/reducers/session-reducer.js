import * as _ from "lodash"
import {DELETE_USER, FOLLOW, INVALID_USER, LOGOUT, SET_ALL_USERS, SET_USER, UNFOLLOW} from "../actions/user-actions";


const initState={
    user: {},
    invalid: false,
    userLoggedin:false,
    users:[]
}

const sessionReducer=(state=initState,action)=>{
    console.log("session reducer called")
    switch (action.type)
    {
        case SET_USER: {
            if(action.responseUser.id!=null)
                return({...state,user: action.responseUser,invalid: false,userLoggedin: true})
            else
                return({...state,user: action.responseUser,invalid: false,userLoggedin: false})
        }
        case INVALID_USER:{
            return ({...state,invalid: action.value})
        }
        case LOGOUT:{
            return ({...state,userLoggedin: false})
        }
        case SET_ALL_USERS:{
            return ({
                ...state,
                users: action.users
            })
        }
        case DELETE_USER:{
            return ({
                ...state,
                users: state.users.filter(user=>user.id!==action.userId)
            })
        }
        default: return state;
    }
}

export default sessionReducer;