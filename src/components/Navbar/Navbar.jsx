import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { THEME_COLORS } from 'constants';
import logo512 from '../../images/logo512.png';
import navConfig from './constants';

export function Navbar() {
  return (
    <>
      <Grid alignItems="center" sx={{ paddingBottom: 4 }} container>
        <Grid xs={2} sx={{ padding: 2 }} item>
          <Typography variant="h4" sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <img src={logo512} alt="Logo" style={{ width: 50 }} />
            Hub
          </Typography>
        </Grid>
        <Grid xs={10} justifyContent="flex-end" alignItems="center" container item>
          {navConfig.map((route) => (
            <Grid xs={2} key={route.path} item>
              <Link to={route.path} style={{ textDecoration: 'none' }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, mr: 2, color: THEME_COLORS.DARK }}
                  align="center">
                  {route.title}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Outlet />
    </>
  );
}

export default {};
