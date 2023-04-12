import React from 'react';
import { Grid, Link, Typography } from '@mui/material';
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
        <Grid xs={12} item>
          <Typography variant="body2" gutterBottom>
            This is an open source project built with React, Firebase, Express and Node. Report bugs
            and view updates{' '}
            <Link
              href="https://github.com/GabrielHub/hub"
              target="_blank"
              rel="noreferrer"
              variant="body2"
              underline="none">
              here!
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid xs container item>
        <Grid xs={12} item>
          <Typography variant="h5" gutterBottom>
            Players Ranked By Offense (min 5 games)
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
            Players Ranked By Defense (min 5 games)
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
