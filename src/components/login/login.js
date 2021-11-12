import React, {useState,useEffect} from 'react'
import PrimarySearchAppBar from "../utils/navBar";
import {Link,useHistory} from "react-router-dom";
import {connect} from "react-redux";
import userActions from "../../actions/user-actions"
import {Button, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing(2),
    },
}));
const LogIn = (props) => {
    const history=useHistory();
    useEffect(()=>{
        if(props.session.userLoggedin)
            history.push("/profile")},[props.session.userLoggedin])

    const classes=useStyles();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userNameError,setUserNameError]=useState(false)
    const [passwordError,setPasswordError]=useState(false)
    // useEffect(()=>{
    //     loginUser()
    // },[userNameError,passwordError])
    // const loginUser=()=>{
    //     if(username.length>0 && password.length>0)
    //
    // }

    return (
        <>
            <PrimarySearchAppBar/>
            <div className="container ">
                <br/>
                <Typography variant="h2">Login</Typography>
                {
                    props.signUpStatus===200 &&
                        <Typography variant='h6' >You are registered successfully, please login to continue</Typography>
                }
                <form className={classes.root}>
                        <Typography variant={"h5"} color='error' style={{display:`${props.session.invalid ?'inline-block':'none'}`}}>
                            Invalid UserName and Password
                        </Typography>
                        <TextField error={userNameError} helperText={userNameError?"Username cannot be empty":""} className={classes.textField} variant="outlined" fullWidth label="User Name/ Email"
                                   onChange={(e) => setUsername(e.target.value)}
                        required={true}/>
                        <TextField error={passwordError} helperText={passwordError?"Password cannot be empty":""} className={classes.textField} variant="outlined" fullWidth label="Password"   type="password"
                                   onChange={(e) => setPassword(e.target.value)}
                        required={true}/>
                        <div>
                        </div>
                    <div>
                    <Button e className={classes.textField} variant="contained" color="primary" onClick={() => {
                        if(username.length<1) {
                            setUserNameError(true)
                            props.invalidUser()
                        }
                        else {
                            setUserNameError(false)
                            props.invalidUser()
                        }
                        if(password.length<1) {
                            setPasswordError(true)
                            props.invalidUser()
                        }
                        else{
                            setPasswordError(false)
                            props.invalidUser()
                        }
                        if(username.length>0 && password.length>0)
                            props.loginUser({username: username, password: password})
                    }
                    }>
                        Sign In
                    </Button>
            </div>
                    <Typography className={classes.textField}> Don't have an account?
                        <Link to="/signup">Sign Up</Link>
                    </Typography>
                </form>
            </div>
        </>

    )
}

const mtsp=(state)=>({
    session: state.sessionReducer,
    signUpStatus: state.signUpReducer.status
})

const dtsp=(dispatch)=>({
    loginUser:(user)=> userActions.login(dispatch,user),
    invalidUser: ()=>userActions.invalidFalse(dispatch)
})

export default connect(mtsp,dtsp)(LogIn);