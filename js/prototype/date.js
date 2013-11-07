/*
 * Date.prototype.dateAdd
 *
 * Allows addition or subtraction of a date object.
 *
 * Usage: 
 *     var myDate = new Date();
 *     myDate.dateAdd('d',1);
 *     myDate.dateAdd('d',-5);
 *     
 * Available intervals: 
 *     yyyy - year			y - day of year			q - quarter
 *     m - month			w - weekday				ww - week of year
 *     d - day				h - hour				n - minute
 *     s - second			ms - millesecond
 */
Date.method('dateAdd',function(b,a){
	new String;b=b.toLowerCase();if(isNaN(a))throw"The second parameter must be a number. \n You passed: "+a;a=new Number(a);switch(b.toLowerCase()){case "yyyy":this.setFullYear(this.getFullYear()+a);break;case "q":this.setMonth(this.getMonth()+a*3);break;case "m":this.setMonth(this.getMonth()+a);break;case "y":case "d":case "w":this.setDate(this.getDate()+a);break;case "ww":this.setDate(this.getDate()+a*7);break;case "h":this.setHours(this.getHours()+a);break;case "n":this.setMinutes(this.getMinutes()+ a);break;case "s":this.setSeconds(this.getSeconds()+a);break;case "ms":this.setMilliseconds(this.getMilliseconds()+a);break;default:throw"The first parameter must be a string from this list: \nyyyy, q, m, y, d, w, ww, h, n, s, or ms. You passed: "+b;}return this
});

/**
 * <p>Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 * Documentation: http://blog.stevenlevithan.com/archives/date-time-format
 * 
 * <p>Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * <p>Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */
_dateFormat = function(){var q=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,r=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,s=/[^-+\dA-Z]/g,d=function(a,c){a=String(a);for(c=c||2;a.length<c;)a="0"+a;return a};return function(a,c,h){var f=_dateFormat;if(arguments.length==1&&Object.prototype.toString.call(a)=="[object String]"&&!/\d/.test(a)){c=a;a=undefined}a=a?new Date(a):new Date;if(isNaN(a))throw SyntaxError("invalid date"); c=String(f.masks[c]||c||f.masks["default"]);if(c.slice(0,4)=="UTC:"){c=c.slice(4);h=true}var b=h?"getUTC":"get",g=a[b+"Date"](),l=a[b+"Day"](),i=a[b+"Month"](),m=a[b+"FullYear"](),e=a[b+"Hours"](),n=a[b+"Minutes"](),o=a[b+"Seconds"]();b=a[b+"Milliseconds"]();var k=h?0:a.getTimezoneOffset(),p={d:g,dd:d(g),ddd:f.i18n.dayNames[l],dddd:f.i18n.dayNames[l+7],m:i+1,mm:d(i+1),mmm:f.i18n.monthNames[i],mmmm:f.i18n.monthNames[i+12],yy:String(m).slice(2),yyyy:m,h:e%12||12,hh:d(e%12||12),H:e,HH:d(e),M:n,MM:d(n), s:o,ss:d(o),l:d(b,3),L:d(b>99?Math.round(b/10):b),t:e<12?"a":"p",tt:e<12?"am":"pm",T:e<12?"A":"P",TT:e<12?"AM":"PM",Z:h?"UTC":(String(a).match(r)||[""]).pop().replace(s,""),o:(k>0?"-":"+")+d(Math.floor(Math.abs(k)/60)*100+Math.abs(k)%60,4),S:["th","st","nd","rd"][g%10>3?0:(g%100-g%10!=10)*g%10]};return c.replace(q,function(j){return j in p?p[j]:j.slice(1,j.length-1)})}}();
_dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};
_dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};
Date.method('dateFormat',function(mask, utc){
	return _dateFormat(this, mask, utc);
});

if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;
 
    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
 
      var result = [];
 
      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }
 
      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    }
  })()
};
