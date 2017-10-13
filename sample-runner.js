const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const { spawn } = require('child_process')
const samplePackage = require('./samples/app/package.json')
const originalMain = samplePackage.main

let tns

const files = fs
  .readdirSync('./samples/app')
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
      choices: ['Android', 'iOS']
    }
  ])
  .then(res => {
    setMain(res.sample)
    tns = spawn('tns', ['run', res.platform], {
      cwd: './samples'
    })

    tns.on('error', err => {
      console.log(err)
    })

    tns.stdout.on('data', chunk => {
      const line = chunk.toString().trim()
      console.log(line)
    })
  })

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
    './samples/app/package.json',
    JSON.stringify(samplePackage, null, 2)
  )
}

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)
