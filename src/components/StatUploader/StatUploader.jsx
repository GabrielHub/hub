import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@mui/material';
import { generateRandomKey } from 'utils';
import { StatCard } from './StatCard';
import { TeamCard } from './TeamCard';

export function StatUploader(props) {
  const { possiblePlayers, teamData } = props;

  // * Editable list of players, this will be the list that gets uploaded
  const [playerList, setPlayerList] = useState(possiblePlayers);

  // * Editable list of team data
  const [firstTeamData, setFirstTeamData] = useState(teamData[Object.keys(teamData)[0]]);
  const [secondTeamData, setSecondTeamData] = useState(teamData[Object.keys(teamData)[1]]);

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
    // const formatPlayerStats =
  };

  return (
    <Grid xs={12} container item>
      <Grid xs={12} item>
        <Typography variant="h5" gutterBottom>
          <b>TEAM STATS</b>
        </Typography>
      </Grid>
      <TeamCard teamData={firstTeamData} teamKey={1} onChange={updateTeamData} />
      <TeamCard teamData={secondTeamData} teamKey={2} onChange={updateTeamData} />
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
