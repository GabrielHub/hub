import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { ALGOLIA_KEY, ALGOLIA_PROJECT_ID } from 'constants';
import { Grid, Button } from '@mui/material';

const searchClient = algoliasearch(ALGOLIA_PROJECT_ID, ALGOLIA_KEY);

function Hit({ hit }) {
  const navigate = useNavigate();
  const { objectID, name } = hit;

  const handleNavigation = () => {
    navigate(`/hub/players/${objectID}`);
  };

  return (
    <Grid xs item>
      <Button variant="link" onClick={handleNavigation}>
        {name}
      </Button>
    </Grid>
  );
}

export function AlgoliaSearch() {
  return (
    <InstantSearch searchClient={searchClient} indexName="players" routing>
      <Grid container>
        <Grid xs={12} item>
          <SearchBox />
        </Grid>
        <Grid xs={12} container item>
          <Hits hitComponent={Hit} />
        </Grid>
      </Grid>
    </InstantSearch>
  );
}

Hit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  hit: PropTypes.any.isRequired
};

export default {};
