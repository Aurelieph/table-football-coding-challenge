import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Menubar = () => {
  const location = useLocation();

  const isButtonActive = (path) => location.pathname === path;

  return (
    <AppBar position='static'>
      <Toolbar>
        <Grid container>
          <Grid item xs={4}>
            <Typography
              variant='h3'
              component={Link}
              to='/'
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontSize: '2rem',
                marginRight: '1rem',
              }}
            >
              Table Football
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button
              component={Link}
              to='/'
              color='inherit'
              style={{
                width: '200px',
                fontSize: '1rem',
                fontWeight: isButtonActive('/') ? 'bold' : 'normal',
              }}
            >
              Leaderboard
            </Button>
            <Button
              component={Link}
              to='/match'
              color='inherit'
              style={{
                width: '200px',
                fontSize: '1rem',
                fontWeight: isButtonActive('/match') ? 'bold' : 'normal',
              }}
            >
              New Match
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Menubar;
