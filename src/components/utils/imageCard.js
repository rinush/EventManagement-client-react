import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: '35vh',
        minWidth: '35vh',
        minHeight: '40vh',
        maxHeight:'50vh'
    },
    text: {
        textDecoration: 'none'
    }
});

export default function ImgMediaCard({event}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Link to={`/event/${event.id}`}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={event.performers[0].name}
                    height="180"
                    image={event.performers[0].image}
                    title={event.title}
                />
                <CardContent >
                    <Typography gutterBottom variant="h5" component="h2">
                        {event.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {event.datetime_local}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {event.venue.name}, {event.venue.state}
                    </Typography>
                </CardContent>
            </CardActionArea>
            </Link>
        </Card>
    );
}
