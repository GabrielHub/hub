import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useSnackbar } from 'notistack';
import { generateRandomKey } from 'utils';
import { uploadRawStats } from 'rest';
import { Loading } from 'components/Loading';
import { StatCard } from './StatCard';
import { TeamCard } from './TeamCard';

export function StatUploader(props) {
  const { possiblePlayers, teamData, handleReset } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  // * Editable list of players, this will be the list that gets uploaded
  const [playerList, setPlayerList] = useState(possiblePlayers);

  // * Editable list of team data
  const [firstTeamData, setFirstTeamData] = useState(teamData[Object.keys(teamData)[0]]);
  const [secondTeamData, setSecondTeamData] = useState(teamData[Object.keys(teamData)[1]]);

  // * Manually confirm each set of stats, these keep track of what has been confirmed and hides confirmed stats
  const [validatedTeams, setValidatedTeams] = useState([]);
  const [validatedPlayers, setValidatedPlayers] = useState([]);

  const updateValidatedTeam = (teamKey) => {
    setValidatedTeams((current) => [...current, teamKey]);
  };

  const updateValidatedPlayer = (playerKey) => {
    setValidatedPlayers((current) => [...current, playerKey]);
  };

  const updatePlayerValue = (player, valueKey, value) => {
    setPlayerList({
      ...playerList,
      [player]: {
        ...playerList[player],
        [valueKey]: value
      }
    });
  };

  const updateTeamData = (teamKey, valueKey, value) => {
    if (teamKey === 1) {
      setFirstTeamData({
        ...firstTeamData,
        [valueKey]: value
      });
    } else if (teamKey === 2) {
      setSecondTeamData({
        ...secondTeamData,
        [valueKey]: value
      });
    }
  };

  // * Note that player is not necessarily the name, it is the unique key we'll use to remove players here
  const removePlayer = (player) => {
    setPlayerList((current) => {
      const mutablePlayerList = { ...current };
      delete mutablePlayerList[player];
      return mutablePlayerList;
    });
  };

  const addPlayer = () => {
    setPlayerList({
      ...playerList,
      [generateRandomKey()]: {
        name: 'AI Player',
        grade: 'A',
        team: 1,
        pos: 1,
        pts: 0,
        treb: 0,
        ast: 0,
        stl: 0,
        blk: 0,
        pf: 0,
        tov: 0,
        fgm: 0,
        fga: 0,
        threepm: 0,
        threepa: 0
      }
    });
  };

  const handleStatUpload = async () => {
    setIsLoading(true);
    const rawPlayerData = Object.keys(playerList).map((playerKey) => playerList[playerKey]);
    const rawTeamData = {
      [firstTeamData.team]: firstTeamData,
      [secondTeamData.team]: secondTeamData
    };
    const { data, error } = await uploadRawStats(rawPlayerData, rawTeamData);
    // TODO better Error handling (it's very likely invalid data is inputted and incorrect values will return an error
    if (error || !data) {
      enqueueSnackbar('Error uploading data, please try again', { variant: 'error' });
      setIsLoading(false);
    } else {
      enqueueSnackbar('Successfully uploaded data', { variant: 'success' });
      setIsLoading(false);
      handleReset();
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Grid xs={12} container item>
        <Grid xs={12} item>
          <Typography variant="h5" gutterBottom>
            <b>TEAM STATS</b>
          </Typography>
          {Boolean(validatedTeams.length) &&
            validatedTeams.map((teamKey) => (
              <DoneIcon key={teamKey} color="success" size="small" />
            ))}
        </Grid>
        {!validatedTeams.includes(1) && (
          <TeamCard
            teamData={firstTeamData}
            teamKey={1}
            onChange={updateTeamData}
            updateValidatedTeam={updateValidatedTeam}
          />
        )}
        {!validatedTeams.includes(2) && (
          <TeamCard
            teamData={secondTeamData}
            teamKey={2}
            onChange={updateTeamData}
            updateValidatedTeam={updateValidatedTeam}
          />
        )}
        <Grid xs={12} alignItems="center" container item>
          <Grid xs={2} item>
            <Typography variant="h5">
              <b>PLAYER STATS</b>
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Button color="primary" variant="contained" onClick={addPlayer}>
              ADD
            </Button>
          </Grid>
        </Grid>
        {Boolean(Object.keys(playerList).length) &&
          Object.keys(playerList).map((player) => {
            if (!validatedPlayers.includes(player)) {
              return (
                <StatCard
                  key={player}
                  player={player}
                  data={playerList[player]}
                  onChange={updatePlayerValue}
                  removePlayer={removePlayer}
                  updateValidatedPlayer={updateValidatedPlayer}
                />
              );
            }
            return (
              <Grid key={player} xs item>
                <Typography sx={{ padding: 1 }}>
                  {playerList[player].name}{' '}
                  <DoneIcon sx={{ padding: 1 }} color="success" size="small" />
                </Typography>
              </Grid>
            );
          })}
        <Grid xs={12} item>
          <Button
            color="primary"
            variant="contained"
            onClick={handleStatUpload}
            // TODO Improve error handling here? If stats seem unrealistic or have too many characters...
            disabled={Object.keys(playerList).length !== 10}>
            UPLOAD STATS
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

StatUploader.propTypes = {
  possiblePlayers: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
  teamData: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
  handleReset: PropTypes.func.isRequired
};

export default {};
