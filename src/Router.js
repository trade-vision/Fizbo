import React from 'react';
import App from './App.js';
import Nav from './components/Nav.js'
import SignInView from './components/SignIn.js'
import SignUpView from './components/SignUp.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function Router() {
    return (
        <div className="App">
            
            <BrowserRouter>
                <Switch>  
                    <Route path="/" render={() => <App />} exact />
                    <Route exact path="/signIn" render={() => <SignInView />} />
                    <Route exact path="/signUp" render={() => <SignUpView />} />
                </ Switch>

            </BrowserRouter>
        </div>
    );
}

export default Router;
