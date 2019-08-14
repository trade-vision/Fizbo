import React, {useState, useEffect} from 'react';
import './App.css';
import { withRouter } from "react-router";
import Welcome from './components/Welcome.js'
import PropertyList from './components/PropertyList.js'
import Nav from './components/Nav.js'


function App(props) {
  const  [user, setUser] = useState({});

  const handleUser = () => {
    setUser(props.history.location.state);
  }

  useEffect(() => {
    // code to run on component mount
    handleUser();
    console.log(user);
  })

  return (
    <div className="App">
      <Nav />
      <Welcome />
      <PropertyList />    
    </div>
  );
}


export default withRouter(App);
