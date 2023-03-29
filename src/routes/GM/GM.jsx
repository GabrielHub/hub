import React, { useState, useEffect, useCallback } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { lookupGM } from 'rest';

export function GM() {
  const [username, setUsername] = useState('');
  const [selectedGMData, setSelectedGMData] = useState(null);
  const [errorLabel, setErrorLabel] = useState('');

  const handleLookupGM = async () => {
    setSelectedGMData(null);
    const { data, error } = await lookupGM(username);
    if (error) {
      setErrorLabel('Could not find this GM!');
    } else {
      setErrorLabel('');
      setSelectedGMData(data);
    }
  };

  return (
    <Grid
      sx={{ margin: 'auto', padding: 6, maxWidth: 800 }}
      justifyContent="center"
      alignItems="center"
      container>
      <Grid xs={4} item>
        <Typography variant="h6">Lookup a GM:</Typography>
      </Grid>
      <Grid xs={4} item>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText={errorLabel}
          error={Boolean(errorLabel)}
          fullWidth
        />
      </Grid>
      <Grid xs={4} item>
        <Button sx={{ padding: 1, margin: 1 }} variant="outlined" onClick={handleLookupGM}>
          Search
        </Button>
      </Grid>
      {selectedGMData && (
        <Grid xs={12} item>
          <Grid xs item>
            <Typography>{selectedGMData?.name}</Typography>
          </Grid>
          <Grid xs item>
            <Typography>Reviews: {selectedGMData?.reviews}</Typography>
          </Grid>
          <Grid xs item>
            <Typography>Popularity: {selectedGMData?.requests}</Typography>
          </Grid>
        </Grid>
      )}
      <Grid sx={{ paddingTop: 6 }} xs={12} item>
        <Typography>List of GMs (sorted!)</Typography>
      </Grid>
    </Grid>
  );
}

export default {};
