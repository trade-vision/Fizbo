import React, {useEffect} from 'react';
import App from './App.js';
import SignInView from './components/user/SignIn.js'
import SignUpView from './components/user/SignUp.js'
import UserProfile from './components/user/UserProfile.js'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function Router() {
    
    return (
        <div className="App">
            
            <BrowserRouter>
                <Switch>  
                    <Route path="/" render={() => <App />} exact />
                    <Route exact path="/signIn" render={() => <SignInView />} />
                    <Route exact path="/signUp" render={() => <SignUpView />} />
                    <Route exact path="/profile" render={() => <UserProfile />} />
                </ Switch>

            </BrowserRouter>
        </div>
    );
}

export default Router;
