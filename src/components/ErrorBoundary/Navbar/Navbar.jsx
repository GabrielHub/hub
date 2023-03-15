import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import navConfig from './constants';

export function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">Hub</Typography>
        <Box>
          {navConfig.map((route) => (
            <Link key={route.path} to={route.path}>
              {route.title}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default {};
