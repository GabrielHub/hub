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
    team: PropTypes.string,
    grd: PropTypes.string,
    pts: PropTypes.string,
    reb: PropTypes.string,
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
