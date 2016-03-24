var	test = require('selenium-webdriver/testing'),
	xpath = require("./xpath.json").xpath;
	testMethods = require("./testMethods").testMethods;
	driver = require("./testMethods").driver;


var methods = new testMethods();

test.describe('Manager Web Tests',function() {
	before(function (done) {
		driver.getWindowHandle();
		driver.manage().window().setSize(2560,1440);
		done();
	})
	after(function (done) {
			driver.quit()
			.then(function () {
				done();
			})
	})

	test.describe('Test action post a job', function () {
		this.timeout(50000);
		test.it('should go to login page', function (done) {
			testMethods.prototype.goLogIn(done)
		})
		test.it('should pass in valid username and password and log in',function (done) {
			testMethods.prototype.validLogIn(done)
		})
		test.it('should click on post job button and go to post page',function (done) {
			testMethods.prototype.goPostJob(done)
		})
		test.it('should fill in employer info form and go to next page',function (done) {
			testMethods.prototype.fillInValidEmployerInfo(done)
		})
		test.it('should fill in job description form and go to next page',function (done) {
			testMethods.prototype.fillInValidJobDescription(done)
		})
		test.it('should upload a photo and go to next page',function (done) {
			testMethods.prototype.uploadValidPhoto(done)
		})
		test.it('should check all required filed and go to next page',function (done) {
			testMethods.prototype.checkAllRequiredField(done)
		})
	})
})


