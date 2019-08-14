import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom'; 
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handlePassword = (event) => {
    const pass = event.target.value;
    setPassword(pass);
  }

  const handleEmail = (event) => {
    const _email = event.target.value;
    setEmail(_email);
  }

  const sendSignInCredentials = async () => {
    let credentials = {email: email, password: password}
    let user = await axios.get('/user', credentials);
    console.log(user);
    if(user.status ===  200){
      setIsSignedIn(true)
    }
  }

  if(isSignedIn){
    return <Redirect to="/" />;
  } else {
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleEmail}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                onChange={handlePassword}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={sendSignInCredentials}
              >
                Sign In
            </Button>
              <Grid container>
                <Grid item xs>
                  <TextLink href="#" variant="body2">
                    Forgot password?
                </TextLink>
                </Grid>
                <Grid item>
                  <Link to="/signUp" style={{ color: 'white', textDecoration: 'none' }}>
                    <TextLink href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </TextLink>
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
  
}