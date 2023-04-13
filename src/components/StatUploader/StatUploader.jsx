import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useSnackbar } from 'notistack';
import { generateRandomKey } from 'utils';
import { uploadRawStats } from 'rest';
import { Loading } from 'components/Loading';
import { StatCard } from './StatCard';
import { TeamCard } from './TeamCard';
import { handleUploadValidation } from './utils';

export function StatUploader(props) {
  const { possiblePlayers, teamData, handleReset, uploadKey } = props;
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

  // * Errors from validation will have header and description (explain rules of data sanitation)
  const [errors, setErrors] = useState([]);

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
    setErrors([]);
    const rawPlayerData = Object.keys(playerList).map((playerKey) => playerList[playerKey]);
    const rawTeamData = {
      [firstTeamData.team]: firstTeamData,
      [secondTeamData.team]: secondTeamData
    };

    const validation = handleUploadValidation(rawPlayerData, rawTeamData);
    // * If we have errors stop everything and display rules and errors
    if (!_.isEmpty(validation)) {
      setErrors(validation);
      setValidatedPlayers([]);
      setValidatedTeams([]);
      setIsLoading(false);
      return;
    }

    const { data, error } = await uploadRawStats(rawPlayerData, rawTeamData, uploadKey);
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
    <Grid xs={12} justifyContent="center" alignItems="center" container item>
      <Loading isLoading={isLoading} />

      <Grid xs={12} justifyContent="center" alignItems="center" container item>
        <Typography variant="h5" align="center" gutterBottom>
          <b>TEAM STATS</b>
        </Typography>
        {Boolean(validatedTeams.length) &&
          validatedTeams.map((teamKey) => <DoneIcon key={teamKey} color="success" size="small" />)}
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
      <Grid xs={12} justifyContent="center" alignItems="center" container item>
        <Grid xs={12} justifyContent="center" alignItems="center" container item>
          <Typography variant="h5" style={{ display: 'flex', alignItems: 'center' }}>
            <b>PLAYER STATS</b>{' '}
            <Button color="primary" variant="contained" onClick={addPlayer} sx={{ margin: 1 }}>
              Add Extra Player
            </Button>
          </Typography>
        </Grid>
        <Grid xs={12} justifyContent="center" alignItems="center" container item>
          <Typography align="center" variant="caption" sx={{ color: 'grey' }} gutterBottom>
            You do not need to add the players with the done button. The button is just there to
            make it easier to update stats by hiding players.
          </Typography>
        </Grid>
        {Boolean(errors.length) &&
          errors.map(({ error, description }, index) => (
            <Grid key={error} xs={4} item>
              <Typography align="center" color="error" variant="body1" gutterBottom>
                {index + 1}. <b>{error}:</b> {description}
              </Typography>
            </Grid>
          ))}
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
            <Grid key={player} alignItems="center" container xs item>
              <Typography sx={{ padding: 1 }}>
                {playerList[player].name}{' '}
                <DoneIcon sx={{ padding: 1 }} color="success" size="small" />
              </Typography>
            </Grid>
          );
        })}
      <Grid xs={12} justifyContent="center" container item>
        <Button
          color="primary"
          variant="contained"
          onClick={handleStatUpload}
          disabled={Object.keys(playerList).length !== 10}>
          UPLOAD STATS
        </Button>
      </Grid>
    </Grid>
  );
}

StatUploader.propTypes = {
  possiblePlayers: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
  teamData: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
  handleReset: PropTypes.func.isRequired,
  uploadKey: PropTypes.string
};

StatUploader.defaultProps = {
  uploadKey: ''
};

export default {};
