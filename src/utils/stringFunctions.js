/**
 * @description Given a large sample of text, try and find all possible players and assign estimated stats (will likely be inaccurate due to OCR inconsistency)
 * @param {string} input large amount of text
 * @returns object of possible player names and the stats that follow them
 */
export const parsePossiblePlayerData = (input) => {
  const lines = input.split(' ');
  const result = {};

  // * hardcode remove some common matching mistakes
  const commonErrors = ['3PM/3PA', 'FGM/FGA', 'MATCHUP'];

  // * Assume that player names will likely be longer than 5 letters
  lines.forEach((word, index) => {
    if (word.length > 5 && !commonErrors.includes(word)) {
      // * get the next 10 words (stats) after finding a possible name
      const [grade, pts, treb, ast, stl, blk, pf, tov, fgm, threepm] = lines.slice(
        index + 1,
        index + 11
      );

      // * We'll automatically calculate % and FTM/FTA and advanced stats based on the following inputs
      result[word] = {
        name: word,
        grade,
        // * POS Defined by 1 - 5
        // TODO Map 1 - 5 to readable PG - C
        pos: 1,
        mp: 20,
        pts,
        treb,
        drb: treb,
        orb: 0,
        ast,
        stl,
        blk,
        pf,
        tov,
        fgm,
        fga: 0,
        threepm,
        threepa: 0
      };
    }
  });

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
