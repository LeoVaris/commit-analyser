export const parseUrl = (url) => {
  const parts = url.split('/')
  if (parts.length < 5) return ['', '']
  return [parts[3], parts[4]]
}

export const parseFileEnding = (filepath) => {
  const parts = filepath.split('/')
  const file = parts[parts.length - 1]
  const fileparts = file.split('.')
  if (fileparts.length === 1) return 'No ending'
  return fileparts[fileparts.length - 1]
}
