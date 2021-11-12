import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import UserRow from "./user-row";
import PrimarySearchAppBar from "../utils/navBar";
import {connect} from "react-redux";

import userActions from "../../actions/user-actions"
import {Typography} from "@material-ui/core";

const AdminDashBoard = (props) => {

    useEffect(()=>{
        if(props.session.user.type==="ADMIN")
            props.findAllUsers()
    },[props.session.userLoggedin])

    return(<>
            <PrimarySearchAppBar/>
            { props.session.userLoggedin && props.session.user.type==="ADMIN" &&
            <div className="container">
                <h1>Admin Dashboard</h1>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="true" href="#">Users</Link>
                                    </li>
                                    {/*<li className="nav-item">*/}
                                    {/*    <Link className="nav-link" href="#">Events</Link>*/}
                                    {/*</li>*/}
                                </ul>
                            </div>
                            <div className="card-body">

                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">DOB</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        props.session.users.map(user=>
                                            !(user.type==="ADMIN") &&
                                            <UserRow key={user.id} user={user} deleteUser={(userId)=>props.deleteUser(userId)}/>)
                                    }
                                    </tbody>
                                </table>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
            }
            {
                !(props.session.user.type==="ADMIN") &&
                <Typography variant='h3' color='error'>Sorry, You are not authorized to view this page</Typography>
            }
        </>
    )

}


const mtsp=(state)=>({
    session: state.sessionReducer
})

const dtsp=(dispatch)=>({
    findAllUsers:()=> userActions.findAllUsers(dispatch),
    deleteUser:(userId) => userActions.deleteUser(dispatch,userId)
})



export default connect(mtsp,dtsp)(AdminDashBoard);