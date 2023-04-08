import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import Tesseract from 'tesseract.js';
import { parsePossiblePlayerData, removeSpecialCharacters } from 'utils';
import { StatUploader } from 'components/StatUploader';

export function UploadStats() {
  const [possiblePlayerStats, setPossiblePlayerStats] = useState({});
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
      setPossiblePlayerStats(parsePossiblePlayerData(removeSpecialCharacters(text)));
    });
  }, [imageData]);

  const handleImageChange = (e) => {
    setImageData(URL.createObjectURL(e.target.files[0]));
  };

  const handleReset = () => {
    setImageData(null);
    setConfidence(null);
    setProgress(0);
    setPossiblePlayerStats({});
  };

  useEffect(() => {
    // * Prevent from constantly reanalyzing
    if (imageData && !Object.keys(possiblePlayerStats).length) {
      convertImageToText();
    }
  }, [convertImageToText, imageData, possiblePlayerStats]);

  return (
    <Grid sx={{ padding: 1 }} container>
      <Grid xs={12} item>
        <Typography variant="h4" gutterBottom>
          Upload an screenshot of a Rec/Pro-Am game
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <Button variant="contained" component="label">
          Upload Image <input hidden accept="image/*" type="file" onClick={handleImageChange} />
        </Button>
        {Boolean(imageData) && (
          <Button variant="contained" component="label" color="error" onClick={handleReset}>
            RESET
          </Button>
        )}
      </Grid>
      {Boolean(imageData) && (
        <Grid item>
          <img style={{ width: 800 }} src={imageData} alt="uploaded" />
          <Typography>Recognizing Image: {progress}</Typography>
          <Typography gutterBottom>
            <b>Confidence:</b> {confidence} | If confidence is below 80% you will likely have to
            update the data below
          </Typography>
        </Grid>
      )}
      {Boolean(Object.keys(possiblePlayerStats).length) && (
        <StatUploader possiblePlayers={possiblePlayerStats} />
      )}
    </Grid>
  );
}

export default {};
