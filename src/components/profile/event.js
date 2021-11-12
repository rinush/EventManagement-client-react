import React from 'react';
import './profile-style.css'
import {Grid} from "@material-ui/core";
import ImgMediaCard from "../utils/imageCard";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Event = ({user}) => {

    const classes = useStyles();
    return(
        <div class="container-fluid">
                {

                        <Grid container direction='row' spacing={3} >
                            {
                                user.attending &&
                                user.attending.map(eve=>{
                                    return(
                                        <Grid key={eve.id} item className={classes.paper}>
                                            <ImgMediaCard event={eve}/>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                }
        </div>
    )

}

export default Event