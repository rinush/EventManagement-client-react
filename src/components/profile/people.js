import {makeStyles} from "@material-ui/core/styles";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const People=({followers,following,setLoading})=>{
    const history=useHistory()
    const classes=useStyles()

    return(
        <>
            <Typography variant='h6'>followers: {followers.length} </Typography>
        <List className={classes.root}>
            {
                followers &&
                followers.map(follower=>
                    <ListItem onClick={()=>{
                        setLoading()
                        history.push(`/profile/${follower.id}`)
                    }}>
                        <ListItemAvatar>
                            <Avatar>
                                <FaceIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={follower.userName} />
                    </ListItem>)
            }
        </List>
            <Typography variant='h6'>following: {following.length}</Typography>
        <List  className={classes.root}>
            {
                following &&
                following.map(follow=>
                    <ListItem onClick={()=>{
                        setLoading()
                        history.push(`/profile/${follow.id}`)
                    }}>
                        <ListItemAvatar>
                            <Avatar>
                                <FaceIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={follow.userName} />
                    </ListItem>)
            }
        </List>
        </>
    )
}

export default People;