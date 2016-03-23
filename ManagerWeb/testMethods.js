require('chromedriver');
var webdriver = require('selenium-webdriver'),
	By = require('selenium-webdriver').By,
	until = require('selenium-webdriver').until,
	test = require('selenium-webdriver/testing'),
	chai = require ('chai');
	chai_p = require ('chai-as-promised');
	Promise = require("bluebird")
	robot = require("robotjs");
	sleep = require("sleep");
	xpath = require("./xpath.json").xpath;

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
		}, 4000);
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
		driver.findElement(By.name('commit')).click();
		expect(driver.getTitle()).to.eventually.equal('Wirkn | Applications');
		if(cb) cb();
	}

	testMethods.prototype.goPostJob = function (cb) {
		testMsg('Go Post Job page');
		testWaitForXpath(xpath.post_button)//post button
		driver.findElement(By.xpath(xpath.post_button)).click()//post button
		testWaitForXpath(xpath.post_job.employer_info.name);
		expect(driver.getTitle()).to.eventually.equal('Wirkn | New Job');
		if (cb) cb();
	}

	testMethods.prototype.fillInValidEmployerInfo = function (cb) {
		testMsg('Fill in Valid EmployerInfo');
		testWaitForXpath('//*[@id="business_name"]');
		driver.findElement(By.xpath(xpath.post_job.employer_info.name)).sendKeys('Test Business');
		driver.findElement(By.xpath(xpath.post_job.employer_info.address)).sendKeys('7 Test Address');
		driver.findElement(By.xpath(xpath.post_job.employer_info.city)).sendKeys('Test City');
		driver.findElement(By.xpath(xpath.post_job.employer_info.province)).sendKeys('Test Province');
		driver.findElement(By.xpath(xpath.post_job.employer_info.zip)).sendKeys('Test Zip')
		testWaitForXpath(xpath.post_job.employer_info.next);
		driver.findElement(By.xpath(xpath.post_job.employer_info.next)).click();
		testWaitForXpath(xpath.post_job.job_description.info_text);
		expect(driver.findElement(By.xpath(xpath.post_job.job_description.info_text)).getAttribute('innerText')).to.eventually.equal('Job Category');
		if (cb)  cb();
	}

	testMethods.prototype.fillInValidJobDescription = function (cb) {
		testMsg('Fill in Valid JobDescription');
		testWaitForXpath(xpath.post_job.job_description.title)
		driver.findElement(By.xpath(xpath.post_job.job_description.title)).sendKeys('Test Title');
		driver.findElement(By.xpath(xpath.post_job.job_description.description)).sendKeys('Test Description');
		testWaitForXpath(xpath.post_job.job_description.next);
		driver.findElement(By.xpath(xpath.post_job.job_description.next)).click();
		testWaitForXpath(xpath.post_job.photo.info_text) // choose file button
		expect(driver.findElement(By.xpath(xpath.post_job.photo.info_text)).getAttribute('innerText')).to.eventually.equal('Please add an image to your job posting');
		if (cb) cb();
	}

	testMethods.prototype.uploadValidPhoto = function (cb) {
		//make sure you have the picture
		testMsg('Upload a valid photo');
		testWaitForXpath(xpath.post_job.photo.choose_file);
		driver.findElement(By.xpath(xpath.post_job.photo.choose_file)).click()
		driver.switchTo().frame(driver.findElement(By.id('filepicker_dialog')));
		testWaitForXpath('//*[@id="ng-app"]/body/div/div[2]/div[2]/div/section/div/div/button',10000)
		driver.findElement(By.xpath('//*[@id="ng-app"]/body/div/div[2]/div[2]/div/section/div/div/button')).click()
		.then(function () {
			robot.moveMouse(1000,300);//go to download folder
			robot.mouseClick();//click on download
			robot.typeString("bigsmall");//enter file name
			robot.keyTap('enter');//upload
			sleep.sleep(5);
			testWaitForXpath('//*[@id="ng-app"]/body/div/div[2]/div[2]/div/div[2]/button[2]');//save button
			driver.findElement(By.xpath('//*[@id="ng-app"]/body/div/div[2]/div[2]/div/div[2]/button[2]')).click();
			testWaitForXpath('//*[@id="cover_image"]');
			testWaitForXpath('//*[@id="next"]/a',8000);
			driver.findElement(By.xpath('//*[@id="next"]/a')).click();
			testWaitForXpath('//*[@id="tab4"]/div/div[1]/h3');
			testWaitForXpath('//*[@id="wizardForm"]/div/ul/li[3]/input',5000)//submit button
			expect(driver.findElement(By.xpath('//*[@id="tab4"]/div/div[1]/h3')).getAttribute('innerText')).to.eventually.equal('Required Fields');
			if (cb) cb();
		})
	}

	testMethods.prototype.checkAllRequiredField = function (cb) {
		testMsg('Check all required field');
		testWaitForXpath('//*[@id="require_video"]');
		driver.findElement(By.xpath('//*[@id="require_video"]')).click();
		driver.findElement(By.xpath('//*[@id="require_objective"]')).click();
		driver.findElement(By.xpath('//*[@id="require_education"]')).click();
		driver.findElement(By.xpath('//*[@id="require_message"]')).click();
		driver.findElement(By.xpath('//*[@id="require_phone_number"]')).click();
		driver.findElement(By.xpath('//*[@id="require_work_history"]')).click();
		driver.findElement(By.xpath('//*[@id="require_availabilities"]')).click();
		driver.findElement(By.xpath('//*[@id="require_certifications"]')).click();
		testWaitForXpath('//*[@id="wizardForm"]/div/ul/li[3]/input');
		driver.findElement(By.xpath('//*[@id="wizardForm"]/div/ul/li[3]/input')).click();
		// testWaitForXpath('//*[@id="main-wrapper"]/div/div/div/div[1]',40000);
		// expect(driver.getTitle()).to.eventually.equal('Wirkn | My Jobs');
		if (cb) cb();
	}
}

module.exports.testMethods = testMethods;
module.exports.driver = driver;







