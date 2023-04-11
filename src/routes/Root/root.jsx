import React from 'react';
import { Grid, Typography } from '@mui/material';
import { PlayerGrid } from 'components/PlayerGrid';
import { OFFENSIVE_PLAYERS_COLUMNS, OFFENSIVE_PLAYERS_DEFAULT_SORTS } from './constants';

export function Root() {
  return (
    <Grid sx={{ padding: 2, height: 500 }} spacing={2} container>
      {/* Table for offensive players */}
      <Grid xs item>
        <Grid xs={12} item>
          <Typography variant="h5" gutterBottom>
            Players Ranked By Offense
          </Typography>
        </Grid>
        <PlayerGrid
          columns={OFFENSIVE_PLAYERS_COLUMNS}
          defaultSortField={OFFENSIVE_PLAYERS_DEFAULT_SORTS.field}
          defaultSortType={OFFENSIVE_PLAYERS_DEFAULT_SORTS.type}
        />
      </Grid>
    </Grid>
  );
}

export default {};
