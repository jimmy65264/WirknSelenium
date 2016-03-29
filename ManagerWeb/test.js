var	test = require('selenium-webdriver/testing'),
	xpath = require("./xpath.json").xpath;
	testMethods = require("./testMethods").testMethods;
	driver = require("./testMethods").driver;


var methods = new testMethods();


test.describe('Manager Web Tests',function() {
	before(function (done) {
		driver.getWindowHandle();
		driver.manage().window()//.setSize(1680,1050);
		.setSize(2560,1440);
		done();
	})
	after(function (done) {
			//driver.quit()
			// .then(function () {
			// 	done();
			// })
	done();
	})
	
	test.describe('Test going to home page', function () {
		this.timeout(50000);
		test.it('should go to login page', function (done) {
			methods.goLogIn(done);
		})
	})
	
	test.describe('Test invalid login', function () {
		this.timeout(10000);
		test.it('should fail to login with empty password', function (done) {
			methods.logInWithEmptyPassword(done);
		})
		test.it('should fail to login with wrong password', function (done) {
			methods.logInWithWrongPassword(done);
		})
	})

	test.describe('Test valid Login', function () {
		this.timeout(10000);
		test.it('should login with valid username and password', function (done) {
			methods.validLogIn(done);
		})
	})

	test.describe('Test applications sorted by date (default)',function () {
		this.timeout(10000);
		test.it('should assure listed applications are sorted by date decreamently', function (done) {
			methods.applicationsSortedByDate(done);
		})
	})
	
	test.describe('Test change application satus', function () {
		this.timeout(10000);
		test.it('should change application status to active', function (done) {
			methods.changeAppStatus('active',done);
		})
		test.it('should change application status to called', function (done) {
			methods.changeAppStatus('called',done);
		})
		test.it('should change application status to emailed', function (done) {
			methods.changeAppStatus('emailed',done);
		})
		test.it('should change application status to interview1', function (done) {
			methods.changeAppStatus('interview 1',done);
		})
		test.it('should change application status to interview2', function (done) {
			methods.changeAppStatus('interview 2',done);
		})
		test.it('should change application status to interview3', function (done) {
			methods.changeAppStatus('interview 3',done);
		})
		test.it('should change application status to prescreened', function (done) {
			methods.changeAppStatus('pre screened',done);
		})
		test.it('should change application status to wrong fit', function (done) {
			methods.changeAppStatus('wrong fit',done);
		})
		test.it('should change application status to offered', function (done) {
			methods.changeAppStatus('offered',done);
		})
		test.it('should change application status to hired', function (done) {
			methods.changeAppStatus('hired',done);
		})
	})

	test.describe('Test action post a job', function () {
		this.timeout(50000);
		test.it('should click on post job button and go to post page',function (done) {
			methods.goPostJob(done)
		})
		test.it('should fill in employer info form and go to next page',function (done) {
			methods.fillInValidEmployerInfo(done)
		})
		test.it('should fill in job description form and go to next page',function (done) {
			methods.fillInValidJobDescription(done)
		})
		test.it('should upload a photo and go to next page',function (done) {
			methods.uploadValidPhoto(done)
		})
		test.it('should check all required filed and go to next page',function (done) {
			methods.checkAllRequiredField(done)
		})
	})


})


