export const FIREBASE_BASE_URL = process.env.REACT_APP_FIREBASE_BASE_URL;
export const FIREBASE_API_KEY = process.env.REACT_APP_API_KEY;
export const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
export const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
export const ALGOLIA_KEY = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;
export const ALGOLIA_PROJECT_ID = process.env.REACT_APP_ALGOLIA_PROJECT_ID;

export const TEAM_STAT_READABLE = {
  team: 'TEAM',
  grd: 'GRADE',
  pts: 'PTS',
  reb: 'REB',
  ast: 'AST',
  stl: 'STL',
  blk: 'BLK',
  pf: 'FOULS',
  tov: 'TO',
  fgm: 'FGM',
  fga: 'FGA',
  threepa: '3PA',
  threepm: '3PM'
};

export const PLAYER_STAT_READABLE = {
  name: 'NAME',
  grd: 'GRADE',
  team: 'TEAM #',
  pos: 'POS',
  pts: 'PTS',
  treb: 'REB',
  ast: 'AST',
  stl: 'STL',
  blk: 'BLK',
  pf: 'FOULS',
  tov: 'TO',
  fgm: 'FGM',
  fga: 'FGA',
  threepm: '3PM',
  threepa: '3PA'
};

export default {};
