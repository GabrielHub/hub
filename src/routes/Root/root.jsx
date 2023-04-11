import React from 'react';
import { Grid, Typography } from '@mui/material';
import { PlayerGrid } from 'components/PlayerGrid';
import {
  DEFENSIVE_PLAYERS_COLUMNS,
  DEFENSIVE_PLAYERS_DEFAULT_SORTS,
  OFFENSIVE_PLAYERS_COLUMNS,
  OFFENSIVE_PLAYERS_DEFAULT_SORTS
} from './constants';

export function Root() {
  return (
    <Grid sx={{ padding: 2, height: 500 }} spacing={2} container>
      <Grid xs={12} container item>
        <Grid xs={12} item>
          <Typography variant="h4" gutterBottom>
            A comprehensive glossary and analytics hub
          </Typography>
        </Grid>
        <Grid xs={6} item>
          <Typography variant="body2" gutterBottom>
            Effortlessly browse through a wealth of statistics, organized in a sleek and visually
            captivating format. Use performance metrics, advanced analytics, and player data to
            unlock insights and trends.
          </Typography>
        </Grid>
      </Grid>
      <Grid xs container item>
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
      <Grid xs container item>
        <Grid xs={12} item>
          <Typography variant="h5" gutterBottom>
            Players Ranked By Defense
          </Typography>
        </Grid>
        <PlayerGrid
          columns={DEFENSIVE_PLAYERS_COLUMNS}
          defaultSortField={DEFENSIVE_PLAYERS_DEFAULT_SORTS.field}
          defaultSortType={DEFENSIVE_PLAYERS_DEFAULT_SORTS.type}
        />
      </Grid>
    </Grid>
  );
}

export default {};
