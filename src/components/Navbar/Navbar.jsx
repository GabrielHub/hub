import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import logo512 from '../../images/logo512.png';
import navConfig from './constants';

export function Navbar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <img src={logo512} alt="Logo" style={{ width: 50 }} />
            Hub
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {navConfig.map((route) => (
              <Link key={route.path} to={route.path} style={{ textDecoration: 'none' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 2 }}>
                  {route.title}
                </Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default {};
