const rollup = require('rollup')
const fs = require('fs')
const path = require('path')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

let builds = require('./config').getAllBuilds()

if (process.argv[2]) {
  const filters = process.argv[2].split(',')

  builds = builds.filter(b => {
    return filters.some(f => b._name.indexOf(f) >= -1)
  })
}

build(builds)

function build(builds) {
  let built = 0
  const total = builds.length

  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if(built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

function buildEntry(config) {
  const output = config.output
  const { file } = output

  return rollup.rollup(config)
    .then(bundle => bundle.generate(output))
    .then(({ code }) => {
      return write(file, code)
    })
}

function write(dest, code) {
  return new Promise((resolve, reject) =>  {
    function report() {
      console.log('Built: ' + path.relative(process.cwd(), dest))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if(err) return reject(err)
      report()
    })
  })
}
function logError(e) {
  console.log(e)
}