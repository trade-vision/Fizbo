import React, { useRef, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Dropdown from 'react-bootstrap/Dropdown'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import blue from '@material-ui/core/colors/blue'

import Jumbotron from 'react-bootstrap/Jumbotron'

const theme = {
    spacing: [0, 2, 3, 5, 8],
}

const inputProps = {
    step: 300,
    textAlign: 'center'
};

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        align: "center",
        width: 300,
        marginLeft: theme.spacing(83),
        marginTop: theme.spacing(5),
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));

const cities = ['New Orleans', 'Baton Rouge', 'Westabnk', 'Kenner', 'Mandeville', 'Hammond']

export default function WelcomeHeader() {

    const classes = useStyles();
    const [values, setValues] = React.useState({
        city: 'New Orleans',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Jumbotron>
                <h1 align="center">Welcome to  Phzbo!</h1>
                <h6 align="center">The intermediary between real-estate wholesalers and property investors.</h6>
                <h6 align="center">We have a variety of off market properties located all over Southeast Louisiana.</h6>
                <h6 align="center">    Put your city and zip code below to see properties near you!</h6>
                <p>
                    <Dropdown
                        classes={{
                            input: classes.inputCenter
                        }}
                        align="center"
                        label="Select"
                        // className={classes.textField}
                        // onChange={handleChange('currency')}
                        helperText="Please select your city"
                        margin="dense"
                    >
                        <Dropdown.Toggle variant="success" id="dropdown-basic" align={'center'}>
                        Choose your city
  </Dropdown.Toggle>
                        <Dropdown.Menu>
                        {cities.map(city => (
                            <Dropdown.Item key={city} value={city}>
                                {city}
                            </Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <TextField
                        inputProps={inputProps}
                        label="Enter zip code"
                        placeholder="Zip Code"
                        className={classes.textField}
                        margin="auto"
                        color={blue[400]}
                />
                </p>
            </Jumbotron>
            
        </React.Fragment>
        
    );
}
