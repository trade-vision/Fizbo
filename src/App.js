import React, {useState, useEffect} from 'react';
import './css/App.css';
import { withRouter } from "react-router";
import Welcome from './components/Welcome.js'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddProperty from './components/property/AddProperty'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:8080/">
        Phzbo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(62),
    padding: theme.spacing(6, 0),
  },
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
  }, [handleUser]);
  

  return (
    <div className="App">
      <Welcome />
      {isSignedIn ? <AddProperty user={user}/> : null}
      {/* Footer */}
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            Phzbo®
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Your wholesale property destination.
          </Typography>
          <Copyright />
        </Container>
      </footer>
      {/* End footer */}
    </div>
  );
}


export default withRouter(App);
