const path = require('path')
const fs = require('fs')

module.exports = (
  start = module.parent.filename,
  filename = 'package.json',
  callback
) => {
  callback = typeof callback === 'function' ? callback : a => a

  const checkPaths = paths => {
    return new Promise((resolve, reject) => {
      if (!paths.length) return resolve()

      const checkingPath = paths[0]
      fs.stat(path.join(checkingPath, filename), err => {
        if (!err) return resolve(checkingPath)
        checkPaths(paths.slice(1)).then(resolve, reject)
      })
    })
  }

  return checkPaths(availablePaths(start)).then(
    rootPath => {
      callback(null, rootPath)
      return rootPath
    },
    err => {
      callback(err)
      return Promise.reject(err)
    }
  )
}

module.exports.sync = (
  start = module.parent.filename,
  filename = 'package.json'
) => {
  return availablePaths(start).find(dir => {
    try {
      fs.statSync(path.join(dir, filename))
      return true
    } catch (e) {}
  })
}

module.exports.availablePaths = availablePaths

function availablePaths(offeredPath) {
  if (!offeredPath) return []
  const paths = offeredPath.split(path.sep).reduce((paths, part) => {
    if (!paths.length) {
      return part ?
             (part === '.' ? paths.concat('') : paths.concat(['', part])) :
             paths.concat('/')
    }
    if (!part) return paths
    const lastPath = paths[paths.length - 1]
    if (lastPath) {
      return paths.concat(path.join(lastPath, part))
    } else {
      return paths.concat(part)
    }
  }, [])
  paths.reverse()
  return paths
}
