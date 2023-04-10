import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import Tesseract from 'tesseract.js';
import { parsePossiblePlayerData, parseTeamTotalData, removeSpecialCharacters } from 'utils';
import { StatUploader } from 'components/StatUploader';

export function UploadStats() {
  const [possiblePlayerStats, setPossiblePlayerStats] = useState({});
  const [teamData, setTeamData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [progress, setProgress] = useState(0);

  const convertImageToText = useCallback(async () => {
    Tesseract.recognize(imageData, 'eng', {
      logger: (m) => {
        setProgress(Math.floor(m.progress * 100));
      }
    }).then(({ data: { text, confidence: confidenceResult } }) => {
      setProgress(0);
      setConfidence(confidenceResult);

      const input = removeSpecialCharacters(text).split(' ');
      // * Find the two teams stats (needed for advanced metrics)
      setTeamData(parseTeamTotalData(input));
      // * Find all possible players
      setPossiblePlayerStats(parsePossiblePlayerData(input));
    });
  }, [imageData]);

  const handleImageChange = (e) => {
    if (e.target.files?.length) {
      setImageData(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleReset = () => {
    setImageData(null);
    setConfidence(null);
    setProgress(0);
    setPossiblePlayerStats({});
    setTeamData(null);
  };

  useEffect(() => {
    // * Prevent from constantly reanalyzing
    if (imageData && !Object.keys(possiblePlayerStats).length) {
      convertImageToText();
    }
  }, [convertImageToText, imageData, possiblePlayerStats]);

  return (
    <Grid sx={{ padding: 1 }} container>
      <Grid xs={8} item>
        <Typography variant="h4" gutterBottom>
          Upload a screenshot of a Rec/Pro-Am game
        </Typography>
      </Grid>
      <Grid xs={2} item>
        <Button variant="contained" component="label">
          Upload Image <input hidden accept="image/*" type="file" onClick={handleImageChange} />
        </Button>
      </Grid>
      {Boolean(imageData) && (
        <Grid xs={2} item>
          <Button variant="contained" component="label" color="error" onClick={handleReset}>
            RESET
          </Button>
        </Grid>
      )}
      {Boolean(imageData) && (
        <Grid container item>
          <img style={{ width: '50vw', margin: 'auto' }} src={imageData} alt="uploaded" />
          {Boolean(progress) && <Typography>Recognizing Image: {progress}%</Typography>}
          {Boolean(confidence) && (
            <Typography gutterBottom>
              <b>Confidence:</b> {confidence}%
            </Typography>
          )}
        </Grid>
      )}
      {Boolean(Object.keys(possiblePlayerStats).length) && (
        <StatUploader possiblePlayers={possiblePlayerStats} teamData={teamData} />
      )}
    </Grid>
  );
}

export default {};
