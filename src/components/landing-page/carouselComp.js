import React,{useEffect} from "react";
import{connect} from "react-redux";

import carouselActions from "../../actions/carousel-actions";
import {Grid, Typography} from "@material-ui/core";
import ImgMediaCard from "../utils/imageCard";
import {makeStyles} from "@material-ui/core/styles";
import Spinner from "../utils/spinner";

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

const CarouselComp=(
    props
)=>{
    const classes=useStyles();
    useEffect(()=>
        props.findTrending(),[]
    )
    return(
        <div style={{margin: '2em'}}>
            <Typography variant='h3'>Trending events</Typography>
            {
            !props.loading&&
            <>

                <div className={classes.root}>
                    <Grid container direction='row' spacing={3} >
                        {
                            props.events &&
                            props.events.map(eve=>{
                                return(
                                    <Grid key={eve.id} item className={classes.paper}>
                                        <ImgMediaCard event={eve}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </>}
            {
                props.loading &&
                    <Spinner/>
            }
        </div>
    )
}

const stmp= (state)=>({
    events: state.carousel.events,
    loading: state.navBarReducer.loading
})

const dtmp=(dispatch)=>({
    findTrending:()=> carouselActions.findTrending(dispatch)
})

export default connect(stmp,dtmp)(CarouselComp);