const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const samplePackage = require('../samples/app/package.json')
const originalMain = samplePackage.main

let tns

const files = fs
  .readdirSync(path.resolve(__dirname, '../samples/app'))
  .filter(file => file.endsWith('.js'))
  .filter(file => !file.startsWith('nativescript-vue'))

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Choose a sample to run',
      name: 'sample',
      choices: files
    },
    {
      type: 'list',
      message: 'Choose a platform to run on',
      name: 'platform',
      choices: ['Android', 'iOS', 'Both']
    }
  ])
  .then(res => {
    setMain(res.sample)
    if(res.platform.toLowerCase() === 'both') {
      runPlatform('ios')
      runPlatform('android')

      return;
    }

    runPlatform(res.platform)
  })

function runPlatform(platform) {
  tns = spawn('tns', ['debug', platform], {
    cwd: path.resolve(__dirname, '../samples')
  })

  tns.on('error', err => console.log(err))
  tns.stdout.on('data', data => process.stdout.write(platform + ': ' +data))
}

function shutDown() {
  if (tns) {
    tns.stdin.pause()
    tns.kill()
    setMain(originalMain)
  }

  console.log('\n\nHave a nice day! :)')

  process.exit()
}

function setMain(file) {
  samplePackage.main = file
  fs.writeFileSync(
    path.resolve(__dirname, '../samples/app/package.json'),
    JSON.stringify(samplePackage, null, 2)
  )
}

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)
