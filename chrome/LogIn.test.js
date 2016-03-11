var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var expect = require('chai').expect;

describe('test Manager Web Log In',function(){
	before(function(done){
		driver.get('http://stagingapp.wirkn.com');
		done();
	})
	it('Give empty user password',function(){
		driver.findElement(By.name('email')).sendKeys('eric@tan.com')
		driver.findElement(By.name('commit')).click();
		driver.getTitle()
			.then(function(res){
				console.log(res);
				expect(res).to.be(51);
			})			
	})
	
})

// driver.wait(until.titleIs('webdriver - Google Search'), 1000);
// driver.quit();