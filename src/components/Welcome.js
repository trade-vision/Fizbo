import React, { useRef, useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dropdown from 'react-bootstrap/Dropdown'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import PropertyList from './property/HomepageProps'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Grid from '@material-ui/core/Grid';
import { Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

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
    const [city, setCity] = React.useState(cities[0]);
    const [allProps, setAllProps] = useState([]);
    const [propsSent, setPropsSent] = useState(false);
    const [picsSent, setPicsSent] = useState(false);

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
    }

    //function changes the state of the city
    const cityChange = event => {
        const newCity = event;
        setCity(newCity);
    }

    //function sends get request for properties based on zip code and city 
    const filterProperties = () => {
        if(zipCode.length ===  5){
            axios.get(`/propertiesAll/${zipCode}`)
                .then((properties)=>{
                   setPropsSent(true);
                   let allProps = properties.data;
                    allProps.forEach(prop => prop.images = []);
                    

                    // grabbing the images for each property
                    allProps.map(async (prop) => {
                        let images = await axios.get(`images/${prop.id}`);
                        if (images.data.length > 0){
                            images.data.map((image) => {
                                image.propId = prop.id;
                                prop.images.push(image);
                            });
                            setPicsSent(true)
                        }   
                    })

                    setAllProps(allProps);
                });
        } else if(zipCode.length < 5) {
            setPropsSent(false);
        }
    }

    const picAnaylzer = () => {
        if(picsSent){
            setZip(zipCode + ' ' + ' ');
        } 
    }

    useEffect(() => {
        // code to run on component mount
        
        filterProperties();
        picAnaylzer();
    }, [filterProperties])

    return (
        <React.Fragment>
            <CssBaseline />
            <Jumbotron>
                <Grid container justify="center" >
                    <Title>Welcome to Phzbo</Title>
                </Grid>
                <h6 align="center">The intermediary between real-estate wholesalers and property investors.</h6>
                <h6 align="center">We have a variety of off market properties located all over Southeast Louisiana.</h6>
                <h6 align="center">    Put your zip code in below to see properties near you!</h6>
                <p>
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
              {
                  propsSent ? 
                    <PropertyList properties={allProps} /> : 
                        <div style={{ marginTop: '100px' }}>
                        <Grid container justify="center" >
                            <Title level={3}>Search for properties using your zip code..</Title>
                    </Grid>
                    </div>
                } 
            </div>
        </React.Fragment>
       
    );
}
