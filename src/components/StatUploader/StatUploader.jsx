import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function StatCard(props) {
  // * player is the key we use to edit data
  const { player, data, onChange, removePlayer } = props;

  // eslint-disable-next-line no-underscore-dangle
  const _onChange = (e) => {
    onChange(player, e.target.name, e.target.value);
  };

  return (
    <Grid sx={{ padding: 2 }} xs={12} container item>
      <Grid xs item>
        <IconButton aria-label="delete" onClick={() => removePlayer(player)}>
          <DeleteIcon color="error" size="small" />
        </IconButton>
      </Grid>
      {Object.keys(data).map((dataKey) => (
        <Grid key={dataKey} xs item>
          <TextField
            variant="outlined"
            name={dataKey}
            label={dataKey.toUpperCase()}
            value={data[dataKey]}
            onChange={_onChange}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export function StatUploader(props) {
  const { possiblePlayers } = props;

  // * Editable list of players, this will be the list that gets uploaded
  const [playerList, setPlayerList] = useState(possiblePlayers);

  const updatePlayerValue = (player, valueKey, value) => {
    setPlayerList({
      ...playerList,
      [player]: {
        ...playerList[player],
        [valueKey]: value
      }
    });
  };

  // * Note that player is not necessarily the name, it is the unique key we'll use to remove players here
  const removePlayer = (player) => {
    setPlayerList((current) => {
      const mutablePlayerList = { ...current };
      delete mutablePlayerList[player];
      return mutablePlayerList;
    });
  };

  return (
    <Grid xs={12} container item>
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
    </Grid>
  );
}

StatUploader.propTypes = {
  possiblePlayers: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired
};

StatCard.propTypes = {
  player: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    grade: PropTypes.string,
    pos: PropTypes.number,
    mp: PropTypes.number,
    pts: PropTypes.string,
    treb: PropTypes.string,
    drb: PropTypes.string,
    orb: PropTypes.number,
    ast: PropTypes.string,
    stl: PropTypes.string,
    blk: PropTypes.string,
    pf: PropTypes.string,
    tov: PropTypes.string,
    fgm: PropTypes.string,
    fga: PropTypes.number,
    threepm: PropTypes.string,
    threepa: PropTypes.number
  }).isRequired
};

export default {};
