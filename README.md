# GabrielHub

A collection of projects/ideas/tests | wip

*This is a Github Pages site, which does not support routers that use the HTML5 history API*

*In other words, you will not be able to directly go to routes and cannot refresh the page*

- [x] A reference site for NBA2k data extrapolated as NBA stats
- [ ] Basketball simulator project
- [ ] Puzzlebox project
- [ ] Design and photography portfolio
- [ ] Convert PriCoSha site to forum

Check it out at [here](https://gabrielhub.github.io/hub)!

---
## 2K Analytics Hub

A comprehensive glossary and analytics hub for 2K data, built with Firebase, Express, React, and Node.

How does it work?
> Upload an image of game data => Process image and store data => Update player based on games uploaded => Generate advanced stats

What can you do with it?
1. Generate and view advanced data using NBA analytics (equations from basketball reference)
2. Compare and rank players by statistic
3. WIP - Compare to NBA players (using PER)
4. WIP - Direct comparisons to other players with advanced analysis

### TODOS:

> Add NBA Comparison Analytics Tool
- Add a new tab to the analytics page to allow selecting a player (algolia) and finding the 3 most similar nba players
> Add Player Comparison Tool
- Maybe link from player page? Or another tab on the analytics page
- Add advanced analytics API
    - returns who is a better shooter and why
    - returns who is a better defender and why
> Career Highs (league + player)
- Add `career` subcollection to `players`
- League average scheduled function should also calculate league highs in stats based on player `career` subcollection
> Refactor for new seasons (years)
- When resetting games (resetting for a new 2K or for other reasons)
    - Refactor PER to use PER estimation equation instead of league averages for when we don't have league averages
    - createdAt and updatedAt should be done through triggers so we can date `players` and `games`
- Separate games by position and add averages per position
> These will allow for recalculating stats if equations change
- Store game totals in a new collection
- Store references for `games` documents
    - reference game totals
    - reference opponent data
> Improve maintainability
- Add consistent error handling for API calls on the frontend
- Add Express error handling for REST APIs on the backend
- Add Unit Tests on the backend (especially for calculation functions)

---

## How to deploy

`npm run deploy`, pushes to gh-pages branch and deploys to github pages

in the firebase/functions folder run `firebase deploy --only functions`

## To test functions (WITHOUT SETTING UP EMULATOR THIS TESTS IN PROD):
`firebase functions:shell`
Example: `app.get('/popularity')`