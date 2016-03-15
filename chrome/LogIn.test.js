var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    test = require('selenium-webdriver/testing'),
    chai = require ('chai');
    chai_p = require ('chai-as-promised');

chai.use(chai_p);
expect = chai.expect;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

function goLogIn (cb) {
	driver.manage().deleteAllCookies();
	driver.get('http://stagingapp.wirkn.com');
	if (cb) cb();
} 

function validLogIn (cb) {
	driver.findElement(By.name('email')).sendKeys('eric@tan.com');
	driver.findElement(By.name('password')).sendKeys('password');
	driver.findElement(By.name('commit')).click();
	if (cb) cb();
}

function invalidLogIn (cb) {
	for(var index = 0;index< 100;index++){
		driver.findElement(By.name('email')).sendKeys('eric@tan.com');
		driver.findElement(By.name('password')).sendKeys('BadPassword' + index.toString());
		driver.findElement(By.name('commit')).click();
		if(cb) cb();
	}
}

function goPostJob(cb) {
	driver.findElement(By.xpath('//*[@id="navbar-collapse"]/ul[2]/li[1]/a/button')).click();
	if (cb) cb();
}


describe('Manager Web Tests',function() {
	this.timeout(30000);
	before(function() {
		driver.getWindowHandle();
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

	describe('Test default homepage for Manger Web', function () {
		before(function () {
			this.timeout(30000);
		})

		test.it('go to post job',function (done) {
			goLogIn();
			validLogIn();
				goPostJob(function () {
					expect(driver.findElement(By.xpath('//*[@id=\"tab1\"]/div/div[2]/h3/span'))).to.eventually.equal('Welcome');
					done();
				})
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