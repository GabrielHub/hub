import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import { TEAM_STAT_READABLE } from 'constants';

export function TeamCard(props) {
  const { teamData, teamKey, onChange } = props;

  // eslint-disable-next-line no-underscore-dangle
  const _onChange = (e) => {
    onChange(teamKey, e.target.name, e.target.value);
  };

  return (
    <Grid sx={{ padding: 2 }} xs={12} container item>
      {Object.keys(teamData).map((dataKey) => (
        <Grid key={dataKey} xs item>
          <TextField
            variant="outlined"
            name={dataKey}
            label={TEAM_STAT_READABLE[dataKey]}
            value={teamData[dataKey]}
            onChange={_onChange}
          />
        </Grid>
      ))}
    </Grid>
  );
}

TeamCard.propTypes = {
  teamKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  teamData: PropTypes.shape({
    team: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    grd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    reb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
