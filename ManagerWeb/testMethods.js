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
	helper = require("../helper").helper;
	driver = require("../driver").driver;
	
	chai.use(chai_p);
	expect = chai.expect;




function testMethods () {
	testMethods.prototype.goLogIn = function (cb) {
		driver.manage().deleteAllCookies();
		driver.get('http://devapp.wirkn.com')
		driver.wait(until.elementLocated(By.name('commit')));
		expect(driver.getTitle()).to.eventually.equal('Wirkn | Log In')
		if (cb) cb();
	} 

	testMethods.prototype.logInWithEmptyPassword = function (cb) {
		driver.wait(until.elementLocated(By.name('commit')));
		driver.findElement(By.name('email')).sendKeys('eric@tan.com');
		driver.findElement(By.name('commit')).click()
		.then(function () {
			expect(driver.getTitle()).to.eventually.equal('Wirkn | Log In');
			if (cb) cb();
		})
	}

	testMethods.prototype.logInWithWrongPassword = function (cb) {
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
		driver.wait(until.elementLocated(By.name('commit')));
		driver.findElement(By.name('email')).sendKeys('eric@tan.com');
		driver.findElement(By.name('password')).sendKeys('password');
		driver.findElement(By.name('commit')).click()
		.then(function () {
			expect(driver.getTitle()).to.eventually.equal('Wirkn | Applications');
			if (cb) cb();
		})
	}

	testMethods.prototype.changeAppStatus = function (status,page,cb) {
		if(page === 'list') {
			var button = xpath.applications.status.button;
			var text = xpath.applications.status.text;
			var first_option = xpath.applications.status.first_option;
		} else {
			var button = xpath.application.status.button;
			var text = xpath.application.status.text;
			var first_option = xpath.application.status.first_option;
		}
		helper.testWaitForXpath(button);
		driver.findElement(By.xpath(button)).click()
		.then(function () {
			helper.testWaitForXpath(first_option);

			var tapDown = function () {
				robot.keyTap('down');
			}
			switch(status) {
				case 'active':
				helper.repeatcall(tapDown,1)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(text)).getAttribute('innerText')).to.eventually.equal('ACTIVE');
				if (cb) cb();
				break;

				case 'called':
				helper.repeatcall(tapDown,2)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(text)).getAttribute('innerText')).to.eventually.equal('CALLED');
				if (cb) cb();
				break;
				
				case 'emailed':
				helper.repeatcall(tapDown,3)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(text)).getAttribute('innerText')).to.eventually.equal('EMAILED');
				if (cb) cb();
				break;
				
				case 'interview 1':
				helper.repeatcall(tapDown,4)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(text)).getAttribute('innerText')).to.eventually.equal('INTERVIEW 1');
				if (cb) cb();
				break;
				case 'interview 2':
				helper.repeatcall(tapDown,5)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(text)).getAttribute('innerText')).to.eventually.equal('INTERVIEW 2');
				if (cb) cb();
				break;
				
				case 'interview 3':
				helper.repeatcall(tapDown,6)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(text)).getAttribute('innerText')).to.eventually.equal('INTERVIEW 3');
				if (cb) cb();
				break;
				
				case 'pre screened':
				helper.repeatcall(tapDown,7)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(text)).getAttribute('innerText')).to.eventually.equal('PRE SCREENED');
				if (cb) cb();
				break;
				
				case 'wrong fit':
				helper.repeatcall(tapDown,8)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(text)).getAttribute('innerText')).to.eventually.equal('WRONG FIT');
				if (cb) cb();
				break;
				
				case 'offered':
				helper.repeatcall(tapDown,9)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(text)).getAttribute('innerText')).to.eventually.equal('OFFERED');
				if (cb) cb();
				break;
				
				case 'hired':
				helper.repeatcall(tapDown,10)
				robot.keyTap('enter');
				expect(driver.findElement(By.xpath(text)).getAttribute('innerText')).to.eventually.equal('HIRED');
				if (cb) cb();
				break;
			}
		})
	}

	testMethods.prototype.applicationsSortedByDate = function (cb) {
		helper.testWaitForXpath(xpath.applications.dates[0]);
		var result = true;
		driver.findElement(By.xpath(xpath.applications.dates[0])).getText()
		.then(function (previousDate) {
			for(var date in (xpath.applications.dates)) {
				var curXpath = xpath.applications.dates[date];
				 driver.findElement(By.xpath(curXpath)).getText()
				.then(function (curdate) {
					if(helper.isDateGreater(curdate,previousDate)) {
						result = false;
					}
				})
			}
			expect(result).to.equal(true);
			if (cb) cb();
		})
	}

	testMethods.prototype.markApplicationUnreadOrRead = function (cb) {
		if (driver.isElementPresent(webdriver.By.xpath(xpath.applications.red_dot))) {
			console.log('turning off');
			helper.testWaitForXpath(xpath.applications.actions.button);
			driver.findElement(By.xpath(xpath.applications.actions.button)).click()
			.then(function () {
				helper.repeatcall(function () {
				robot.keyTap('down');
				},4);
				robot.keyTap('enter');
				helper.testWaitForXpath(xpath.applications.image);
				sleep.sleep(4);
				expect(driver.isElementPresent(webdriver.By.xpath(xpath.applications.red_dot))).to.eventually.equal(false);
				if (cb) cb();
			})
		} else {
			helper.testWaitForXpath(xpath.applications.actions.button);
			driver.findElement(By.xpath(xpath.applications.actions.button)).click()
			.then(function () {
				console.log('turning on');
				helper.repeatcall(function () {
				robot.keyTap('down');
				},4);
				robot.keyTap('enter');
				helper.testWaitForXpath(xpath.applications.red_dot);
				sleep.sleep(4);
				expect(driver.isElementPresent(webdriver.By.xpath(xpath.applications.red_dot))).to.eventually.equal(true);
				if (cb) cb();
			})
		}
	}

	testMethods.prototype.goApplicationDetail = function (cb) {
		helper.testWaitForXpath(xpath.application_button);
		driver.findElement(By.xpath(xpath.application_button)).click()
		.then(function () {
			helper.testWaitForXpath(xpath.application.applicant_name);
			driver.findElement(By.xpath(xpath.application.applicant_name)).getAttribute('innerText')
			.then(function (name) {
				expect(driver.getTitle()).to.eventually.equal('Wirkn | ' + name);
				if (cb) cb();
			})
		})
	}


	testMethods.prototype.editApplicationNote = function (cb) {
		helper.testWaitForXpath(xpath.application.note.box);
		driver.findElement(By.xpath(xpath.application.note.box)).getText()
		.then(function (preText) {
			console.log(preText);
			driver.findElement(By.xpath(xpath.application.note.box)).sendKeys('some random note');
			helper.testWaitForXpath(xpath.application.note.send);
			driver.findElement(By.xpath(xpath.application.note.send)).click()
			.then(function () {
				console.log(preText);
				sleep.sleep(3);
				helper.testWaitForXpath(xpath.application.note.box);
				expect(driver.findElement(By.xpath(xpath.application.note.box)).getText()).to.eventually.equal(preText + 'some random note');
				if (cb) cb();
			})
		})
	}

	testMethods.prototype.goViewJobs = function (cb) {
		helper.testWaitForXpath(xpath.jobs_button);
		driver.findElement(By.xpath(xpath.jobs_button)).click()
		.then(function () {
			sleep.sleep(5);
			// helper.testWaitForXpath(xpath.jobs.info_text);
			helper.testWaitForText(xpath.jobs.info_text,'Jobs');
			expect(driver.getTitle()).to.eventually.equal('Wirkn | My Jobs');
			if (cb) cb();
		})
	}

	testMethods.prototype.goViewApplications = function (cb) {
		helper.testWaitForXpath(xpath.applications_button);
		driver.findElement(By.xpath(xpath.applications_button)).click()
		.then(function () {
			sleep.sleep(5);
			helper.testWaitForText(xpath.applications.info_text,'Applications')
			expect(driver.getTitle()).to.eventually.equal('Wirkn | Applications');
			if (cb) cb();
		})
	}

	testMethods.prototype.editJob = function (cb) {
		helper.testWaitForXpath(xpath.jobs.actions);
		driver.findElement(By.xpath(xpath.jobs.actions)).click()
		.then(function () {
			robot.keyTap('down');
			robot.keyTap('enter');
			helper.testWaitForXpath(xpath.post_job.employer_info.name);
			expect(driver.getTitle()).to.eventually.equal('Wirkn | Edit Job')
			if (cb) cb();
		})
	}

	testMethods.prototype.goShareApplication = function (cb) {
		helper.testWaitForXpath(xpath.applications.actions.button);
		driver.findElement(By.xpath(xpath.applications.actions.button)).click()
		.then(function () {
			helper.repeatcall(function () {
				robot.keyTap('down');
			},2)
			robot.keyTap('enter');
			helper.testWaitForXpath(xpath.applications.actions.share_application.info_text);
			expect(driver.findElement(By.xpath(xpath.applications.actions.share_application.info_text)).getAttribute('innerText')).to.eventually.equal('Share Application');
			if (cb) cb();
		})
	}

	testMethods.prototype.shareApplication = function (address,cb) {
		helper.testWaitForXpath(xpath.applications.actions.share_application.send);
		driver.findElement(By.xpath(xpath.applications.actions.share_application.name)).sendKeys('WirknQA');
		driver.findElement(By.xpath(xpath.applications.actions.share_application.email)).sendKeys(address);
		driver.findElement(By.xpath(xpath.applications.actions.share_application.send)).click()
		.then(function () {
		if (cb) cb();
		})
	}


	testMethods.prototype.goPostJob = function (cb) {
		helper.testWaitForXpath(xpath.post_button)
		driver.findElement(By.xpath(xpath.post_button)).click()
		.then(function () {
			helper.testWaitForXpath(xpath.post_job.employer_info.name);
			expect(driver.getTitle()).to.eventually.equal('Wirkn | New Job');
			if (cb) cb();
		})
	}

	testMethods.prototype.fillInValidEmployerInfo = function (cb) {
		helper.testWaitForXpath('//*[@id="business_name"]');
		driver.findElement(By.xpath(xpath.post_job.employer_info.name)).sendKeys('Test Business');
		driver.findElement(By.xpath(xpath.post_job.employer_info.address)).sendKeys('1 yonge street');
		driver.findElement(By.xpath(xpath.post_job.employer_info.city)).sendKeys('Test City');
		driver.findElement(By.xpath(xpath.post_job.employer_info.province)).sendKeys('Test Province');
		driver.findElement(By.xpath(xpath.post_job.employer_info.zip)).sendKeys('Test Zip')
		.then(function () {
			helper.testWaitForXpath(xpath.post_job.employer_info.next);
			driver.findElement(By.xpath(xpath.post_job.employer_info.next)).click()
			.then(function () {
				helper.testWaitForXpath(xpath.post_job.job_description.info_text);
				expect(driver.findElement(By.xpath(xpath.post_job.job_description.info_text)).getAttribute('innerText')).to.eventually.equal('Title or Position');
				if (cb)  cb();
			})
		})
	}

	testMethods.prototype.fillInValidJobDescription = function (cb) {
		helper.testWaitForXpath(xpath.post_job.job_description.title);
		helper.testWaitForXpath(xpath.post_job.job_description.next);
		driver.findElement(By.id('title')).sendKeys('Test Title');
		helper.testWaitForXpath(xpath.post_job.job_description.description);
		driver.findElement(By.xpath(xpath.post_job.job_description.description)).sendKeys('Test Description');
		helper.testWaitForXpath(xpath.post_job.job_description.next);
		driver.findElement(By.xpath(xpath.post_job.job_description.next)).click();
		helper.testWaitForXpath(xpath.post_job.photo.info_text) // choose file button
		expect(driver.findElement(By.xpath(xpath.post_job.photo.info_text)).getAttribute('innerText')).to.eventually.equal('Please add an image to your job posting');
		if (cb) cb();
	}

	testMethods.prototype.uploadValidPhoto = function (cb) {
		//make sure you have the picture
		sleep.sleep(2);
		helper.testWaitForXpath(xpath.post_job.photo.choose_file);
		driver.findElement(By.xpath(xpath.post_job.photo.choose_file)).click()
		driver.switchTo().frame(driver.findElement(By.xpath(xpath.post_job.upload_frame.frame)));
		helper.testWaitForXpath(xpath.post_job.upload_frame.choose_file,10000)
		driver.findElement(By.xpath(xpath.post_job.upload_frame.choose_file)).click()
		.then(function () {
			sleep.sleep(2);
			// robot.moveMouse(1000,300);//go to download folder
			// robot.mouseClick();//click on download
			robot.typeString("bigsmall");//enter file name
			robot.keyTap('enter');//upload
			sleep.sleep(5);
			helper.testWaitForXpath(xpath.post_job.upload_frame.save,8000);//save button
			driver.findElement(By.xpath(xpath.post_job.upload_frame.save)).click();
			// helper.testWaitForXpath('//*[@id="cover_image"]');
			helper.testWaitForXpath(xpath.post_job.photo.next,8000);
			driver.findElement(By.xpath(xpath.post_job.photo.next)).click();
			helper.testWaitForXpath(xpath.post_job.required_fields.info_text);
			helper.testWaitForXpath('//*[@id="wizardForm"]/div/ul/li[3]/input',5000)//submit button
			expect(driver.findElement(By.xpath(xpath.post_job.required_fields.info_text)).getAttribute('innerText')).to.eventually.equal('Required Fields');
			if (cb) cb();
		})
	}

	testMethods.prototype.checkAllRequiredField = function (cb) {

		helper.testWaitForXpath(xpath.post_job.required_fields.video);
		driver.findElement(By.xpath(xpath.post_job.required_fields.video)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.objective)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.education)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.message)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.number)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.work_history)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.availabilities)).click();
		driver.findElement(By.xpath(xpath.post_job.required_fields.certifications)).click()
		.then(function () {
			helper.testWaitForXpath(xpath.post_job.required_fields.submit);
			driver.findElement(By.xpath(xpath.post_job.required_fields.submit)).click();
			helper.testWaitForXpath('//*[@id="main-wrapper"]/div/div/div/div[1]',4000);
			expect(driver.getTitle()).to.eventually.equal('Wirkn | My Jobs');
			if (cb) cb();
		})
	}
}

module.exports.testMethods = testMethods;








