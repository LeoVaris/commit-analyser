import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'

import { makeStyles } from '@mui/styles'

import { parseUrl } from './util/parser'
import { loadCommits } from './util/loader'

import CommitListing from './components/CommitListing'

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    marginLeft: '25%',
    marginRight: '25%',
  },
})

const LoadingCommitsMessage = () => <div>Loading commits</div>

const ErrorMessage = () => (
  <div>Failed loading commits, check the GitHub url</div>
)

const App = () => {
  const classes = useStyles()

  const [repoUrl, setRepoUrl] = useState('')
  const [commits, setCommits] = useState({
    data: null,
    loading: false,
    error: false,
  })

  const handleRepoUrlChange = (newValue) => {
    setRepoUrl(newValue)
  }

  const getData = async () => {
    const [owner, repo] = parseUrl(repoUrl)
    setCommits({ data: null, loading: true, error: false })
    const data = await loadCommits(owner, repo)
    setCommits({ data, loading: false, error: !data })
  }

  return (
    <div className={classes.container}>
      <Typography variant="h4">Enter repo url</Typography>

      <TextField
        value={repoUrl}
        onChange={(event) => handleRepoUrlChange(event.target.value)}
        label="https://github.com/owner/repo"
        fullWidth
        variant="outlined"
      />

      <Button variant="contained" onClick={() => getData()}>
        Load commits
      </Button>

      {commits.loading && <LoadingCommitsMessage />}
      {commits.error && <ErrorMessage />}
      {commits.data && <CommitListing commits={commits.data} />}
    </div>
  )
}

export default App
