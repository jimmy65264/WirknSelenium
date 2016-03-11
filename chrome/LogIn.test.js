var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://stagingapp.wirkn.com');
driver.findElement(By.name('email')).sendKeys('eric@tan.com');
driver.findElement(By.name('password')).sendKeys('password');
driver.findElement(By.name('commit')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();