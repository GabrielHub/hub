import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { fetchTableData } from 'rest';

const LIMIT = 10;

export function PlayerGrid(props) {
  const { columns, defaultSortField, defaultSortType } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortModel, setSortModel] = useState([
    {
      field: defaultSortField,
      sort: defaultSortType
    }
  ]);

  const getTableRows = useCallback(async () => {
    setLoading(true);
    const queryParams = {
      sortField: sortModel[0]?.field || defaultSortField,
      sortType: sortModel[0]?.sort || defaultSortType,
      limit: LIMIT
    };
    const { data, error } = await fetchTableData(queryParams);
    if (error) {
      setLoading(false);
      enqueueSnackbar('Error reading data, please try again', { variant: 'error' });
    } else {
      setRows(data);
      setLoading(false);
    }
  }, [defaultSortField, defaultSortType, enqueueSnackbar, sortModel]);

  useEffect(() => {
    getTableRows();
  }, [getTableRows]);

  return (
    <Grid xs={12} item>
      <DataGrid
        rows={rows}
        columns={columns}
        sortingMode="server"
        paginationMode="server"
        rowCount={LIMIT}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        loading={loading}
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
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.func])
    )
  ).isRequired
};

export default {};
