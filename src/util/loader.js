import { octokit } from './octokit'
import { parseFileEnding } from './parser'

export const loadCommits = async (owner, repo) => {
  try {
    const data = await octokit.paginate(`GET /repos/${owner}/${repo}/commits`)

    const commits = await Promise.all(
      data.map(async (commit) => {
        const { data: commitData } = await octokit.request(
          `GET /repos/${owner}/${repo}/commits/${commit.sha}`,
        )

        const username = commitData.author.login
        const files = commitData.files.map(
          ({ additions, deletions, filename }) => ({
            additions,
            deletions,
            filename,
            fileEnding: parseFileEnding(filename),
          }),
        )

        return {
          username,
          files,
        }
      }),
    )

    return commits
  } catch (e) {
    return null
  }
}
