
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};


/**
 * Remove all whitespace from a string.
 * http://jsperf.com/remove-whitespace/2
 * The \s syntax is used (as opposed to a literal space), 
 * so other whitespace characters are included (like tabs, newline, etc).
 * 
 * @property removeSpaces
 * @type String 
 */
String.method('removeSpaces',function() {
	return this.replace(/\s/g, "");
});

/**
 * Prototype extension. Remove whitespace from the front and back of a string. 
 * Will only extend the prototype if native trim() doesn't exist.
 * http://jsperf.com/trim-multiple-regex
 * 
 * @property trim
 * @type String
 */
if (!String.prototype.trim) {
	String.method('trim',function() {
		return this === null ? "" : this.toString().replace(/^\s+/, "").replace(/\s+$/, "");
	});
}

/**
 * Prototype extension. Insert commas into a string 
 * Reference: http://blog.stevenlevithan.com/archives/commafy-numbers
 * 
 * @property commafy
 * @type String
 */
String.method('commafy',function () {
	return this.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
		return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
	});
});


/**
 * String prototype extension. Validate if email address
 * 
 * @property isEmail
 * @type String
 */
String.method('isEmail',function () {
	return AG.validate.isEmail(this);
});
