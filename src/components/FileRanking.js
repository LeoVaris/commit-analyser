import React, { useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'
import { Checkbox, Typography } from '@mui/material'

const columns = [
  {
    field: 'fileType',
    headerName: 'File ending',
    width: 160,
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

const FileRanking = ({ commits }) => {
  const users = new Set()
  const fileTypes = new Set()

  const [excluded, setExcluded] = useState([])

  const handleExcludeChange = (user) => {
    if (excluded.includes(user)) {
      setExcluded(excluded.filter((u) => u !== user))
    } else {
      setExcluded(excluded.concat(user))
    }
  }

  commits.forEach((commit) => {
    users.add(commit.username)
    commit.files.forEach((file) => {
      fileTypes.add(file.fileEnding)
    })
  })

  const rows = Array.from(fileTypes).map((fileType, idx) => {
    const commitsByAllowedUsers = commits.filter(
      (commit) => !excluded.includes(commit.username),
    )

    const additions = commitsByAllowedUsers.reduce(
      (acc, commit) =>
        acc +
        commit.files.reduce(
          (a, file) => a + (file.fileEnding === fileType ? file.additions : 0),
          0,
        ),
      0,
    )

    const deletions = commitsByAllowedUsers.reduce(
      (acc, commit) =>
        acc +
        commit.files.reduce(
          (a, file) => a + (file.fileEnding === fileType ? file.deletions : 0),
          0,
        ),
      0,
    )

    return {
      fileType,
      additions,
      deletions,
      total: additions + deletions,
      id: idx,
    }
  })

  return (
    <>
      <Typography variant="h4">Commits by file type</Typography>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>

      <Typography variant="h5">Exclude users</Typography>

      {Array.from(users)
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

export default FileRanking
