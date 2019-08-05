import React from 'react';
import './App.css';
import MenuAppBar from './components/Nav.js'
import Welcome from './components/Welcome.js'
import PropertyList from './components/PropertyList.js'


function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <Welcome />
      <PropertyList />
    </div>
  );
}

export default App;
