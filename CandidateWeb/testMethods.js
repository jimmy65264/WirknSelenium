require('chromedriver');
var webdriver = require('selenium-webdriver'),
	By = require('selenium-webdriver').By,
	until = require('selenium-webdriver').until,
	Key = require('selenium-webdriver').Key
	test = require('selenium-webdriver/testing'),
	chai = require ('chai');
	chai_p = require ('chai-as-promised');
	Promise = require("bluebird")
	robot = require("robotjs");
	sleep = require("sleep");
	xpath = require("./xpath.json").xpath;
	driver = require("../driver").driver;

	chai.use(chai_p);
	expect = chai.expect;

function testMethods() {
	testMethods.prototype.goWirkn = function (cb) {
		driver.manage().deleteAllCookies();
		driver.get('http://www.wirkn.com');
		expect(driver.getTitle()).to.eventually.equal('Wirkn - Get Wirk\'n');
		if (cb) cb();
	}
}

module.exports.testMethods = testMethods;
