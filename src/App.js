import React from 'react';
import './App.css';
import MenuAppBar from './components/Nav.js'
import Welcome from './components/Welcome.js'

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <Welcome />
    </div>
  );
}

export default App;
