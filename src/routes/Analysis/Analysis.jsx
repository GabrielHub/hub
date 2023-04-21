import React from 'react';
import { Grid, Typography } from '@mui/material';
// import { PlayerGrid } from 'components/PlayerGrid';

export function Analysis() {
  return (
    <Grid sx={{ padding: 2, height: 500 }} spacing={2} container>
      <Grid xs={12} item>
        <Typography variant="h5" gutterBottom>
          HOW CAN WE USE THIS DATA?
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography>The averages ...</Typography>
      </Grid>
    </Grid>
  );
}

export default {};
