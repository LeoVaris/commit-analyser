import React from 'react'

import UserRanking from './UserRanking'
import FileRanking from './FileRanking'

const CommitListing = ({ commits }) => (
  <>
    <UserRanking commits={commits} />
    <FileRanking commits={commits} />
  </>
)

export default CommitListing
