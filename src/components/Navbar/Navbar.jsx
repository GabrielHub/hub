import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { THEME_COLORS } from 'constants';
import logo512 from '../../images/logo512.png';
import navConfig from './constants';

function MultiLink(props) {
  const { paths, header } = props;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ flexGrow: 1, mr: 2, color: THEME_COLORS.DARK }}
        onClick={handleClick}>
        {header}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}>
        {paths.map(({ path, title }) => (
          <MenuItem key={path} onClick={() => handleNavigation(path)}>
            {title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export function Navbar() {
  return (
    <>
      <Grid alignItems="center" sx={{ paddingBottom: 4 }} container>
        <Grid xs md={2} sx={{ padding: 2 }} item>
          <Typography variant="h4" sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <img src={logo512} alt="Logo" style={{ width: 50 }} />
            Hub
          </Typography>
        </Grid>
        <Grid xs md={10} justifyContent="flex-end" alignItems="center" container item>
          {navConfig.map((route) => (
            <Grid xs md={2} key={route.title} item>
              {!route.multi && (
                <Link to={route.path} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, mr: 2, color: THEME_COLORS.DARK }}
                    align="center">
                    {route.title}
                  </Typography>
                </Link>
              )}
              {route.multi && <MultiLink header={route.title} paths={route.paths} />}
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Outlet />
    </>
  );
}

MultiLink.propTypes = {
  header: PropTypes.string.isRequired,
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string
    })
  ).isRequired
};

export default {};
