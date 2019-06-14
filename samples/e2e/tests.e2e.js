const nsAppium = require("nativescript-dev-appium")
const expect = require("chai").expect
const fs = require('fs')
const addContext = require('mochawesome/addContext')
const rimraf = require('rimraf')

describe("Vue", () => {
    let driver, isSauceRun

    before(async function () {
        driver = await nsAppium.createDriver()
        driver.defaultWaitTime = 15000
        isSauceRun = driver.nsCapabilities.isSauceLab
        let dir = "mochawesome-report"
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        rimraf('mochawesome-report/*', function () { })
    })

    after(async () => {
        if (isSauceRun) {
            driver.sessionId().then(function (sessionId) {
                console.log("Report https://saucelabs.com/beta/tests/" + sessionId)
            })
        }
        await driver.quit()
        // console.log("Quit driver!")
    })

    afterEach(async function () {
        if (this.currentTest.state && this.currentTest.state === "failed") {
            let png = await driver.logScreenshot(this.currentTest.title)
            fs.copyFile(png, './mochawesome-report/' + this.currentTest.title + '.png', function (err) {
                if (err) {
                    throw err
                }
                console.log('Screenshot saved.')
            })
            addContext(this, './' + this.currentTest.title + '.png')
        }
    })

    describe("nativescript-vue-tests", () => {
        it("can increment counter", async () => {
            const incrementBtn = await driver.findElementByText("+1")
            const counterLabel = await driver.findElementByText('0')

            expect(incrementBtn).to.exist
            expect(counterLabel).to.exist

            await incrementBtn.click()
            await incrementBtn.click()

            const updatedLabel =  await driver.findElementByText('2')

            expect(updatedLabel).to.exist
        })
    })
})
