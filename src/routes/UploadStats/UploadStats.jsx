import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import Tesseract from 'tesseract.js';
import { parsePossiblePlayerData, parseTeamTotalData, removeSpecialCharacters } from 'utils';
import { StatUploader } from 'components/StatUploader';
import { Loading } from 'components/Loading';

export function UploadStats() {
  const [possiblePlayerStats, setPossiblePlayerStats] = useState({});
  const [teamData, setTeamData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hideRules, setHideRules] = useState(false);
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
      setIsLoading(false);
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
      setIsLoading(true);
      convertImageToText();
    }
  }, [convertImageToText, imageData, possiblePlayerStats]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <Grid container>
        <Grid xs={12} item>
          <Typography align="center" variant="h4">
            Upload a screenshot of a Rec/Pro-Am Game to add stats
          </Typography>
        </Grid>
        {!hideRules && (
          <Grid xs={12} justifyContent="center" container item>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                *Stats are uploaded on an honor system, please do not upload broken or imaginary
                data
              </Typography>
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                Try not to have multiple players of the same name
              </Typography>
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                Players on a team must have a unique position (1 - 5) and their opponent should have
                a matching position
              </Typography>
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                ex. Player&apos;s name is AI Player, make their name AI Player or Al Player
              </Typography>
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                ex. Player&apos;s name is [][][][], make their name Boxes
              </Typography>
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                ex. Player&apos;s name is [][]Lebron[]James[], make their name Lebron James
              </Typography>
            </Grid>
          </Grid>
        )}

        <Grid xs={12} justifyContent="center" container item>
          <Grid xs={3} justifyContent="center" container item sx={{ margin: 1 }}>
            <Button variant="contained" onClick={() => setHideRules(!hideRules)}>
              Show/Hide Upload Rules
            </Button>
          </Grid>
          {!imageData && (
            <Grid xs={3} justifyContent="center" container item sx={{ margin: 1 }}>
              <Button variant="contained" component="label">
                Upload Image{' '}
                <input hidden accept="image/*" type="file" onClick={handleImageChange} />
              </Button>
            </Grid>
          )}

          {Boolean(imageData) && (
            <Grid xs={3} justifyContent="center" container item sx={{ margin: 1 }}>
              <Button variant="contained" component="label" color="error" onClick={handleReset}>
                RESET
              </Button>
            </Grid>
          )}
        </Grid>

        {Boolean(imageData) && (
          <Grid xs={12} sx={{ marginBottom: 4 }} container item>
            <img
              style={{ width: '50vw', margin: 'auto', borderRadius: 15 }}
              src={imageData}
              alt="uploaded"
            />
            {Boolean(progress) && <Typography>Recognizing Image: {progress}%</Typography>}
            {Boolean(confidence) && (
              <Typography gutterBottom>
                <b>Confidence:</b> {confidence}%
              </Typography>
            )}
          </Grid>
        )}
        {Boolean(Object.keys(possiblePlayerStats).length) && (
          <StatUploader
            possiblePlayers={possiblePlayerStats}
            teamData={teamData}
            handleReset={handleReset}
          />
        )}
      </Grid>
    </>
  );
}

export default {};
