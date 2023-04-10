import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { PLAYER_STAT_READABLE } from 'constants';

export function StatCard(props) {
  // * player is the key we use to edit data
  const { player, data, onChange, removePlayer, updateValidatedPlayer } = props;

  // eslint-disable-next-line no-underscore-dangle
  const _onChange = (e) => {
    onChange(player, e.target.name, e.target.value);
  };

  return (
    <Grid sx={{ padding: 2 }} xs={12} container item>
      <Grid xs item>
        <IconButton aria-label="done" onClick={() => updateValidatedPlayer(player)}>
          <DoneIcon color="success" size="small" />
        </IconButton>
      </Grid>
      {Object.keys(data).map((dataKey) => (
        <Grid key={dataKey} xs item>
          <TextField
            variant="outlined"
            name={dataKey}
            label={PLAYER_STAT_READABLE[dataKey]}
            value={data[dataKey]}
            onChange={_onChange}
          />
        </Grid>
      ))}
      <Grid xs item>
        <IconButton aria-label="delete" onClick={() => removePlayer(player)}>
          <DeleteIcon color="error" size="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

StatCard.propTypes = {
  player: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  updateValidatedPlayer: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    grd: PropTypes.string,
    team: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pos: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    treb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ast: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    blk: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pf: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tov: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fgm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fga: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    threepm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    threepa: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired
};

export default {};
