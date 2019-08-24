import React, {useState, useEffect} from 'react';
import './css/App.css';
import { withRouter } from "react-router";
import Welcome from './components/Welcome.js'
import PropertyList from './components/property/PropertyList.js'
import Nav from './components/Nav.js'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  fab: {
    // margin: theme.spacing(195),
    // position: "fixed",
    // marginTop: theme.spacing(100)
    // color: theme.color("blue")
  }
}));


function App(props) {
  const classes = useStyles();
  

  return (
    <div className="App">
      <Welcome />
      <PropertyList />
      {/* {isSignedIn ? <Fab color="secondary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab> : null} */}
    </div>
  );
}


export default withRouter(App);
