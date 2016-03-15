var webdriver = require('selenium-webdriver'),
	chrome = require('selenium-webdriver/chrome'),
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

function goLogIn(cb){
	driver.manage().deleteAllCookies();
	driver.get('http://stagingapp.wirkn.com');
	cb();
} 

describe('Manager Web Tests',function() {
	before(function() {
		driver.getWindowHandle();
	})
	after(function() {
		driver.quit();
	})
	describe('LogIn Tests', function(){
		this.timeout(30000);
		test.it('should log in at valid credential', function (done) {
			goLogIn (function () {
				console.log('we are in');
				driver.findElement(By.name('email')).sendKeys('eric@tan.com');
				driver.findElement(By.name('password')).sendKeys('password');
				driver.findElement(By.name('commit')).click();
				expect(driver.getTitle()).to.eventually.equal('Wirkn | Applications');
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