import React, { useRef, useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dropdown from 'react-bootstrap/Dropdown'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import PropertyList from './property/HomepageProps'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Carousel from 'react-bootstrap/Carousel'
import Grid from '@material-ui/core/Grid';
import { Typography } from 'antd';
import axios from 'axios';
import '../css/App.css'

const { Title } = Typography;

const theme = {
    spacing: [0, 2, 3, 5, 6],
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
    const [userSent, setUserSent] = useState(false)

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
                    

                    //grabbing the user for each property
                    
                    // allProps.map(async (prop) => {
                        
                    //         setUserSent(true)
                    //     // }
                    // });

                    // grabbing the images for each property
                    allProps.map(async (prop) => {
                        let user = await axios.get(`/user/${prop.id}`);
                        prop.user = user.data;
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
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ytimg.com/vi/0gjZrXyoaQY/maxresdefault.jpg"
                        alt="First slide"
                        height="600" 
                        width="1200"
                    />
                    <Carousel.Caption>
                        <Title>Welcome to Phzbo</Title>
                        <h6 align="center" className="welcome">The intermediary between real-estate wholesalers and property investors.</h6>
                        <h6 align="center" className="welcome">We have a variety of off market properties located all over Southeast Louisiana.</h6>
                        <h6 align="center" className="welcome">    Put your zip code in below to see properties near you!</h6>                    
                        </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.vox-cdn.com/thumbor/4rGH9tQpZ0rv_m86NM2swb8AX1k=/0x0:4000x2857/1200x675/filters:focal(1680x1109:2320x1749)/cdn.vox-cdn.com/uploads/chorus_image/image/59780613/EsplanadeAve_02_BayouEsplanadeTriangle_Gayarre.1526669317.jpg"
                        alt="Third slide"
                        height="600" 
                        width="1200"
                    />

                    <Carousel.Caption>
                        <Title>Welcome to Phzbo</Title>
                        <h6 align="center" className="welcome">The intermediary between real-estate wholesalers and property investors.</h6>
                        <h6 align="center" className="welcome">We have a variety of off market properties located all over Southeast Louisiana.</h6>
                        <h6 align="center" className="welcome">    Put your zip code in below to see properties near you!</h6>  
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://latter-blum.com/Homes/Images/Listings/135274965/1/589f66eb835d7e3b75c8a696918bf3c6/Photo.jpg"
                        alt="Third slide"
                        height="600" 
                        width="1200"
                    />

                    <Carousel.Caption>
                        <Title>Welcome to Phzbo</Title>
                        <h6 align="center" className="welcome">The intermediary between real-estate wholesalers and property investors.</h6>
                        <h6 align="center" className="welcome">We have a variety of off market properties located all over Southeast Louisiana.</h6>
                        <h6 align="center" className="welcome">    Put your zip code in below to see properties near you!</h6>  
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Grid container justify="center" marginTop="50">
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
