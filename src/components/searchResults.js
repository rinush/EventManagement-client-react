import React, {useEffect, useState} from "react";
import PrimarySearchAppBar from "./utils/navBar";
import {connect} from "react-redux";
import searchActions from "../actions/search-actions";
import queryString from "querystring";
import _ from "lodash";
import ImgMediaCard from "./utils/imageCard";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Spinner from "./utils/spinner";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '2em'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textField:{
        margin: theme.spacing(2)
    }
}));

const SearchResults=({location,search,events,loading})=>{
    const classes = useStyles();
    const[searchValue,setSearchValue]=useState('')
    useEffect(()=>comppnentDidMount(),[])



    const comppnentDidMount=()=>{
        const searchText=queryString.parse(_.trimStart(location.search,'?'));
        setSearchValue(searchText.name);
        search(searchText.name);
        debugger
    }

    return(<div>
        <PrimarySearchAppBar/>
        <Typography className={classes.textField} variant='h3'>Showing Search Results
            for {searchValue}</Typography>
        {
            !loading&&
            <div>

                <div className={classes.root}>
                    <Grid container direction='row' spacing={3}>
                        {
                            events &&
                            events.map(eve => {
                                return (
                                    <Grid key={eve.id} item className={classes.paper}>
                                        <ImgMediaCard event={eve}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
                {
                    (!events || events.length === 0) &&
                    <Typography variant='h5' className={classes.textField}>Sorry, No Events Found</Typography>
                }
            </div>
        }
        {
            loading&&
                <Spinner/>
        }
    </div>)
}

const mstp=(state)=>({
    events: state.search.events,
    loading: state.navBarReducer.loading
})

const dstp=(dispatch)=>({
    search:(searchText)=> searchActions.findEventsByName(dispatch,searchText)
})


export default connect(mstp,dstp)(SearchResults);