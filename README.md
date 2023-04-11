# GabrielHub

A collection of projects/ideas/tests | wip
- A reference site for NBA2k data extrapolated as NBA stats
- To add: gamemaker projects, puzzlebox project, updating the priCoSha site as a forum etc.
Check it out at https://gabrielhub.github.io/hub !

## How to deploy

`npm run deploy`, pushes to gh-pages branch and deploys to github pages

in the firebase/functions folder run `firebase deploy --only functions`

## To test functions (WITHOUT SETTING UP EMULATOR THIS TESTS IN PROD):
`firebase functions:shell`
Example: `app.get('/popularity')`