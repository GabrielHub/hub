import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Grid, Typography } from '@mui/material';
import { fetchPlayerData } from 'rest';
import { Loading } from 'components/Loading';

// TODO Player Comparison Table
// TODO Career Highs
// TODO Last 5 games played

export function PlayerData() {
  const { playerID } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPlayerData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = fetchPlayerData(playerID);
    if (error) {
      enqueueSnackbar('Error reading data, please try a different user', { variant: 'error' });
    } else {
      setPlayerData(data);
    }
    setIsLoading(false);
  }, [enqueueSnackbar, playerID]);

  useEffect(() => {
    if (playerID) {
      getPlayerData();
    }
  }, [getPlayerData, playerID]);

  return (
    <>
      <Loading isLoading={isLoading} />
      {playerData && (
        <Grid sx={{ padding: 1 }} container>
          <Grid xs={12} item>
            <Typography variant="h5" gutterBottom>
              Player Lookup
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default {};
