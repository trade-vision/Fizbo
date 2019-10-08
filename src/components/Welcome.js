import React, { useRef, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dropdown from 'react-bootstrap/Dropdown'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import PropertyList from './property/HomepageProps'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Grid from '@material-ui/core/Grid';


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
        // marginLeft: theme.spacing(83),
        // marginTop: theme.spacing(5),
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));

const cities = ['New Orleans', 'Baton Rouge', 'Westbank', 'Kenner', 'Mandeville', 'Hammond']

export default function WelcomeHeader() {

    const classes = useStyles();
    const [zipCode, setZip] = React.useState('');
    const [values, setValues] = React.useState({
        city: 'New Orleans',
    });
    const [city, setCity] = React.useState(cities[0])

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
        console.log(values);
    };

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

    const handleZip = event => {
        const zip = event.target.value;
        setZip(zip);
        console.log(zipCode);
    }

    //function changes the state of the city
    const cityChange = event => {
        const newCity = event;
        setCity(newCity);
    }

    //function sends get request for properties based on zip code and city 

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
                        onChange={handleChange('currency')}
                        helperText="Please select your city"
                        margin="dense"
                        onSelect={cityChange}
                    >
                        <Dropdown.Toggle variant="success" id="dropdown-basic" align={'center'} placeholder={"Choose your city"}>
                            {city}
  </Dropdown.Toggle>
                        <Dropdown.Menu onSelect={cityChange}>
                        {cities.map(city => (
                            <Dropdown.Item key={city} value={city} eventKey={city}>
                                {city}
                            </Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Grid container justify="center" >
                    <TextField
                        inputProps={{ style: { textAlign: 'center' } }}
                        label="Enter zip code"
                        placeholder="Zip Code"
                        className={classes.textField}
                        margin="auto"
                        color={blue[400]}
                        onChange={handleZip}
                />
                </Grid>
                </p>
            </Jumbotron>
            <div>
                <PropertyList />
            </div>
        </React.Fragment>
       
    );
}
