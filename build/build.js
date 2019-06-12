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
copyHooks()

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
    .then((res) => {
      return write(file, res.output[0].code)
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

function copyHooks() {
  const sourceHooksDir = path.join(process.cwd(), "platform", "nativescript", "hooks");
  if (!fs.existsSync(sourceHooksDir)) {
    return;
  }

  const targetHooksDir = path.join(process.cwd(), "dist", "hooks");
  if (!fs.existsSync(targetHooksDir)) {
    fs.mkdirSync(targetHooksDir)
  }

  const sourceFiles = fs.readdirSync(sourceHooksDir);
  sourceFiles.forEach(file => {
    const sourcePath = path.join(sourceHooksDir, file);
    const targetPath = path.join(targetHooksDir, file);
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }

    fs.copyFileSync(sourcePath, targetPath);
  });
}
