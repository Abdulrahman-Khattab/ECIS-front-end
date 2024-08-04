import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex' }}>
        <Typography variant='h6'>navbar</Typography>
        <Box justifyContent='center'>
          <Button
            sx={{ textAlign: 'center' }}
            variant='contained'
            color='secondary'
            component={Link}
            to='/'
          >
            main page
          </Button>
          <Button
            sx={{ marginLeft: 4 }}
            color='secondary'
            variant='contained'
            component={Link}
            to='/counter'
          >
            counter page
          </Button>
          <Button
            sx={{ marginLeft: 4 }}
            color='secondary'
            variant='contained'
            component={Link}
            to='/users'
          >
            user Page
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
