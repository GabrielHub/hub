import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { PlayerGrid } from 'components/PlayerGrid';
import { OVERALL_PLAYERS_COLUMNS, OVERALL_PLAYERS_DEFAULT_SORTS } from './constants';

export function PER() {
  return (
    <Grid xs={12} sx={{ paddingBottom: 2 }} container item>
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="h5" gutterBottom>
          PER Leaders
        </Typography>
      </Grid>
      <Grid xs={6} item>
        <Typography>
          The Player Efficiency Rating (PER) is a per-minute rating developed by ESPN.com columnist
          John Hollinger. In John&apos;s words, &quot;The PER sums up all a player&apos;s positive
          accomplishments, subtracts the negative accomplishments, and returns a per-minute rating
          of a player&apos;s performance.&quot;
        </Typography>
      </Grid>
      <Grid xs justifyContent="flex-end" container item>
        <Button>How do I read this table?</Button>
      </Grid>
      <PlayerGrid
        columns={OVERALL_PLAYERS_COLUMNS}
        defaultSortField={OVERALL_PLAYERS_DEFAULT_SORTS.field}
        defaultSortType={OVERALL_PLAYERS_DEFAULT_SORTS.type}
      />
    </Grid>
  );
}

export default {};
