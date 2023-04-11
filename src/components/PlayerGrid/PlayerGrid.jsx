import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { streamTopOffensivePlayers } from 'services';

export function PlayerGrid(props) {
  const { columns, defaultSortField, defaultSortType } = props;
  const [rows, setRows] = useState([]);
  const [sortModel, setSortModel] = useState([
    {
      field: defaultSortField,
      sort: defaultSortType
    }
  ]);

  useEffect(() => {
    const unsubscribe = () =>
      streamTopOffensivePlayers(
        sortModel[0]?.field || defaultSortField,
        sortModel[0]?.sort || defaultSortType,
        (querySnapshot) => {
          const updatedPlayers = [];
          querySnapshot.forEach((docSnapshot) => {
            updatedPlayers.push({ ...docSnapshot.data(), id: docSnapshot.id });
          });
          setRows(updatedPlayers);
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(error));
        }
      );
    return unsubscribe;
  }, [defaultSortField, defaultSortType, sortModel]);

  return (
    <Grid xs={12} item>
      <DataGrid
        rows={rows}
        columns={columns}
        sortingMode="server"
        paginationMode="server"
        rowCount={10}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        autoHeight
        autoPageSize
      />
    </Grid>
  );
}

PlayerGrid.propTypes = {
  defaultSortField: PropTypes.string.isRequired,
  defaultSortType: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ).isRequired
};

export default {};
