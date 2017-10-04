const inquirer = require('inquirer')
const spawn = require('child_process').spawn

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
        const p = spawn('npm', ['version', res.type, '-m', '"[Release] %s"'])
        p.stdout.on('data', d => console.log(d.toString()))
    })
    .catch(err => {
        console.error(err)
    })
