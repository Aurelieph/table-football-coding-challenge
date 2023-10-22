import React from 'react';
import './App.css';
import Menubar from './components/Menubar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Menubar />
      <Outlet />
    </div>
  );
}

export default App;
