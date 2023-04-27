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
---

## How to deploy

`npm run deploy`, pushes to gh-pages branch and deploys to github pages

in the firebase/functions folder run `firebase deploy --only functions`

## To test functions (WITHOUT SETTING UP EMULATOR THIS TESTS IN PROD):
`firebase functions:shell`
Example: `app.get('/popularity')`