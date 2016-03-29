require('chromedriver');
var webdriver = require('selenium-webdriver'),
	By = require('selenium-webdriver').By,
	until = require('selenium-webdriver').until,
	Key = require('selenium-webdriver').Key
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

function repeatcall (fn,time) {
	for(var i = 0; i < time; i++){
		fn();
	}
}

function isDateGreater (curdate,predate) {
	var cur = curdate.split(' ');
	var curMonth = cur[0];
	var curDay = cur[1];
	curDay = curDay.substring(0,curDay.length - 1);
	var curYear = parseInt(cur[2],10);
	var pre = predate.split(' ');
	var preMonth = pre[0];
	var preDay = pre[1];
	preDay = preDay.substring(0,preDay.length - 1);
	var preYear = parseInt(pre[2],10);
	var months = ['JANUARY','FEBURARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
	if (curYear > preYear) {
		console.log('current year is bigger')
		return true;
	} else if (curYear < preYear) {
		console.log('current year is smaller')
		return false;
	} else {
		if (months.indexOf('curMonth') > months.indexOf('preMonth')) {
			console.log('current month is bigger')
			return true;
		} else if (months.indexOf('curMonth') < months.indexOf('preMonth')) {
			console.log('current month is smaller')
			return false;
		} else {
			if (curDay > preDay) {
				console.log('current day is bigger')
				return true;
			} else if (curDay < preDay) {
				console.log('current day is smaller')
				return false;
			} else {
				return true;
			}
		}
	}
}

function testMethods () {
	
	testMethods.prototype.goLogIn = function (cb) {
		testMsg('Go Log In page');
		driver.manage().deleteAllCookies();
		driver.get('http://devapp.wirkn.com')
		.then(function () {
		robot.moveMouse(300,1000);
		robot.mouseClick();
		})
		driver.wait(until.elementLocated(By.name('commit')));
		expect(driver.getTitle()).to.eventually.equal('Wirkn | Log In')
		if (cb) cb();
	} 

	testMethods.prototype.logInWithEmptyPassword = function (cb) {
		testMsg('Log In with empty password');
		driver.wait(until.elementLocated(By.name('commit')));
		driver.findElement(By.name('email')).sendKeys('eric@tan.com');
		driver.findElement(By.name('commit')).click()
		.then(function () {
			expect(driver.getTitle()).to.eventually.equal('Wirkn | Log In');
			if (cb) cb();
		})
	}

	testMethods.prototype.logInWithWrongPassword = function (cb) {
		testMsg('Log In with Wrong password');
		driver.wait(until.elementLocated(By.name('commit')));
		driver.findElement(By.name('email')).sendKeys('eric@tan.com');
		driver.findElement(By.name('password')).sendKeys('wrongpassword');
		driver.findElement(By.name('commit')).click()
		.then(function () {
			expect(driver.getTitle()).to.eventually.equal('Wirkn | Log In');
			if (cb) cb();
		})
	}

	testMethods.prototype.validLogIn = function (cb) {
		testMsg('Log In');
		driver.wait(until.elementLocated(By.name('commit')));
		driver.findElement(By.name('email')).sendKeys('eric@tan.com');
		driver.findElement(By.name('password')).sendKeys('password');
		driver.findElement(By.name('commit')).click()
		.then(function () {
			expect(driver.getTitle()).to.eventually.equal('Wirkn | Applications');
			if (cb) cb();
		})
	}

	testMethods.prototype.changeAppStatus = function (status,cb) {
		testMsg('change application status')
		testWaitForXpath(xpath.applications.status.button);
		driver.findElement(By.xpath(xpath.applications.status.button)).click()
		.then(function () {
			testWaitForXpath('//*[@id=\"main-wrapper\"]/div/div/div/div[2]/div[4]/table/tbody/tr[1]/td[5]/div/ul/li[1]/a');
			var tapDown = function () {
				robot.keyTap('down');
			}
			switch(status) {
				case 'active':
				repeatcall(tapDown,1)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(xpath.applications.status.text)).getAttribute('innerText')).to.eventually.equal('ACTIVE');
				if (cb) cb();
				break;

				case 'called':
				repeatcall(tapDown,2)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(xpath.applications.status.text)).getAttribute('innerText')).to.eventually.equal('CALLED');
				if (cb) cb();
				break;
				
				case 'emailed':
				repeatcall(tapDown,3)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(xpath.applications.status.text)).getAttribute('innerText')).to.eventually.equal('EMAILED');
				if (cb) cb();
				break;
				
				case 'interview 1':
				repeatcall(tapDown,4)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(xpath.applications.status.text)).getAttribute('innerText')).to.eventually.equal('INTERVIEW 1');
				if (cb) cb();
				break;
				case 'interview 2':
				repeatcall(tapDown,5)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(xpath.applications.status.text)).getAttribute('innerText')).to.eventually.equal('INTERVIEW 2');
				if (cb) cb();
				break;
				
				case 'interview 3':
				repeatcall(tapDown,6)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(xpath.applications.status.text)).getAttribute('innerText')).to.eventually.equal('INTERVIEW 3');
				if (cb) cb();
				break;
				
				case 'pre screened':
				repeatcall(tapDown,7)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(xpath.applications.status.text)).getAttribute('innerText')).to.eventually.equal('PRE SCREENED');
				if (cb) cb();
				break;
				
				case 'wrong fit':
				repeatcall(tapDown,8)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(xpath.applications.status.text)).getAttribute('innerText')).to.eventually.equal('WRONG FIT');
				if (cb) cb();
				break;
				
				case 'offered':
				repeatcall(tapDown,9)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(xpath.applications.status.text)).getAttribute('innerText')).to.eventually.equal('OFFERED');
				if (cb) cb();
				break;
				
				case 'hired':
				repeatcall(tapDown,10)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(xpath.applications.status.text)).getAttribute('innerText')).to.eventually.equal('HIRED');
				if (cb) cb();
				break;
			}
		})
	}

	testMethods.prototype.applicationsSortedByDate = function (cb) {
		testWaitForXpath(xpath.applications.dates[0]);
		var result = true;
		driver.findElement(By.xpath(xpath.applications.dates[0])).getText()
		.then(function (previousDate) {
			for(var date in (xpath.applications.dates)) {
				var curXpath = xpath.applications.dates[date];
				 driver.findElement(By.xpath(curXpath)).getText()
				.then(function (curdate) {
					if(isDateGreater(curdate,previousDate)) {
						result = false;
					}
				})
			}
			expect(result).to.equal(true);
			if (cb) cb();
		})
	}

	testMethods.prototype.goViewJobs = function (cb) {
		testWaitForXpath(xpath.jobs_button);
		driver.findElement(By.xpath(xpath.jobs_button)).click()
		.then(function () {
			sleep.sleep(5);
			testWaitForXpath(xpath.jobs.info_text);
			expect(driver.getTitle()).to.eventually.equal('Wirkn | My Jobs')
			if (cb) cb();
		})
	}

	testMethods.prototype.editJob = function (cb) {
		testWaitForXpath(xpath.jobs.actions);
		driver.findElement(By.xpath(xpath.jobs.actions)).click()
		.then(function () {
			robot.keyTap('down');
			robot.keyTap('enter');
			testWaitForXpath(xpath.post_job.employer_info.name);
			expect(driver.getTitle()).to.eventually.equal('Wirkn | Edit Job')
			if (cb) cb();
		})
	}

	testMethods.prototype.goPostJob = function (cb) {
		testMsg('Go Post Job page');
		testWaitForXpath(xpath.post_button)//post button
		driver.findElement(By.xpath(xpath.post_button)).click()//post button
		.then(function () {
			testWaitForXpath(xpath.post_job.employer_info.name);
			expect(driver.getTitle()).to.eventually.equal('Wirkn | New Job');
			if (cb) cb();
		})
	}

	testMethods.prototype.fillInValidEmployerInfo = function (cb) {
		testMsg('Fill in Valid EmployerInfo');
		testWaitForXpath('//*[@id="business_name"]');
		driver.findElement(By.xpath(xpath.post_job.employer_info.name)).sendKeys('Test Business');
		driver.findElement(By.xpath(xpath.post_job.employer_info.address)).sendKeys('7 Test Address');
		driver.findElement(By.xpath(xpath.post_job.employer_info.city)).sendKeys('Test City');
		driver.findElement(By.xpath(xpath.post_job.employer_info.province)).sendKeys('Test Province');
		driver.findElement(By.xpath(xpath.post_job.employer_info.zip)).sendKeys('Test Zip')
		.then(function () {
			testWaitForXpath(xpath.post_job.employer_info.next);
			driver.findElement(By.xpath(xpath.post_job.employer_info.next)).click()
			.then(function () {
				testWaitForXpath(xpath.post_job.job_description.info_text);
				expect(driver.findElement(By.xpath(xpath.post_job.job_description.info_text)).getAttribute('innerText')).to.eventually.equal('Title or Position');
				if (cb)  cb();
			})
		})
	}

	testMethods.prototype.fillInValidJobDescription = function (cb) {
		testMsg('Fill in Valid JobDescription');
		testWaitForXpath(xpath.post_job.job_description.title);
		testWaitForXpath(xpath.post_job.job_description.next);
		driver.findElement(By.id('title')).sendKeys('Test Title');
		testWaitForXpath(xpath.post_job.job_description.description);
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
		driver.switchTo().frame(driver.findElement(By.xpath(xpath.post_job.upload_frame.frame)));
		testWaitForXpath(xpath.post_job.upload_frame.choose_file,10000)
		driver.findElement(By.xpath(xpath.post_job.upload_frame.choose_file)).click()
		.then(function () {
			robot.moveMouse(1000,300);//go to download folder
			robot.mouseClick();//click on download
			robot.typeString("bigsmall");//enter file name
			robot.keyTap('enter');//upload
			sleep.sleep(5);
			testWaitForXpath(xpath.post_job.upload_frame.save,8000);//save button
			driver.findElement(By.xpath(xpath.post_job.upload_frame.save)).click();
			// testWaitForXpath('//*[@id="cover_image"]');
			testWaitForXpath(xpath.post_job.photo.next,8000);
			driver.findElement(By.xpath(xpath.post_job.photo.next)).click();
			testWaitForXpath(xpath.post_job.required_fields.info_text);
			testWaitForXpath('//*[@id="wizardForm"]/div/ul/li[3]/input',5000)//submit button
			expect(driver.findElement(By.xpath(xpath.post_job.required_fields.info_text)).getAttribute('innerText')).to.eventually.equal('Required Fields');
			if (cb) cb();
		})
	}

	testMethods.prototype.checkAllRequiredField = function (cb) {
		testMsg('Check all required field');
		testWaitForXpath(xpath.post_job.required_fields.video);
		driver.findElement(By.xpath(xpath.post_job.required_fields.video)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.objective)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.education)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.message)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.number)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.work_history)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.availabilities)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.certifications)).click()
		.then(function () {
			testWaitForXpath(xpath.post_job.required_fields.submit);
			driver.findElement(By.xpath(xpath.post_job.required_fields.submit)).click();
			testWaitForXpath('//*[@id="main-wrapper"]/div/div/div/div[1]',4000);
			expect(driver.getTitle()).to.eventually.equal('Wirkn | My Jobs');
			if (cb) cb();
		})
	}
}

module.exports.testMethods = testMethods;
module.exports.driver = driver;








