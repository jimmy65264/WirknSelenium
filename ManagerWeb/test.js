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
			methods.changeAppStatus('active','list',done);
		})
		test.it('should change application status to called', function (done) {
			methods.changeAppStatus('called','list',done);
		})
		test.it('should change application status to emailed', function (done) {
			methods.changeAppStatus('emailed','list',done);
		})
		test.it('should change application status to interview1', function (done) {
			methods.changeAppStatus('interview 1','list',done);
		})
		test.it('should change application status to interview2', function (done) {
			methods.changeAppStatus('interview 2','list',done);
		})
		test.it('should change application status to interview3', function (done) {
			methods.changeAppStatus('interview 3','list',done);
		})
		test.it('should change application status to prescreened', function (done) {
			methods.changeAppStatus('pre screened','list',done);
		})
		test.it('should change application status to wrong fit', function (done) {
			methods.changeAppStatus('wrong fit','list',done);
		})
		test.it('should change application status to offered', function (done) {
			methods.changeAppStatus('offered','list',done);
		})
		test.it('should change application status to hired', function (done) {
			methods.changeAppStatus('hired','list',done);
		})
	})

	test.describe('Test application actions', function () {
		this.timeout(100000);
		//we dont want to bother use driver to check email, so address can be modified, and plz check manually. 
		test.it('should pop up share window on screen after click on share application', function (done) {
			methods.goShareApplication(done);
		})
		test.it('should fill in form and send out email to target address', function (done) {
			methods.shareApplication('jimmy@wirkn.com',done);
		})
		test.it('should change application to read (red dot dissapear), if originally apeared unread [vice versa]', function (done) {
			methods.markApplicationUnreadOrRead(done);
		})
		test.it('should change application to unread (red dot apear), if originally apeared read [vice versa]', function (done) {
			methods.markApplicationUnreadOrRead(done);
		})
	})

	test.describe('Test actions in application detail page',function () {
		this.timeout(50000);
		test.it('should go to application detail of first application on list of applications',function (done) {
			methods.goApplicationDetail(done);
		})
		test.it('should change application status to active', function (done) {
			methods.changeAppStatus('active','detail',done);
		})
		test.it('should change application status to called', function (done) {
			methods.changeAppStatus('called','detail',done);
		})
		test.it('should change application status to emailed', function (done) {
			methods.changeAppStatus('emailed','detail',done);
		})
		test.it('should change application status to interview1', function (done) {
			methods.changeAppStatus('interview 1','detail',done);
		})
		test.it('should change application status to interview2', function (done) {
			methods.changeAppStatus('interview 2','detail',done);
		})
		test.it('should change application status to interview3', function (done) {
			methods.changeAppStatus('interview 3','detail',done);
		})
		test.it('should change application status to prescreened', function (done) {
			methods.changeAppStatus('pre screened','detail',done);
		})
		test.it('should change application status to wrong fit', function (done) {
			methods.changeAppStatus('wrong fit','detail',done);
		})
		test.it('should change application status to offered', function (done) {
			methods.changeAppStatus('offered','detail',done);
		})
		test.it('should change application status to hired', function (done) {
			methods.changeAppStatus('hired','detail',done);
		})
		test.it('should add note to the application', function (done) {
			methods.editApplicationNote(done)
		})
	})
	
	test.describe('Test MyJobs button on application page', function () {
		this.timeout(10000);
		test.it('should go to MyJobs page', function (done) {
			methods.goViewJobs(done);
		})
	})

	test.describe('Test Applications button on jobs page', function () {
		this.timeout(10000);
		test.it('should go to Applications page', function (done) {
			methods.goViewApplications(done);
		})
	})

	test.describe('Test action post a job', function () {
		this.timeout(50000);
		test.it('should click on post job button and go to post page',function (done) {
			methods.goPostJob(done);
		})
		test.it('should fill in employer info form and go to next page',function (done) {
			methods.fillInValidEmployerInfo(done);
		})
		test.it('should fill in job description form and go to next page',function (done) {
			methods.fillInValidJobDescription(done);
		})
		test.it('should upload a photo and go to next page',function (done) {
			methods.uploadValidPhoto(done);
		})
		test.it('should check all required filed and go to next page',function (done) {
			methods.checkAllRequiredField(done);
		})
	})

	test.describe('Test job actions', function () {
		this.timeout(50000);
		test.it('should be able to go edit job',function (done) {
			methods.editJob(done);
		})
	})


})


