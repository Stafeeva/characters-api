const webdriver = require('selenium-webdriver')
const By = webdriver.By

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// ask the browser to open a page
driver.navigate().to('http://localhost:3000')
driver.findElement(By.css('.addButton')).click()
