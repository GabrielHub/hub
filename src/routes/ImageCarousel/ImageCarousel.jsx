import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { fetchSpells } from 'rest/fetchSpells';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 30
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30 // * Peeks into previous or next image/card
  }
};

export function ImageCarousel() {
  const [spells, setSpells] = useState([]);
  const [spellIndex, setSpellIndex] = useState(0);
  const [errorText, setErrorText] = useState(null);

  // eslint-disable-next-line no-console
  console.log('SPELLS', spells);

  const getSpells = useCallback(async () => {
    const { data, error } = await fetchSpells(spellIndex);
    if (error) {
      setErrorText(JSON.stringify(error));
      // eslint-disable-next-line no-console
      console.log('ERROR', error);
    } else {
      setErrorText(null);
      setSpells(data?.spells);
    }
  }, [spellIndex]);

  useEffect(() => {
    if (!spells.length) {
      getSpells();
    }
  }, []);

  return (
    <Box m={2}>
      <Typography variant="h6" gutterBottom>
        A Carousel of Spells
      </Typography>
      {errorText && <Typography variant="h4">Error fetching spells!</Typography>}
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={false}
        infinite
        centerMode>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>
    </Box>
  );
}

export default {};
