var	test = require('selenium-webdriver/testing'),
	xpath = require("./xpath.json").xpath;
	testMethods = require("./testMethods").testMethods;
	driver = require("../driver").driver;


var methods = new testMethods();

test.describe('test for candidate web on browser',function () {
	before(function (done) {
		driver.getWindowHandle();
		driver.manage().window()//.setSize(1680,1050);
		.setSize(2560,1440)
		.then(function () {
			robot.moveMouse(300,1000);
			robot.mouseClick();
			robot.keyTap('f',['command','control']);
		})
		done();
	})
	after(function (done) {
		driver.close()
		.then(function () {
			done();
		})
	})

	test.describe('test go to wirkn home page',function () {
		this.timeout(5000);
		test.it('test page load',function (done) {
			methods.goWirkn(done);
		})
	})
})