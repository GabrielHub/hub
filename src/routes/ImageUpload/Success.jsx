import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Button } from '@mui/material';

export function Success() {
  const navigate = useNavigate();
  return (
    <Grid sx={{ padding: 16 }} justifyContent="center" container>
      <Grid xs={12} sx={{ padding: 4 }} item>
        <Typography variant="h4" color="success" gutterBottom>
          <b>Successfully uploaded image!</b>
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography color="success" gutterBottom>
          Stats will be updated when an admin verifies your upload
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <Button onClick={() => navigate('/hub/imageUpload')}>Upload another image</Button>
      </Grid>
    </Grid>
  );
}

export default {};
