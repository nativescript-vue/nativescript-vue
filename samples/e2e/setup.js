const nsAppium = require("nativescript-dev-appium");

before("start appium server", async () => {
    await nsAppium.startServer();
});

after("stop appium server", async () => {
    await nsAppium.stopServer();
});
