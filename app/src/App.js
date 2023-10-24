import React, { useEffect } from 'react';
import './App.css';
import Menubar from './components/Menubar';
import { Outlet } from 'react-router-dom';
import { fetcher } from './common/fetcher';

function App() {
  const [players, setPlayers] = React.useState([]);
  const fetchPlayers = async () => {
    try {
      const { data } = await fetcher.get('/api/players');
      if (data) {
        setPlayers(data);
      } else {
        console.error('Failed to fetch player data');
      }
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className='App'>
      <Menubar />
      <Outlet context={{ players }} />
    </div>
  );
}

export default App;
