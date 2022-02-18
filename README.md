# Commit analyser

This project can be used to view statistics about GitHub commits for a project. For example, one can exclude `json`-changes as they usually create a lot of changes when using `npm` in the frontend. The visual look of the project is very bad, as it is a thing I'm not good at. Please focus on the features of the software. 

## How to run

Clone the project

```
npm install
```

Get your [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). You should add at least the right `public_repo` for the project to work. 

Create a `.env` file using the template and paste your token there. 

```
npm start
```

Then navigate to `localhost:3000` to view the app. 

## Things to note

The rate limit of the GitHub api is 5000 requests per hour. This project does one request for each commit, so it is not wise to use this with massive projects that may have more than 5000 commits. The functionality should be efficient enough to support anything below that. 
