import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(195),
        position: "static",
        // marginTop: theme.spacing(100)
    }
}));

export default function AddProperty(){
    const classes = useStyles();


    return(
        <div>
        <Fab color="secondary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab>
        </div>
    )
}