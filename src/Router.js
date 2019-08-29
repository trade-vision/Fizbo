import React, {useState, useEffect} from 'react';
import App from './App.js';
import UserProfile from './components/user/UserProfile.js'
import Nav from './components/Nav'
import axios from 'axios';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function Router() {

    const [user, setUser] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false)


    const handleUser = async () => {
        try {
            let response = await axios.get('/profile');
            let userData = response.data;
            setUser(userData)
            setIsSignedIn(true);
        } catch {
            console.log('gotta login bro');
        }
    }

    useEffect(() => {
        // code to run on component mount
        handleUser();
    }, [])
    
    return (
        <div className="App">
            
            <BrowserRouter>
                <Nav user={user} />
                <Switch>  
                    <Route path="/" render={() => <App user={user}/>} exact />
                    <Route exact path="/userProfile" render={() => <UserProfile />} />
                </ Switch>

            </BrowserRouter>
        </div>
    );
}

export default Router;
