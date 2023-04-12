export const RECENT_PLAYERS_COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    sortable: false
  },
  {
    field: 'gp',
    headerName: 'GP',
    type: 'number',
    description: 'Total games played',
    flex: 1,
    sortable: false
  },
  {
    field: 'pts',
    headerName: 'PTS',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'treb',
    headerName: 'REB',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'ast',
    headerName: 'AST',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'stl',
    headerName: 'STL',
    type: 'number',
    flex: 1
  },
  {
    field: 'blk',
    headerName: 'BLK',
    type: 'number',
    flex: 1
  },
  {
    field: 'pf',
    headerName: 'FOUL',
    type: 'number',
    flex: 1
  },
  {
    field: 'tov',
    headerName: 'TO',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'usageRate',
    headerName: 'USG%',
    type: 'number',
    description:
      'Usage percentage is an estimate of the percentage of team plays used by a player while they were on the floor',
    flex: 1,
    sortable: false
  },
  {
    field: 'ortg',
    headerName: 'ORtg',
    type: 'number',
    description:
      'Offensive Rating is the points produced per 100 possessions or how many points is a player likely to generate when they try',
    flex: 1,
    sortable: false
  },
  {
    field: 'drtg',
    headerName: 'DRtg',
    type: 'number',
    description:
      'Defensive Rating is how many points a player allows on average over the course of 100 team possessions',
    flex: 1
  },
  {
    field: 'tovPerc',
    headerName: 'TOV%',
    type: 'number',
    description: 'Turnover percentage is an estimate of turnovers per 100 plays',
    flex: 1,
    sortable: false
  },
  {
    field: 'astPerc',
    headerName: 'AST%',
    type: 'number',
    description:
      'Assist percentage is an estimate of the percentage of teammate field goals a player assisted while he was on the floor',
    flex: 1,
    sortable: false
  },
  {
    field: 'astToRatio',
    headerName: 'AST/TO',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'fgPerc',
    headerName: 'FG%',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'threePerc',
    headerName: '3P%',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'efgPerc',
    headerName: 'EFG%',
    description: 'FG% adjusted for 3 Pointers',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'tsPerc',
    headerName: 'TS%',
    type: 'number',
    description:
      'A measure of shooting efficiency that takes into account field goals, 3-point field goals, and free throws',
    flex: 1,
    sortable: false
  },
  {
    field: 'threepAR',
    headerName: '3PaR',
    type: 'number',
    description: 'Percentage of shots taken from 3',
    flex: 1,
    sortable: false
  },
  {
    field: 'gameScore',
    headerName: 'GmScr',
    type: 'number',
    description:
      'Game Score is a rough measure of a player`s productivity for a single game, per game',
    flex: 1,
    sortable: false
  }
];

export const RECENT_PLAYERS_DEFAULT_SORTS = {
  field: '_updatedAt',
  type: 'desc'
};

export default {};
