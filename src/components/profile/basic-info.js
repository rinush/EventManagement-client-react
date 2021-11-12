import {React, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useFormik} from "formik";
import * as yup from "yup";


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

const BasicInfo = ({user,updateUser,anonymous}) => {

    const classes = useStyles();

    const [editing, setEditing] = useState(false)

    const validationSchema = yup.object({
        firstName: yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Cannot be blank'),
        lastName: yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Cannot be blank'),
        password: yup.string()
            .min(8, 'password is too short'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    })

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            gender: user.gender,
            userName: user.userName,
            password: user.password,
            confirmPassword: user.password,
            email: user.email,
            type: user.type,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (async values => {
            await updateUser({...values, id: user.id})
            setEditing(false)
        }),
    })

    return (
        <div>
            {
                !editing &&
                <div className="container-fluid">

                    <div className={classes.formControl}>

                        <div>
                            <Typography>First Name</Typography>
                        </div>

                        <div>
                            <div>
                                {user.firstName}
                            </div>
                        </div>
                    </div>

                    <div className={classes.formControl}>

                        <Typography> Last Name</Typography>
                        <div>
                            {user.lastName}
                        </div>

                    </div>


                    <div className={classes.formControl}>

                        <Typography> Username</Typography>

                        <div>
                            {
                                user.userName
                            }
                        </div>

                    </div>

                    <div className={classes.formControl}>

                        <Typography> Email</Typography>

                        <div>
                            {
                                user.email
                            }
                        </div>
                    </div>

                    {

                        !anonymous &&

                        <div className={classes.formControl}>

                            <Typography>Date of Birth</Typography>
                            <div>
                                {
                                    user.dob
                                }
                            </div>
                        </div>
                    }
                    <div className={classes.formControl}>

                        <Typography> Gender</Typography>

                        <div>
                            {
                                user.gender
                            }
                        </div>
                    </div>
                </div>}
            <br/>
            {
                !anonymous &&
                <div className="row mt-3">

                    <div className="col-6">

                    </div>

                    <div className="col-6">
                        {
                            !editing &&
                            <Button className={classes.textField} type='submit' variant="contained" color="primary"
                                    onClick={() => {
                                        setEditing(true)
                                    }}>
                                Edit Profile</Button>
                        }
                    </div>

                </div>
            }

            {
                editing &&
                <form className={classes.root} onSubmit={formik.handleSubmit}>
                    <TextField value={formik.values.firstName} onChange={formik.handleChange} id='firstName'
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
                               disabled={true}
                               className={classes.textField} label={'User name'} variant='outlined' fullWidth
                               error={formik.touched.userName && Boolean(formik.errors.userName)}
                               helperText={formik.touched.userName && formik.errors.userName}
                               onBlur={(e) => {
                                   formik.handleBlur(e)
                               }}/>
                    <TextField value={formik.values.email} onChange={formik.handleChange} id='email' disabled={true}
                               className={classes.textField} label={'Email address'} variant='outlined' fullWidth
                               error={formik.touched.email && Boolean(formik.errors.email)}
                               helperText={formik.touched.email && formik.errors.email}
                               onBlur={async (e) => {
                                   await formik.handleBlur(e)
                               }}/>
                    <TextField value={formik.values.dob} onChange={formik.handleChange} id='dob'
                               className={classes.textField} label={'Date of Birth'} variant='outlined' fullWidth
                               required
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
                    <TextField value={formik.values.password} type='password' onChange={formik.handleChange}
                               id='password'
                               className={classes.textField} label={'Password'} variant='outlined' fullWidth required
                               error={formik.touched.password && Boolean(formik.errors.password)}
                               helperText={formik.touched.password && formik.errors.password}
                               onBlur={formik.handleBlur}/>
                    <TextField value={formik.values.confirmPassword} type='password' onChange={formik.handleChange}
                               id='confirmPassword'
                               className={classes.textField} label={'Confirm Password'} variant='outlined' fullWidth
                               required
                               error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                               helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                               onBlur={formik.handleBlur}/>
                    <Button className={classes.textField} type='submit' variant="contained"
                            color="primary">Save</Button>
                    <Button className={classes.textField} onClick={() => {
                        setEditing(false)
                    }} type='button' variant="contained">Cancel</Button>
                </form>
            }


        </div>
    )

}
export default BasicInfo