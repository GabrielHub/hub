import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import navConfig from './constants';

export function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" sx={{ mr: 2 }}>
          Hub
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {navConfig.map((route) => (
            <Link key={route.path} to={route.path}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 2 }}>
                {route.title}
              </Typography>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default {};
