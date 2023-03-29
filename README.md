# GabrielHub

A collection of projects/ideas/tests | wip

## How to deploy

`npm run deploy`, pushes to gh-pages branch and deploys to github pages

in the firebase/functions folder run `firebase deploy --only functions`

To test functions (WITHOUT SETTING UP EMULATOR THIS TESTS IN PROD):
`firebase functions:shell`
Example: `app.get('/popularity')`