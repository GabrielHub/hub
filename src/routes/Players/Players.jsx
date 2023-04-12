import React from 'react';
import { Grid, Typography } from '@mui/material';

import { PlayerGrid } from 'components/PlayerGrid';
import { AlgoliaSearch } from 'components/AlgoliaSearch';
import { RECENT_PLAYERS_COLUMNS, RECENT_PLAYERS_DEFAULT_SORTS } from './constants';

export function Players() {
  return (
    <Grid sx={{ padding: 1 }} container>
      <Grid xs={12} item>
        <Typography variant="h5" gutterBottom>
          Player Lookup
        </Typography>
      </Grid>
      <Grid xs={12} container alignItems="center" item>
        <AlgoliaSearch />
      </Grid>
      <Grid xs={12} item sx={{ paddingBottom: 16 }} />
      <Grid xs={12} item>
        <Typography variant="h5" gutterBottom>
          Recently Updated Players
        </Typography>
      </Grid>
      <PlayerGrid
        columns={RECENT_PLAYERS_COLUMNS}
        defaultSortField={RECENT_PLAYERS_DEFAULT_SORTS.field}
        defaultSortType={RECENT_PLAYERS_DEFAULT_SORTS.type}
      />
    </Grid>
  );
}

export default {};
