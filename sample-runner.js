const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const { spawn } = require('child_process')
const samplePackage = require('./samples/app/package.json')
const readline = require('readline')
const originalMain = samplePackage.main

let tns, devices, deviceSpawn, deviceList = [],
    count = 0

const files = fs
    .readdirSync('./samples/app')
    .filter(file => file.endsWith('.js'))
    .filter(file => !file.startsWith('nativescript-vue'))

inquirer
    .prompt([{
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
        },
        {
            type: 'list',
            message: 'Choose Emulator or Device',
            name: 'device',
            choices: ['Emulator', 'Device']
        }
    ])
    .then(res => {
        setMain(res.sample)

        if (res.device === 'Device' && res.platform === 'Android') {
          setOnDevice(res);
        } else if (res.device === 'Device' && res.platform === 'iOS') {
            console.log('Sorry we don\'t support iOS devices yet.')
            return
        } else {
            tns = spawn(/^win/.test(process.platform) ? 'tns.cmd' : 'tns', ['run', res.platform], {
                cwd: './samples'
            })

            tns.on('error', err => {
                console.log(err)
            })

            tns.stdout.on('data', chunk => {
                const line = chunk.toString().trim()
                console.log(line)
            })
        }
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

function setOnDevice(res) {
    deviceSpawn = spawn('adb', ['devices'])
    const rl = readline.createInterface({ input: deviceSpawn.stdout })
    deviceSpawn.on('error', err => {
        console.log(err)
    })
    rl.on('line', line => {
        if (count !== 0 && line) {
            deviceList.push(line.split('\t')[0])
        }
        count++
    })
    rl.on('close', () => {
        if (!deviceList.length) {
            console.log('No devices found')
            return
        }

        inquirer
            .prompt([{
                type: 'list',
                message: 'Choose Device Id',
                name: 'deviceId',
                choices: deviceList
            }]).then(devId => {
                tns = spawn(/^win/.test(process.platform) ? 'tns.cmd' : 'tns', ['run', res.platform, `--device=${devId.deviceId}`], {
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
    })
}

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)