import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function StatCard(props) {
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

StatCard.propTypes = {
  player: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    grade: PropTypes.string,
    team: PropTypes.number,
    pos: PropTypes.number,
    pts: PropTypes.string,
    treb: PropTypes.string,
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
