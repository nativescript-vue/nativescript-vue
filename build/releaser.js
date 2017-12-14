const inquirer = require('inquirer')
const spawn = require('child_process').spawn
const semver = require('semver')

inquirer
  .prompt([
    {
      name: 'type',
      type: 'list',
      message: 'Choose a version to release',
      choices: ['major', 'minor', 'patch'],
      default: 'patch'
    }
  ])
  .then(res => {
    return new Promise((resolve, reject) => {
      const v = semver.parse(require('../package.json').version)
      v.inc(res.type)

      inquirer.prompt([{
        name: 'confirmed',
        type: 'confirm',
        message: 'Are you sure you want to release v' + v.version,
        default: false
      }]).then((res) => {
        if (res.confirmed) {
          return resolve(v.version)
        }
        reject()
      }).catch(reject)
    })
  })
  .then(version => {
    console.log(`Releasing v${version}...`)

    // build
    const buildMessage = `build: ${version}`
    const releaseMessage = `release: ${version}`
    return runCommands(`
      echo "Running tests..."
      npm run test
      echo "Starting build..."
      npm run build
      echo "Build Successful. Updating packages"
      cd packages/nativescript-vue-template-compiler && npm version ${version} && npm publish
      git add -A
      git add -f dist/index.js dist/index.js.map packages/nativescript-vue-template-compiler/index.js
      git commit -m "${buildMessage}"
      npm version ${version} -m "${releaseMessage}"
      echo "Pushing to git"
      git push origin refs/tags/v${version}
      git push origin master
      echo "Publishing to npm"
      npm publish
      echo "Release successful."
      `)
  })
  .then(() => {
    console.log(blue('Release complete.'))
  })
  .catch(err => {
    console.log(blue('Release has been canceled.'))
  })

function runCommands(commands) {
  const promises = commands.split('\n')
    .map(c => c.trim())
    .filter(c => c.length)
    .map((command) => {
      return runCommand(command.trim())
    })
  return Promise.all(promises)
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(blue(`> ${command}`))
    const split = command.split(' ')
    const child = spawn(split[0], split.slice(1), { shell: true })

    child.stdout.on('data', data => process.stdout.write(data));
    child.on('error', data => reject(`The command '${command}' has failed.`));
    child.on('exit', () => resolve());
  })
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}