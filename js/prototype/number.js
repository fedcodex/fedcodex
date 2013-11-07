/**
 * Prototype extension. Insert commas into a number 
 * Reference: http://blog.stevenlevithan.com/archives/commafy-numbers
 * 
 * @property commafy
 * @type Number
 */
Number.method('commafy',function() { 
	return String(this).commafy(); 
});


/** 
 * Prototype extension. Ordinals: Format numbers to include "st" "nd" "rd" & "th"
 * http://davidchambersdesign.com/converting-integers-to-ordinals/
 * 
 * @property ordinal
 * @type Number
 */
Number.method('ordinal',function() {
	var n = Math.abs(this);
	if (10 < n && n < 14) {
		return this + 'th';
	}
	switch (n % 10) {
		case 1: return this + 'st';
		case 2: return this + 'nd';
		case 3: return this + 'rd';
		default: return this + 'th';
	}
});
