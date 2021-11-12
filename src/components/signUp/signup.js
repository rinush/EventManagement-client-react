import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import PrimarySearchAppBar from "../utils/navBar";
import {useHistory} from "react-router-dom";
import {useFormik} from 'formik';
import * as yup from 'yup';
import * as _ from 'lodash'
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import signUpActions from "../../actions/signup-action"


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    }
}));
const SignUp = (props) => {
    const classes=useStyles();
    const [signUpError,setSignUpError]=useState(false)
    const history = useHistory();

    useEffect(()=>{
        if(props.signUpState.status===400)
            setSignUpError(true)
        else if(props.signUpState.status===200)
            history.push("/login")
    },[props.signUpState.status])

    const validationSchema=yup.object({
        firstName: yup.string()
            .min(2,'Too Short!')
            .max(50,'Too Long!')
            .required('Cannot be blank'),
        lastName: yup.string()
            .min(2,'Too Short!')
            .max(50,'Too Long!')
            .required('Cannot be blank'),
        userName: yup.string()
            .min(2,'Too Short!')
            .max(50,'Too Long!')
            .required('Cannot be blank'),
        email: yup.string()
            .email('enter valid email address')
            .required('email cannot be blank'),
        password: yup.string()
            .min(8,'password is too short'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    })


    const formik=useFormik({
        initialValues:{
            firstName: '',
            lastName: '',
            dob: '1995-07-23',
            gender: '',
            userName: '',
            password: '',
            confirmPassword:'',
            email:'',
            type: 'USER'
        },
        validationSchema:validationSchema,
        onSubmit: (values => {
            console.log(values)
            props.signUpUser(_.omit(values,['confirmPassword']))
        })
    })


    return (
        <>

            <PrimarySearchAppBar/>
            <div className='container'>
                <br/>
                <Typography variant='h2'>Sign Up</Typography>{
                signUpError &&
                <Typography variant='h6' color='error'>There was an error with Sign up request, please check the user
                    name and email address</Typography>}
                <form className={classes.root} onSubmit={formik.handleSubmit}>
                    <TextField value={formik.values.firstName} onChange={formik.handleChange}  id='firstName'
                               className={classes.textField} label={'First name'} variant='outlined' fullWidth required
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                onBlur={formik.handleBlur}/>
                    <TextField value={formik.values.lastName} onChange={formik.handleChange} id='lastName'
                               className={classes.textField} label={'Last name'} variant='outlined' fullWidth required
                               error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                               helperText={formik.touched.lastName && formik.errors.lastName}
                               onBlur={formik.handleBlur}/>
                    <TextField value={formik.values.userName} onChange={formik.handleChange} id='userName'
                               className={classes.textField} label={'User name'} variant='outlined' fullWidth required
                               error={formik.touched.userName && Boolean(formik.errors.userName)}
                               helperText={formik.touched.userName && formik.errors.userName}
                               onBlur={(e)=> {
                                   formik.handleBlur(e)
                                   if(formik.touched.userName && !Boolean(formik.errors.userName))
                                        props.checkUserName(formik.values.userName)
                               }}/>
                    {
                        props.signUpState.userNameStatus===400 &&
                            <Typography variant='h6' color='error'>Username already in use try different user name</Typography>
                    }
                    <TextField value={formik.values.email} onChange={formik.handleChange} id='email'
                               className={classes.textField} label={'Email address'} variant='outlined' fullWidth required
                               error={formik.touched.email && Boolean(formik.errors.email)}
                               helperText={formik.touched.email && formik.errors.email}
                               onBlur={async (e)=> {
                                   await formik.handleBlur(e)
                                   if(formik.touched.email && !Boolean(formik.errors.email))
                                       props.checkEmail(formik.values.email)
                               }}/>
                    {props.signUpState.emailStatus===400 &&
                        <Typography variant='h6' color='error'>Email address is already in user please use different email</Typography>
                    }
                    <TextField value={formik.values.dob} onChange={formik.handleChange} id='dob'
                               className={classes.textField} label={'Date of Birth'} variant='outlined' fullWidth required
                               type='date' defaultValue="2017-05-24"/>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="gender-select-helper-label">Gender</InputLabel>
                        <Select variant='outlined' value={formik.values.gender} id='gender' name='gender'
                                labelId="gender-select-helper-label"
                                onChange={formik.handleChange}
                        >
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Female'>Female</MenuItem>
                            <MenuItem value='Non-Binary'>Non-Binary</MenuItem>
                        </Select>

                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="user-select-helper-label">Type</InputLabel>
                        <Select variant='outlined' value={formik.values.type} id='type' name='type'
                                labelId="user-select-helper-label"
                                onChange={formik.handleChange}
                        >
                            <MenuItem value='USER'>USER</MenuItem>
                            <MenuItem value='ADMIN'>ADMIN</MenuItem>
                        </Select>

                    </FormControl>
                    <TextField value={formik.values.password} type='password' onChange={formik.handleChange} id='password'
                               className={classes.textField} label={'Password'} variant='outlined' fullWidth required
                               error={formik.touched.password && Boolean(formik.errors.password)}
                               helperText={formik.touched.password && formik.errors.password}
                               onBlur={formik.handleBlur}/>
                    <TextField value={formik.values.confirmPassword} type='password' onChange={formik.handleChange} id='confirmPassword'
                               className={classes.textField} label={'Confirm Password'} variant='outlined' fullWidth required
                               error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                               helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                               onBlur={formik.handleBlur}/>
                    <Button className={classes.textField} type='submit' variant="contained" color="primary">SignUp</Button>
                </form>
            </div>
        </>
    )
}

const mtsp=(state)=>({
    signUpState: state.signUpReducer
})

const dtsp=(dispatch)=>({
  signUpUser: (user)=> signUpActions.signUp(dispatch,user),
  checkEmail: (email)=> signUpActions.checkEmail(dispatch,email),
  checkUserName: (userName)=> signUpActions.checkUserName(dispatch,userName)
})
export default connect(mtsp,dtsp)(SignUp);