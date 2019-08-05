import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
import blue from '@material-ui/core/colors/blue'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';



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



export default function MenuAppBar() {
    const classes = useStyles();
    

    return (
        <div className={classes.root}>
            <MuiThemeProvider theme={theme}>
                <AppBar position="static" className={classes.palette}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Phzbo
          </Typography>
                        <Button variant="h6" className={classes.root} >
                            Home
          </Button>
                        <Button variant="h6" className={classes.root}>
                            Services
          </Button> 
                        <Button variant="h6" className={classes.root}>
                            Properties
          </Button> 
                        <Button variant="h6" className={classes.root}>
                            Services
          </Button> 
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            // onClick={}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                </Toolbar>
            </AppBar>
            </MuiThemeProvider>
        </div>
    );
}