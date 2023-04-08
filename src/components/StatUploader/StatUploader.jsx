import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@mui/material';
import { StatCard } from './StatCard';
import { TeamCard } from './TeamCard';

export function StatUploader(props) {
  const { possiblePlayers, teamData } = props;

  // * Editable list of players, this will be the list that gets uploaded
  const [playerList, setPlayerList] = useState(possiblePlayers);

  // * Editable list of team data
  const [firstTeamData, setFirstTeamData] = useState(teamData[Object.keys(teamData)[0]]);
  const [secondTeamData, setSecondTeamData] = useState(teamData[Object.keys(teamData)[0]]);

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
    } else {
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

  // * Calculate and parse full player values and upload

  return (
    <Grid xs={12} container item>
      <Grid xs={12} item>
        <Typography variant="h5" gutterBottom>
          <b>TEAM STATS</b>
        </Typography>
      </Grid>
      <TeamCard
        teamData={teamData[Object.keys(teamData)[0]]}
        teamKey={Object.keys(teamData)[0]}
        onChange={updateTeamData}
      />
      <TeamCard
        teamData={teamData[Object.keys(teamData)[1]]}
        teamKey={Object.keys(teamData)[1]}
        onChange={updateTeamData}
      />
      <Grid xs={12} item>
        <Typography variant="h5" gutterBottom>
          <b>PLAYER STATS</b>
        </Typography>
      </Grid>
      {Boolean(Object.keys(playerList).length) &&
        Object.keys(playerList).map((player) => (
          <StatCard
            key={player}
            player={player}
            data={playerList[player]}
            onChange={updatePlayerValue}
            removePlayer={removePlayer}
          />
        ))}
      <Grid xs={12} item>
        <Button color="primary" variant="contained">
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
  ).isRequired
};

export default {};
