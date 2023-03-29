import { Grid, Typography } from '@mui/material';
import React from 'react';

export function GM() {
  return (
    <Grid sx={{ margin: 2 }} container>
      <Grid xs={12} item>
        <Typography variant="h6" gutterBottom>
          Lookup a GM:
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography>List of GMs (sorted!)</Typography>
      </Grid>
    </Grid>
  );
}

export default {};
