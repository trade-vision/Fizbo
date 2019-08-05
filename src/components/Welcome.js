import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        align: 'center'
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

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography
                    component="div"
                    style={{ backgroundColor: "#cfe8fc", height: "50vh" }}
                >
                    <h1 align="center">Welcome to  Phzbo!</h1>
                    <p align="center">The intermediary between real-estate wholesalers and property investors.
                    We have a variety of off market properties located all over Southeast Louisiana.
        Put your city and zip code below to see properties near you!</p>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        className={classes.textField}
                        value={values.currency}
                        onChange={handleChange('currency')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Please select your city"
                        margin="normal"
                    >
                        {cities.map(city => (
                            <MenuItem key={city} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="standard-with-placeholder"
                        label="Enter zip code"
                        placeholder="Zip Code"
                        className={classes.textField}
                        margin="normal"
                    />
                </Typography>
            </Container>
        </React.Fragment>
    );
}
