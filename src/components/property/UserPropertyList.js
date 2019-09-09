import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import PropertyCard from './PropertyListItems.js'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(2),
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function PropertyList(props) {
    const [spacing, setSpacing] = useState(2);
    const classes = useStyles();
    const userProperties = props.userProps
    

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {userProperties.map(value => (
                        <Grid key={value} item>
                            <PropertyCard userProperties={userProperties} className={classes.paper} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
