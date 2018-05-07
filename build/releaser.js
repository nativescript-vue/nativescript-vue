const inquirer = require('inquirer')
const spawn = require('child_process').spawn
const semver = require('semver')

inquirer
  .prompt([
    {
      name: 'bump',
      type: 'list',
      message: 'Choose a version to release',
      choices: ['patch', 'minor', 'major', 'prerelease', 'custom'],
      default: 'patch'
    },
    {
      name: 'customVersion',
      type: 'input',
      message: 'Input version',
      // choices: ['alpha', 'beta', 'patch', 'pre-release'],
      when: ({bump}) => bump === 'custom'
    },
    {
      name: 'releaseTag',
      type: 'input',
      message: 'Input release tag',
      when: ({bump}) => bump === 'custom'
    }
  ])
  .then(res => {
    return new Promise((resolve, reject) => {
      const v = semver.parse(res.customVersion || require('../package.json').version)

      if (!res.customVersion) {
        v.inc(res.bump)
      }
      inquirer.prompt([{
        name: 'confirmed',
        type: 'confirm',
        message: 'Are you sure you want to release v' + v.version + (res.releaseTag ? ' with tag: ' + res.releaseTag: ''),
        default: false
      }]).then((res) => {
        if (res.confirmed) {
          return resolve({
            version: v.version,
            releaseTag: res.releaseTag
          })
        }
        reject()
      }).catch(reject)
    })
  })
  .then(({version, releaseTag}) => {
    console.log(blue(`Releasing v${version}...`))
    console.log(blue('-'.repeat(80)))

    const buildMessage = `build: ${version}`
    const releaseMessage = `release: ${version}`
    return runCommands(`
      echo "Running tests..."
      npm run test
      echo "Starting build..."
      VERSION=${version} npm run build
      echo "Build Successful. Updating packages"
      cd packages/nativescript-vue-template-compiler && npm version ${version} && npm publish
      git add -A
      git add -f dist/index.js dist/index.js.map packages/nativescript-vue-template-compiler/index.js
      git commit --no-verify -m "${buildMessage}"
      npm version ${version} --commit-hooks false -m "${releaseMessage}"
      npm run release:notes
      echo "Pushing to git"
      git push origin refs/tags/v${version}
      git push origin master
      echo "Publishing to npm"
      npm publish${releaseTag ? ' --tag ' + releaseTag : ''}
      npm run changelog
      git add CHANGELOG.md
      git commit --no-verify -m "chore: update changelog"
      git push origin master
      echo "Release successful."
      `)
  })
  .then(() => {
    console.log(blue('-'.repeat(80)))
    console.log(blue('Release complete.'))
  })
  .catch(err => {
    console.log(blue('-'.repeat(80)))
    console.log(err)
    console.log(blue('-'.repeat(80)))
    console.log(blue('Release has been canceled.'))
  })

function runCommands(commands) {
  return commands.split('\n')
    .map(c => c.trim())
    .filter(c => !!c.length)
    .reduce((promise, command) => {
      return promise.then(() => runCommand(command))
    }, Promise.resolve())
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(blue(`> ${command}`))
    const split = command.split(' ')
    const child = spawn(split[0], split.slice(1), {shell: true})

    child.stdout.on('data', data => process.stdout.write(data));
    child.on('error', data => reject(`The command '${command}' has failed.`));
    child.on('exit', () => resolve());
  })
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}