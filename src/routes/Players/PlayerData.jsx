import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Grid, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { fetchPlayerData } from 'rest';
import { Loading } from 'components/Loading';
import { THEME_COLORS } from 'constants';
import { EditPlayerModal } from 'components/Modal';
import {
  PLAYER_AVERAGES_DEFENSE,
  PLAYER_AVERAGES_MISC,
  PLAYER_AVERAGES_OFFENSE
} from './constants';

// TODO Display offensive/defensive ranking next to name
// TODO Career Highs
// TODO Last 5 games played
// TODO Rankings for offense and defense
// * for ranking https://stackoverflow.com/questions/74087802/finding-index-of-a-firestore-document-for-a-given-query
// TODO Player Comparison Table

export function PlayerData() {
  const { playerID } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, setIsOpen] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const getPlayerData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchPlayerData(playerID);
    if (error) {
      enqueueSnackbar('Error reading data, please try a different user', { variant: 'error' });
    } else {
      // * Players should always have a name, alias and FTPerc
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
        <EditPlayerModal
          open={isOpen}
          handleClose={handleModalClose}
          ftPerc={playerData?.ftPerc}
          alias={playerData?.alias}
        />
      )}

      {playerData && (
        <Grid sx={{ padding: 1 }} justifyContent="center" container>
          <Grid xs={10} sx={{ marginBottom: 16 }} container item>
            <Grid
              sx={{
                borderRadius: 25,
                border: `4px solid ${THEME_COLORS.LIGHT}`,
                backgroundColor: THEME_COLORS.LIGHT,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs md={8} item>
                <Typography
                  align="center"
                  variant="h3"
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconButton onClick={() => setIsOpen(true)} size="large">
                    <EditIcon />
                  </IconButton>
                  {playerData.name}
                </Typography>
              </Grid>
              <Grid xs justifyContent="flex-end" alignItems="center" container item>
                <Grid xs md={3} item>
                  <Typography>
                    <b>GP:</b> {playerData.gp}
                  </Typography>
                </Grid>
                <Grid xs md={4} item>
                  <Typography>
                    <b>FT%:</b> {playerData.ftPerc}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid xs item>
                <Typography align="center" variant="body1">
                  <b>Aliases: </b>
                  {playerData.alias.toString()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} item />

          {/* TABLE FOR OFFENSIVE BASIC STATS */}
          <Grid xs={12} sm={6} md sx={{ margin: 4 }} container item>
            <Grid
              sx={{
                borderRadius: 10,
                backgroundColor: THEME_COLORS.LIGHT,
                border: '4px solid #59dcbb',
                color: THEME_COLORS.DARK,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Player Averages - Offense</b>
                </Typography>
              </Grid>
              {PLAYER_AVERAGES_OFFENSE.map((stat) => (
                <Grid xs={stat.size} key={stat.header} sx={{ padding: 2 }} item>
                  <Typography align="center" variant="h6">
                    <b>{stat.header}</b>
                  </Typography>
                  <Typography align="center" variant="h6">
                    <b>{playerData[stat.field]}</b>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* TABLE FOR DEFENSIVE BASIC STATS */}
          <Grid xs={12} sm={6} md sx={{ margin: 4 }} container item>
            <Grid
              sx={{
                borderRadius: 10,
                backgroundColor: THEME_COLORS.LIGHT,
                border: '4px solid #ff96c2',
                color: THEME_COLORS.DARK,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Player Averages - Offense</b>
                </Typography>
              </Grid>
              {PLAYER_AVERAGES_DEFENSE.map((stat) => (
                <Grid xs={stat.size} key={stat.header} sx={{ padding: 2 }} item>
                  <Typography align="center" variant="h6">
                    <b>{stat.header}</b>
                  </Typography>
                  <Typography align="center" variant="h6">
                    <b>{playerData[stat.field]}</b>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* TABLE FOR MISC BASIC STATS */}
          <Grid xs={12} md={12} sx={{ margin: 4 }} container item>
            <Grid
              sx={{
                borderRadius: 10,
                backgroundColor: THEME_COLORS.LIGHT,
                border: '4px solid #9293f0',
                color: THEME_COLORS.DARK,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Extra Stats</b>
                </Typography>
              </Grid>
              {PLAYER_AVERAGES_MISC.map((stat) => (
                <Grid xs={stat.size} key={stat.header} sx={{ padding: 2 }} item>
                  <Typography align="center" variant="h6">
                    <b>{stat.header}</b>
                  </Typography>
                  <Typography align="center" variant="h6">
                    <b>{playerData[stat.field]}</b>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default {};
