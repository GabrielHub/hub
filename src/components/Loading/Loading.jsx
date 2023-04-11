import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from '@mui/material';

export function Loading(props) {
  const { isLoading } = props;
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default {};
