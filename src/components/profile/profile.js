import React, {useEffect, useState} from 'react';
import './profile-style.css'
import BasicInfo from './basic-info.js'
import PrimarySearchAppBar from "../utils/navBar";
import {Link, useHistory, useParams} from "react-router-dom";
import userService from "../../services/user-service";
import {connect} from "react-redux";
import Event from "./event";
import {Button, Dialog, DialogActions, DialogTitle, Typography} from "@material-ui/core";
import Spinner from "../utils/spinner";
import userActions from '../../actions/user-actions'
import People from './people'
import {setLoading} from '../../actions/navBar-actions'

const Profile = (
    {
        user,
        updateUser,
        session,
        loading,
        follow,
        unFollow,
        findUserDetails,
        followers,
        following,
        setLoading
    }
) => {

    const {uid} = useParams();
    const [isInfoTab, setIsInfoTab] = useState(0)
    const [anonymous, setAnonymous] = useState(true)
    const [followingUser, setFollowingUser] = useState(false)
    const [open, setOpen] = React.useState(false);
    const history=useHistory();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        console.log(loading)
        if (uid) {
            findUserDetails(uid)
            setAnonymous(true)
        }
        else if (session.userLoggedin) {
            findUserDetails(session.user.id)
            setAnonymous(false)
        }
        if (uid == session.user.id) {
            setAnonymous(false)
        }

    }, [session.userLoggedin, uid])

    useEffect(() => {
        if (session.userLoggedin && anonymous) {
            if (followers) {
                if (followers.find(follower => follower.id === session.user.id))
                    setFollowingUser(true)
                else
                    setFollowingUser(false)
            }
        }
    }, [followers,uid])

    return (
        <>
            <PrimarySearchAppBar/>
            {
                !loading && user &&
                <div className='container' style={{marginBottom: '2em'}}>
                    <br/>
                    <h1>Profile</h1>
                    <br/>
                    <div className="row">

                        <div className="card col-sm-3">
                            <br/>


                            <div className="text-center">
                                <br/>
                                <img
                                    src="https://st.depositphotos.com/2218212/2938/i/950/depositphotos_29387653-stock-photo-facebook-profile.jpg"
                                    className="img-fluid img-thumbnail"/>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title text-center">{user.firstName} {user.lastName}</h5>
                                {
                                    anonymous && !followingUser &&
                                    <Button onClick={() => {
                                        if (session.userLoggedin)
                                            follow(session.user.id, user.id)
                                        else
                                            setOpen(true)
                                    }} fullWidth style={{float: 'right'}} color='primary'
                                            variant='contained'>Follow</Button>}
                                {
                                    anonymous && followingUser &&
                                    <Button onClick={() => {
                                        if (session.userLoggedin)
                                            unFollow(session.user.id, user.id)
                                    }} fullWidth style={{float: 'right'}}
                                            variant='contained'>UnFollow</Button>
                                }
                            </div>

                        </div>

                        <div className="col-sm">

                            <div className="card">
                                <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <Link className={`nav-link ${isInfoTab === 0 ? 'active' : ''}`}
                                                  aria-current="true" to="#"
                                                  onClick={() => setIsInfoTab(0)}>Basic Info</Link>
                                        </li>
                                        <li className="nav-item">{
                                            <Link className={`nav-link ${isInfoTab === 1 ? 'active' : ''}`} to="#"
                                                  onClick={() => setIsInfoTab(1)}
                                            >{
                                                !anonymous &&
                                                <Typography>My Events</Typography>}
                                                {
                                                    anonymous &&
                                                    <Typography>Events</Typography>
                                                }
                                            </Link>}
                                        </li>
                                        <li className="nav-item">{
                                            <Link className={`nav-link ${isInfoTab === 2 ? 'active' : ''}`} to="#"
                                                  onClick={() => setIsInfoTab(2)}
                                            >
                                                <Typography>People</Typography>
                                            </Link>}
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    {
                                        isInfoTab === 0 &&
                                        <BasicInfo user={user} updateUser={updateUser} anonymous={anonymous}/>
                                    }
                                    {
                                        isInfoTab === 1 &&
                                        <Event user={user}/>
                                    }
                                    {
                                        isInfoTab === 2 &&
                                        <People followers={followers} following={following} setLoading={setLoading}/>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                </div>}
            {
                loading &&
                <Spinner/>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="login-alert-dialog-title"
            >
                <DialogTitle id="login-alert-dialog-title">{"Please Login to continue"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <Button onClick={()=> {
                        handleClose()
                        history.push('/login')
                    }} color="primary" autoFocus>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

const stpm = (state) => {
    return {
        user: state.userReducer.userDetails.user,
        session: state.sessionReducer,
        loading: state.navBarReducer.loading,
        followers: state.userReducer.userDetails.followers,
        following: state.userReducer.userDetails.following
    }
}
const dtpm = (dispatch) => {
    return {
        updateUser:(user)=>{
            userService.updateUser(user)
                .then(u=>{
                    dispatch({
                        type:"FIND_USER_BY_ID",
                        user: u
                    })
                })
        },
        follow: (userId,targetId)=> userActions.followUser(dispatch,userId,targetId),
        unFollow: (userId,targetId)=> userActions.unFollowUser(dispatch,userId,targetId),
        findUserDetails: (userId)=> userActions.findUserDetails(dispatch,userId),
        setLoading:()=> setLoading(dispatch,true)
    }
}

export default connect(stpm, dtpm)
(Profile)