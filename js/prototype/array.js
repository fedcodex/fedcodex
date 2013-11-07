Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

/** 
 * Prototype extension.
 * 
 * @property indexOf
 * @type Array
 */
if (!Array.prototype.indexOf) {
    Array.method('indexOf',function(elt /*, from*/){
        var len = this.length;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
			from += len;
		}
        for (; from < len; from++) {
            if (this.hasOwnProperty(from) && this[from] === elt) {
				return from;
			}
        }
        return -1;
    });
}

Array.method('contains',function(value) {
	return this.indexOf(value) > -1;
});

Array.method('max',function(){
	var values = this.flatten(); /* Force into 1-dimensional array */

	values = values.map(function(o){
		if (!AG.validate.isNumeric(o)) {
			return 0;
		}
		return o;
	});

	return Math.max.apply(Math,values);
});

Array.method('min',function(){
	var values = this.flatten(); /* Force into 1-dimensional array */

	values = values.map(function(o){
		if (!AG.validate.isNumeric(o)) {
			return 0;
		}
		return o;
	});

	return Math.min.apply(Math,values);
});

Array.method('remove',function(from,to){
	/* http://ejohn.org/blog/javascript-array-remove/ */
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
});

if (!Array.prototype.map) {
	Array.prototype.map = function(fun /*, thisp*/) {
	    var len = this.length;
	    if (typeof fun != "function") {
			throw new TypeError();
	    }
	    
	    var res = new Array(len);
	    var thisp = arguments[1];
	    for (var i = 0; i < len; i++) {
			if (i in this) {
				res[i] = fun.call(thisp, this[i], i, this);
			}
	    }
	
		return res;
	};
}



function flatten(arr, arrOut) {
	if (typeof arrOut === 'undefined') {
		var arrOut = [];
	}
		
	if (AG.validate.isArray(arr)) {
		/* Loop through each array value */
		for(var i = 0; i < arr.length; i++) {
			/* Check to see if there's a sub-array */
			if (AG.validate.isArray(arr[i])) {
				arrOut = flatten(arr[i], arrOut);
			} else {
				//push the value onto the existing array
				arrOut.push(arr[i]);
			}
		}
	}
	return arrOut;
}


Array.method('flatten',function(){
	return flatten(this);
});
