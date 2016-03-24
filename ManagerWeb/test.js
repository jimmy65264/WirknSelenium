var	test = require('selenium-webdriver/testing'),
	Promise = require("bluebird")
	xpath = require("./xpath.json").xpath;
	testMethods = require("./testMethods").testMethods;
	driver = require("./testMethods").driver;


var methods = new testMethods();

methods = Promise.promisifyAll(Object.getPrototypeOf(methods));



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
		test.it('go to post a job',function (done) {
				// methods.goLogIn(function () {
				// 	methods.validLogIn(function () {
				// 		methods.goPostJob(function () {
				// 			methods.fillInValidEmployerInfo(function () {
				// 				methods.fillInValidJobDescription(function () {
				// 					methods.uploadValidPhoto(function () {
				// 						methods.checkAllRequiredFied(done)
				// 					})
				// 				})
				// 			})
				// 		})
				// 	})
				// })
				methods.goLogInAsync()
				.then(methods.validLogInAsync())
				.then(methods.goPostJobAsync())
				.then(methods.fillInValidEmployerInfoAsync())
				.then(methods.fillInValidJobDescriptionAsync())
				.then(methods.uploadValidPhotoAsync())
				.then(methods.checkAllRequiredField(done));
		})
	})
})


