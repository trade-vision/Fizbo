import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import blue from '@material-ui/core/colors/blue'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import UserProfile from './user/UserProfile.js'
import { Link, Redirect } from 'react-router-dom'; 
import '../css/bootstrap-social.css'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 0,
        color: "white"
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        color: "white"
    },
    appBar: {
        color: blue
    }, 
    palette: {
        primary: { main: blue[400] },
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: { main: blue[600] },
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
    typography: { color: 'white' },
});



export default function MenuAppBar(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const open = Boolean(anchorEl);

    const handleUserPrivledges = () => {
        if(props.user){
        if(Object.keys(props.user).length > 2){
            setIsSignedIn(true);
        }
    }
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }


    useEffect(() => {
        // code to run on component mount
        handleUserPrivledges();
    })

    return (
        <div className={classes.root}>
            <MuiThemeProvider theme={theme}>
                <AppBar position="static" className={classes.palette}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}> 
                    <Typography variant="h6" className={classes.title}>
                        Phzbo
          </Typography>
                        </Link>
                        <Button variant="h6" className={classes.root}>
                            Services
          </Button> 
                        <Button variant="h6" className={classes.root}>
                            Properties
          </Button> 
                        <Button variant="h6" className={classes.root}>
                            Contact Us
          </Button> 
                        {isSignedIn ? <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <Link to={{
                                    pathname: "/profile",
                                    state: props.user
                                }}
                                > 
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                </Link>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                        :
                        <div>
                                <a class="btn btn-block btn-social btn-google">
                                    <span class="fa fa-google"></span> Sign in with Google
                                </a>
                            </div>}
                </Toolbar>
            </AppBar>
            </MuiThemeProvider>
        </div>
    );
}
