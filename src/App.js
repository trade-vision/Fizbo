import React, {useState, useEffect} from 'react';
import './css/App.css';
import { withRouter } from "react-router";
import Welcome from './components/Welcome.js'
import PropertyList from './components/property/HomepageProps'
import Nav from './components/Nav.js'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddProperty from './components/property/AddProperty'
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

  const [user, setUser] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleUser = () => {
    if(props.user){
      setUser(props.user);
      setIsSignedIn(true);
    }
  }

  useEffect(() => {
    // code to run on component mount
    handleUser();
  });
  

  return (
    <div className="App">
      <Welcome />
      {/* <PropertyList user={user}/> */}
      {isSignedIn ? <AddProperty user={user}/> : null}
    </div>
  );
}


export default withRouter(App);
