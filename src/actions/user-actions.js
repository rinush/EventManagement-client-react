import userService from "../services/user-service"
import {SIGN_UP} from "./signup-action";
import {SET_LOADING} from "./navBar-actions";

export const SET_USER="SET_USER";
export const INVALID_USER="INVALID_USER";
export const LOGOUT="LOGOUT";
export const SET_ALL_USERS="SET_ALL_USERS";
export const DELETE_USER="DELETE_USER";
export const FOLLOW="FOLLOW"
export const UNFOLLOW="UNFOLLOW"
export const SET_USER_DETAILS="SET_USER_DETAILS";

const login=(dispatch,user)=>{
    console.log("login action called")
    userService.logIn(user).then((responseUser)=>{
        if(responseUser.id===null)
            dispatch({type:INVALID_USER,value:true})
        else {
            dispatch({type: SET_USER, responseUser})
            dispatch({type: SIGN_UP,status:500})
            dispatch({type:SET_LOADING,loading:true})
        }
    })
}

const invalidFalse=(dispatch)=>{
    dispatch({type:INVALID_USER,value: false})
}

const register=(dispatch,user)=>{
    userService.createUser(user).then(status=>{
        return status
    })
}

const logout= async (dispatch)=>{
    await userService.logOut()
    dispatch({
        type: SET_USER_DETAILS,
        userDetails: {}
    })
    dispatch({
        type: "FIND_USER_BY_ID",
        userDetails: {}
    })
    dispatch({type:LOGOUT})

}

const checkLogin=(dispatch)=>{
    console.log('checkLogin called')
    userService.checkLoggedIn().then(responseUser=>{
        dispatch({type:SET_USER, responseUser})
    })
}

const findAllUsers=(dispatch)=>{
    userService.findAllUsers()
        .then(users=>dispatch({
            type: SET_ALL_USERS,
            users
        }))
}

const deleteUser=(dispatch,userId)=>{
    userService.deleteUser(userId)
        .then(dispatch({
            type: DELETE_USER,
            userId
        }))
}

const followUser=async (dispatch,userId,targetId)=>{
    userService.followUser(userId,targetId)
        .then(followers=>
        dispatch({
            type: FOLLOW,
            followers
        }))
}

const unFollowUser=async (dispatch,userId,targetId)=>{
    userService.unFollowUser(userId,targetId)
        .then(followers=>
    dispatch({
        type: UNFOLLOW,
        followers
    }))
}

const findUserDetails=(dispatch,userId)=>{
    userService.findUserDetails(userId)
        .then(userDetails=> {
            dispatch({
                type: SET_USER_DETAILS,
                userDetails
            })
            dispatch({
                type: SET_LOADING,
                loading: false
            })
        })
}

export default {login,register,logout,checkLogin,invalidFalse,findAllUsers,deleteUser,followUser,unFollowUser,findUserDetails}