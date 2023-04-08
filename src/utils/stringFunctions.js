/**
 * @description Given a large sample of text, try and find all possible players and assign estimated stats (will likely be inaccurate due to OCR inconsistency)
 * @param {string[]} input array of strings (words from large text)
 * @returns object of possible player names and the stats that follow them
 */
export const parsePossiblePlayerData = (input) => {
  const result = {};

  // * hardcode remove some common matching mistakes
  const commonErrors = ['3PM/3PA', 'FGM/FGA', 'MATCHUP'];

  // * Assume that player names will likely be longer than 5 letters
  input.forEach((word, index) => {
    if (word.length > 5 && !commonErrors.includes(word)) {
      // * get the next 10 words (stats) after finding a possible name
      const [grade, pts, treb, ast, stl, blk, pf, tov, fg, threep] = input.slice(
        index + 1,
        index + 11
      );

      const [fgm = 0, fga = 0] = fg.split('/');
      const [threepm = 0, threepa = 0] = threep.split('/');

      // * We'll automatically calculate % and FTM/FTA and advanced stats based on the following inputs
      result[word] = {
        name: word,
        grade,
        team: 1,
        // TODO Map 1 - 5 to readable PG - C
        pos: 1, // * POS Defined by 1 - 5
        pts,
        treb,
        ast,
        stl,
        blk,
        pf,
        tov,
        fgm,
        fga,
        threepm,
        threepa
      };
    }
  });

  return result;
};

/**
 * @description Find every instance of TOTAL (every team stat) and return team data
 * @param {string[]} input Array of strings
 * @returns
 */
export const parseTeamTotalData = (input) => {
  const result = {};
  const keyword = 'TOTAL';

  // * Assume that player names will likely be longer than 5 letters
  input.forEach((word, index) => {
    if (word === keyword) {
      // * get the next 10 words (stats) after finding a possible name
      const [grd, pts, reb, ast, stl, blk, pf, tov, fg, threep] = input.slice(
        index + 1,
        index + 11
      );

      const [fgm = 0, fga = 0] = fg.split('/');
      const [threepm = 0, threepa = 0] = threep.split('/');

      // * We'll automatically calculate % and FTM/FTA and advanced stats based on the following inputs
      result[word] = {
        team: Object.keys(result).length + 1,
        grd,
        pts,
        reb,
        ast,
        stl,
        blk,
        pf,
        tov,
        fgm,
        fga,
        threepm,
        threepa
      };
    }
  });

  // * Handle errors (if OCR couldn't read any totals)
  const totalTeams = Object.keys(result).length;
  if (!totalTeams) {
    result[1] = {
      team: 1,
      grd: 0,
      pts: 0,
      reb: 0,
      ast: 0,
      stl: 0,
      blk: 0,
      pf: 0,
      tov: 0,
      fgm: 0,
      fga: 0,
      threepm: 0,
      threepa: 0
    };
  }
  if (totalTeams < 2) {
    result[2] = {
      team: 2,
      grd: 0,
      pts: 0,
      reb: 0,
      ast: 0,
      stl: 0,
      blk: 0,
      pf: 0,
      tov: 0,
      fgm: 0,
      fga: 0,
      threepm: 0,
      threepa: 0
    };
  }

  return result;
};

/**
 * @description removes special characters except / and space (for use in OCR result for easier processing)
 * @param {string} str string input
 * @returns formatted text
 */
export const removeSpecialCharacters = (str) => {
  return str.replace(/[^0-9a-zA-Z/ ]+/g, '');
};

export default {};
