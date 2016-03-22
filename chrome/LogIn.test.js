var webdriver = require('selenium-webdriver'),
	By = require('selenium-webdriver').By,
	until = require('selenium-webdriver').until,
	test = require('selenium-webdriver/testing'),
	chai = require ('chai');
	chai_p = require ('chai-as-promised');
	Promise = require("bluebird")
	robot = require("robotjs");

	chai.use(chai_p);
	expect = chai.expect;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    function testMsg (action) {
    	console.log('		action includes:',action);
    }

    function testWaitForXpath (path,ext) {
    	if(ext){
    		driver.wait(function () {
    			return driver.isElementPresent(webdriver.By.xpath(path));
			}, ext);
    	}
    	else{
	    	driver.wait(function () {
	    	return driver.isElementPresent(webdriver.By.xpath(path));
			}, 2000);
    	}
    }

	function testMethods () {
	
	testMethods.prototype.goLogIn = function (cb) {
		testMsg('Go Log In page');
		driver.manage().deleteAllCookies();
		driver.get('http://stagingapp.wirkn.com')
		driver.wait(until.elementLocated(By.name('commit')));
		expect(driver.getTitle()).to.eventually.equal('Wirkn | Log In')
		if (cb) cb();
	} 

	testMethods.prototype.validLogIn = function (cb) {
		testMsg('Log In');
		driver.wait(until.elementLocated(By.name('commit')));
		driver.findElement(By.name('email')).sendKeys('eric@tan.com');
		driver.findElement(By.name('password')).sendKeys('password');
		driver.findElement(By.name('commit')).click()
		expect(driver.getTitle()).to.eventually.equal('Wirkn | Applications');
		if(cb) cb();
	}

	testMethods.prototype.goPostJob = function (cb) {
		testMsg('Go Post Job page');
		testWaitForXpath('//*[@id="navbar-collapse"]/ul[2]/li[1]/a/button')
		driver.findElement(By.xpath('//*[@id="navbar-collapse"]/ul[2]/li[1]/a/button')).click()
		testWaitForXpath('//*[@id="business_name"]');
		expect(driver.getTitle()).to.eventually.equal('Wirkn | New Job');
		if (cb) cb();
	}

	testMethods.prototype.fillInValidEmployerInfo = function (cb) {
		testMsg('Fill in Valid EmployerInfo');
		testWaitForXpath('//*[@id="business_name"]');
		driver.findElement(By.id('business_name')).sendKeys('Test Business');
		driver.findElement(By.id('address')).sendKeys('7 Test Address');
		driver.findElement(By.id('city')).sendKeys('Test City');
		driver.findElement(By.id('province')).sendKeys('Test Province');
		driver.findElement(By.id('postal_code')).sendKeys('Test Zip')
		testWaitForXpath('//*[@id="next"]/a');
		driver.findElement(By.xpath('//*[@id="next"]/a')).click();
		testWaitForXpath('//*[@id="title"]');
		expect(driver.findElement(By.xpath('//*[@id="tab2"]/div[1]/div[1]/h3')).getAttribute('innerText')).to.eventually.equal('Job Category');
		if (cb)  cb();
	}

	testMethods.prototype.fillInValidJobDescription = function (cb) {
		testMsg('Fill in Valid JobDescription');
		testWaitForXpath('//*[@id="title"]')
		driver.wait(until.elementLocated(By.id('title')));
		driver.findElement(By.id('title')).sendKeys('Test Title');
		driver.findElement(By.id('description')).sendKeys('Test Description');
		testWaitForXpath('//*[@id="next"]/a');
		driver.findElement(By.xpath('//*[@id="next"]/a')).click();
		testWaitForXpath('//*[@id="tab3"]/div/div/div/div/div/span/label')
		expect(driver.findElement(By.xpath('//*[@id="tab3"]/div/div/div/h2')).getAttribute('innerText')).to.eventually.equal('Please add an image to your job posting')
		if (cb) cb();
	}

	testMethods.prototype.uploadValidPhoto = function (cb) {
		//make sure you have the picture
		testMsg('Upload a valid photo');
		testWaitForXpath('//*[@id="tab3"]/div/div/div/div/div/span/label');
		driver.findElement(By.xpath('//*[@id="tab3"]/div/div/div/div/div/span/label')).click();
		driver.switchTo().frame(driver.findElement(By.id('filepicker_dialog')));
		testWaitForXpath('//*[@id="ng-app"]/body/div/div[2]/div[2]/div/section/div/div/button',10000);
		driver.findElement(By.xpath('//*[@id="ng-app"]/body/div/div[2]/div[2]/div/section/div/div/button')).click()
		.then(function () {
			robot.moveMouse(1000,300);
			robot.mouseClick();
			robot.typeString("bigsmall");
			robot.keyTap('enter');
		})
		// testWaitForXpath('//*[@id="ng-app"]/body/div/div[2]/div[2]/div/div[2]/button[2]',10000);
		if (cb) cb();
	}

}

var methods = new testMethods();

methods = Promise.promisifyAll(Object.getPrototypeOf(methods));



test.describe('Manager Web Tests',function() {
	before(function (done) {
		driver.getWindowHandle();
			driver.manage().window().setSize(2560,1440);
		done();
	})
	after(function (done) {
			//driver.quit();
			done();
		})
	
	
	// describe('LogIn Tests', function() {
	// 	test.it('should log in at valid credential', function (done) {
	// 		goLogIn (function () {
	// 			validLogIn(function () {
	// 				expect(driver.getTitle()).to.eventually.equal('Wirkn | Applications');
	// 				done();
	// 			})
	// 		})
	// 	})
	// })



	test.describe('Test action post a job', function () {
		this.timeout(50000);
		test.it('go to post a job',function (done) {
				methods.goLogInAsync()
				.then(methods.validLogInAsync())		
				.then(methods.goPostJobAsync())
				.then(methods.fillInValidEmployerInfoAsync())
				.then(methods.fillInValidJobDescriptionAsync())
				.then(methods.uploadValidPhotoAsync(done));
		})
	})
})
	// test.it('should deny empty user password at log in',function (done) {
	// 	goLogIn(function () {
	// 		driver.findElement(By.name('email')).sendKeys('eric@tan.com')
	// 		driver.findElement(By.name('commit')).click();
	// 		console.log('we are here')
	// 		driver.findElement(By.className('container')).then(
	// 			function (result) {
	// 				console.log(result);
	// 				expect(result).should.equal('Sorry the password is not correct, please try again');
	// 				done();
	// 			})			
	// 	})
	// })
	
	// test.it('should redirect to password reset page on clicking forgot password',function(){
	// 	goLogIn()
	// 	driver.findElement(By.className('display-block text-center m-t-md text-sm')).click();
	// 	driver.findElement(By.className('login-box')).then(
	// 		function (result) {
	// 			console.log(result);
	// 			expect(result).should.equal('We all forget sometimes. Don\'t fret, we\'ll send you a link to reset it. Enter your email below.');
	// 		})			
	// })
	
// })

// driver.wait(until.titleIs('webdriver - Google Search'), 1000);
// driver.quit();