const uPER = (player, team, league) => {
  const factor = 2 / 3 - (0.5 * (league.ast / league.fgm)) / (2 * (league.fgm / league.ftm));
  const VOP = league.pts / (league.fga - league.oreb + league.tov + 0.44 * league.fta);
  const DRBPerc = (league.treb - league.oreb) / league.treb;

  const uPERCalculation =
    (1 / player.mp) *
    (player.threepm +
      (2 / 3) * player.ast +
      (2 - factor * (team.ast / team.fgm)) * player.fgm +
      player.ftm * 0.5 * (1 + (1 - team.ast / team.fgm) + (2 / 3) * (team.ast / team.fgm)) -
      VOP * player.tov -
      VOP * DRBPerc * (player.fga - player.fgm) -
      VOP * 0.44 * (0.44 + 0.56 * DRBPerc) * (player.fta - player.ftm) +
      VOP * (1 - DRBPerc) * (player.treb - player.oreb) +
      VOP * DRBPerc * player.oreb +
      VOP * player.stl +
      VOP * DRBPerc * player.blk -
      player.pf * (league.ftm / league.pf - 0.44 * (league.fta / league.pf) * VOP));

  return uPERCalculation;
};

// TODO Another function to calculate adjusted PER once we have enough data
// ? We need pace adjustment, pace for each player and league average pace

module.exports = { uPER };
