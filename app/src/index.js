import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MatchPage from './pages/MatchPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardPage from './pages/DashboardPage';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(17, 17, 49)',
    },
    secondary: {
      main: 'rgb(255,224,170)',
    },
  },
});

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={App}>
              <Route path='/' Component={DashboardPage} />
              <Route path='/match' Component={MatchPage} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}
