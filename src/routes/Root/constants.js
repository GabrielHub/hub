export const OFFENSIVE_PLAYERS_COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    sortable: false
    // editable: true
  },
  {
    field: 'usageRate',
    headerName: 'USG%',
    type: 'number',
    description:
      'Usage percentage is an estimate of the percentage of team plays used by a player while they were on the floor',
    flex: 1
  },
  {
    field: 'ortg',
    headerName: 'ORtg',
    type: 'number',
    description:
      'Offensive Rating is the points produced per 100 posessions or how many points is a player likely to generate when they try',
    flex: 1
  },
  {
    field: 'pts',
    headerName: 'PTS',
    type: 'number',
    flex: 1
  },
  {
    field: 'treb',
    headerName: 'REB',
    type: 'number',
    flex: 1
  },
  {
    field: 'ast',
    headerName: 'REB',
    type: 'number',
    flex: 1
  },
  {
    field: 'ftm',
    headerName: 'FT',
    type: 'number',
    flex: 1
  },
  {
    field: 'tov',
    headerName: 'TO',
    type: 'number',
    flex: 1
  },
  /*   {
      field: 'fgPerc',
      headerName: 'FG%',
      flex: 1
    },
    {
      field: 'threePerc',
      headerName: '3P%',
      flex: 1
    }, */
  {
    field: 'efgPerc',
    headerName: 'EFG%',
    description: 'FG% adjusted for 3 Pointers',
    type: 'number',
    flex: 1
  },
  {
    field: 'tsPerc',
    headerName: 'TS%',
    type: 'number',
    description:
      'A measure of shooting efficiency that takes into account field goals, 3-point field goals, and free throws',
    flex: 1
  },
  {
    field: 'threepAR',
    headerName: '3PaR',
    type: 'number',
    description: 'Percentage of shots taken from 3',
    flex: 1
  },
  {
    field: 'gameScore',
    headerName: 'GmScr',
    type: 'number',
    description:
      'Game Score is a rough measure of a player`s productivity for a single game, per game',
    flex: 1
  }
];

export const OFFENSIVE_PLAYERS_DEFAULT_SORTS = {
  field: 'ortg',
  type: 'desc'
};

export default {};
