const nsAppium = require("nativescript-dev-appium")

before("start appium server", async () => {
    await nsAppium.startServer().catch(err => {
        console.log(err)
    })
})

after("stop appium server", async () => {
    await nsAppium.stopServer().catch(err => {
        console.log(err)
    })
})
