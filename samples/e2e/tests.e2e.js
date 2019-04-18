const nsAppium = require("nativescript-dev-appium");
const expect = require("chai").expect;
const fs = require('fs');
const addContext = require('mochawesome/addContext');
const rimraf = require('rimraf');

describe("Vue", () => {
    let driver, isSauceRun;

    before(async function () {
        driver = await nsAppium.createDriver();
        driver.defaultWaitTime = 15000;
        isSauceRun = driver.nsCapabilities.isSauceLab;
        let dir = "mochawesome-report";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        rimraf('mochawesome-report/*', function () { });
    });

    after(async () => {
        if (isSauceRun) {
            driver.sessionId().then(function (sessionId) {
                console.log("Report https://saucelabs.com/beta/tests/" + sessionId);
            });
        }
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state && this.currentTest.state === "failed") {
            let png = await driver.logScreenshot(this.currentTest.title);
            fs.copyFile(png, './mochawesome-report/' + this.currentTest.title + '.png', function (err) {
                if (err) {
                    throw err;
                }
                console.log('Screenshot saved.');
            });
            addContext(this, './' + this.currentTest.title + '.png');
        }
    });

    describe("app-with-radsidedrawer-tabs-and-router", () => {
        it("Open sidedrawer", async () => {
            const home = await driver.findElementByText("Home");
            expect(home).to.exist;
            const menu = await driver.findElementByText("Menu");
            await menu.click();
        });

        it("Open a menu item", async () => {
            const item = await driver.findElementByText("Hello1");
            await item.click();
            const detail = await driver.findElementByText("Hello world");
            expect(detail).to.exist;
        });

        it("Open Tabs item", async () => {
            const menu = await driver.findElementByText("Menu");
            await menu.click();
            const item = await driver.findElementByText("Tabs");
            await item.click();
            const tab1 = await driver.findElementByText("You are on Tab 1");
            expect(tab1).to.exist;
        });

        it("Click Tab 2", async () => {
            const tab = await driver.findElementByText("Tab 2");
            await tab.click();
            const tab2Content = await driver.findElementByText("You are on Tab 2");
            expect(tab2Content).to.exist;
        });
    });
});