import React, {useState, useEffect} from 'react';
import App from './App.js';
import UserProfile from './components/user/UserProfile.js'
import FriendsProfile from './components/user/FriendsProfile.js'
import Nav from './components/Nav'
import axios from 'axios';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function Router() {

    const [user, setUser] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false)

    //Handles user's information and properties
    const handleUser = async () => {
        try {
            let response = await axios.get('/profile');
            let userData = response.data;
            axios.get('/likes')
                .then((likes) => {
                    userData.likes = likes.data;

                })
            setUser(userData)
            setIsSignedIn(true);
        } catch {
            console.log('gotta login bro');
        }
    }

    const handleLogout = () => {
        axios.get('/logout')
            .then((loggedOut) => {
                setIsSignedIn(false);
                setUser(null)
                window.location.reload()
            });
    }


    useEffect(() => {
        // code to run on component mount
        handleUser();
    }, [])
    
    return (
        <div className="App">
            
            <BrowserRouter>
                <Nav user={user} logOut={handleLogout}/>
                <Switch>  
                    <Route path="/" render={() => <App user={user}/>} exact />
                    <Route exact path="/myprofile" component={UserProfile} />} />
                    <Route exact path="/:user" component={FriendsProfile} /> 
                </ Switch>

            </BrowserRouter>
        </div>
    );
}

export default Router;
