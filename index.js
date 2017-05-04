const path = require('path')
const fs = require('fs')

module.exports = (...args) => {
  if (args.length === 0) {
    return
  } else if (args.length === 1) {
    callback = args[0]
    start = module.parent.filename
    filename = 'package.json'
  } else if (args.length === 2) {
    start = args[0]
    callback = args[1]
    filename = 'package.json'
  } else {
    [ start, filename, callback ] = args
  }

  const checkPaths = paths => {
    if (!paths.length) {
      callback(null)
      return
    }

    const checkingPath = paths[0]
    fs.stat(path.join(checkingPath, filename), err => {
      if (!err) {
        callback(null, checkingPath)
        return
      }
      checkPaths(paths.slice(1))
    })
  }

  checkPaths(availablePaths(start))
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
