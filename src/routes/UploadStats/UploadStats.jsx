import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import Tesseract from 'tesseract.js';

export function UploadStats() {
  const [ocr, setOCR] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [progress, setProgress] = useState(0);

  const convertImageToText = useCallback(async () => {
    Tesseract.recognize(imageData, 'eng', {
      logger: (m) => {
        setProgress(m.progress * 100);
      }
    }).then(({ data: { text, confidence: confidenceResult } }) => {
      setProgress(0);
      setConfidence(confidenceResult);
      setOCR(text);
    });
  }, [imageData]);

  const handleImageChange = (e) => {
    setImageData(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    // * Prevent from constantly reanalyzing
    if (imageData && !ocr) {
      convertImageToText();
    }
  }, [convertImageToText, imageData, ocr]);

  return (
    <Grid sx={{ padding: 1 }} container>
      <Grid item>
        <Button variant="contained" component="label">
          Upload Image <input hidden accept="image/*" type="file" onChange={handleImageChange} />
        </Button>
      </Grid>
      <Grid item>
        <img style={{ width: 800 }} src={imageData} alt="uploaded" />
        {Boolean(progress) && <Typography>Recognizing Image: {progress}</Typography>}
        <Typography gutterBottom>
          <b>Confidence:</b> {confidence}
        </Typography>
        <Typography>{ocr}</Typography>
      </Grid>
    </Grid>
  );
}

export default {};
