import React from 'react';
import App from './App.js';
import MenuAppBar from './components/Nav.js'
import Welcome from './components/Welcome.js'
import PropertyList from './components/PropertyList.js'
import SignInView from './components/SignIn.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function Router() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" render={() => <App />} exact />
                    <Route exact path="/signIn" render={() => <SignInView />} />
                </ Switch>

            </BrowserRouter>
        </div>
    );
}

export default Router;
