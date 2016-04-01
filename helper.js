var webdriver = require('selenium-webdriver'),
	By = require('selenium-webdriver').By,
	until = require('selenium-webdriver').until,
	Key = require('selenium-webdriver').Key
	driver = require("./driver").driver;

var helper = {};

helper.testWaitForXpath = function (path,ext) {
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

helper.testWaitForText = function (path,text) {
	helper.testWaitForXpath(path);
	driver.findElement(By.xpath(path))
	.then(function (element) {
	driver.wait(until.elementTextIs(element, text));
	})
}


helper.repeatcall = function (fn,time) {
	for(var i = 0; i < time; i++){
		fn();
	}
}

helper.isDateGreater = function (curdate,predate) {
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

module.exports.helper = helper;