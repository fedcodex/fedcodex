/*jshint smarttabs: true, supernew: true */
/*global AG */

/** 
 * @namespace
 */
AG.validate = new function() {
	/** 
	 * Reference: http://documentcloud.github.com/underscore/underscore.js 
	 * 
	 * @public
	 * It returns a Boolean of True or False
	 */
	this.isArray = function(obj) {
		return !!(obj && obj.concat && obj.unshift && !obj.callee);
	};
	
	/** 
	 * Reference: http://documentcloud.github.com/underscore/underscore.js 
	 * 
	 * @public
	 * It returns a Boolean of True or False
	 */
	this.isDate = function(obj) {
		return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear && obj !== 'Invalid Date');
	};

	/**
	 * Reference: http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
	 * 
	 * @public
	 * It returns a Boolean of True or False
	 */
	this.isNumeric = function(str) {
		return !isNaN(parseFloat(str)) && isFinite(str);
	};
	
	/** 
	 * Reference: http://mattsnider.com/javascript/type-detection/
	 * 
	 * @public
	 * It returns a Boolean of True or False
	 */
	this.isBoolean = function(o) {
		return 'boolean' === typeof o;
	};
		
	/** 
	 * Test for variations of hex code formats. 
	 *    Strict: #ffffff
	 *    Loose: fff, ffffff, #fff, #ffffff
	 * 
	 * @public
	 * It returns a Boolean of True or False
	 */
	this.isHexCode = function(str, strict){
		var regExpEasy = (/^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/); /* This particular regular expression takes 3 or 6 chars and an optional hash */
		var regExpStrict = (/^(#)([0-9a-fA-F]{6})$/); /* This expression requires that one must enter 6 chars and include a hash */
		if (!AG.validate.isBoolean(strict)) {
			strict = true; /* Default to strict */
		}
		
		if (strict) {
			return regExpStrict.test(str);
		}
		else {
			return regExpEasy.test(str);
		}
	};
	
	/**
	 * Tests a string that is formatted for email
	 * @public
	 * It returns a Boolean of True or False
	 */
	this.isEmail = function(str) {
		return (/^[a-zA-Z][\w\.\-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.\-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]{0,4}[a-zA-Z]$/).test(str);
	};

	/**
	 * Determine whether or not an object or string has content
	 * 
	 * @public
	 * It returns a Boolean of True or False
	 */
	this.isEmpty = function(o) {
		if (typeof o === 'string') {
			if (o.length === 0) { 
				return true;
			} else {
				return false;
			}
		}
		for(var p in o) {
			if (o[p] !== o.constructor.prototype[p]) {
				return false;
			}
		}
		return true;
	}; // END isEmpty
	
	/*
	 * Tests a string formatted for credit card input
	 * @public
	 * It returns a Boolean of True or False
	 */
	this.isCreditCard = function(str) {
		var CC = str.trim(); // This removes whitespace that would inhibit validation
		
		var sum = 0,
			mul = 1,
			tproduct = 0,
			len = CC.length,
			i = 0,
			digit = 0;
			
		if (len < 14 || len > 16) {
			return false;
		}
	
		for (i = 0; i < len; i++) {
			digit = CC.substring(len - i - 1, len - i);
			tproduct = parseInt(digit, 10) * mul;
			if (tproduct >= 10) { sum += (tproduct % 10) + 1; }
			else { sum += tproduct; }
			if (mul === 1) {
				mul++;
			}
			else {
				mul--;
			}
		}
		if ((sum % 10) === 0) {
			return true;
			}
		else {
			return false;
		}
	};
	
}; // END AG.ui
