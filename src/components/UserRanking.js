import React, { useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'
import { Checkbox, Typography } from '@mui/material'

const columns = [
  {
    field: 'username',
    headerName: 'Username',
    width: 160,
  },
  {
    field: 'commits',
    headerName: 'Number of commits',
    width: 180,
    type: 'number',
  },
  {
    field: 'additions',
    headerName: 'Additions',
    width: 120,
    type: 'number',
  },
  {
    field: 'deletions',
    headerName: 'Deletions',
    width: 120,
    type: 'number',
  },
  {
    field: 'total',
    headerName: 'Total',
    width: 100,
    type: 'number',
  },
]

const UserRanking = ({ commits }) => {
  const users = new Set()
  const fileTypes = new Set()

  const [excluded, setExcluded] = useState([])

  const handleExcludeChange = (fileType) => {
    if (excluded.includes(fileType)) {
      setExcluded(excluded.filter((file) => file !== fileType))
    } else {
      setExcluded(excluded.concat(fileType))
    }
  }

  commits.forEach((commit) => {
    users.add(commit.username)
    commit.files.forEach((file) => {
      fileTypes.add(file.fileEnding)
    })
  })

  const rows = Array.from(users).map((user, idx) => {
    const commitsByUser = commits.filter((commit) => commit.username === user)

    const additions = commitsByUser.reduce(
      (acc, commit) =>
        acc +
        commit.files.reduce(
          (a, file) =>
            a + (!excluded.includes(file.fileEnding) ? file.additions : 0),
          0,
        ),
      0,
    )

    const deletions = commitsByUser.reduce(
      (acc, commit) =>
        acc +
        commit.files.reduce(
          (a, file) =>
            a + (!excluded.includes(file.fileEnding) ? file.deletions : 0),
          0,
        ),
      0,
    )

    const commitCount = commitsByUser.reduce(
      (acc, commit) =>
        acc +
        (commit.files.filter((file) => !excluded.includes(file.fileEnding))
          .length > 0
          ? 1
          : 0),
      0,
    )

    return {
      additions,
      deletions,
      commits: commitCount,
      total: additions + deletions,
      username: user,
      id: idx,
    }
  })

  return (
    <>
      <Typography variant="h4">Commits by user</Typography>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>

      <Typography variant="h5">Exclude file types</Typography>

      {Array.from(fileTypes)
        .sort()
        .map((fileType) => (
          <>
            {fileType}
            <Checkbox
              checked={excluded.includes(fileType)}
              onChange={() => handleExcludeChange(fileType)}
            />
          </>
        ))}
    </>
  )
}

export default UserRanking
