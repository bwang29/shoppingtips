/*
Created by Borui Wang (borui@stanford.edu)
March, 2013, KG proto
*/
function webUtil(){
	this.makeGenericGetRequest = function(targetUrl, responseFunction){	
		$.ajax({
			type: "GET",
			url: targetUrl,
			dataType: "jsonp", //jsonp or json should both be find
			timeout: 20000, // in milliseconds
			success: responseFunction,
			error: function(request, status, err) {
				console.log(err);
			}
		});
	};
	this.makeGenericPOSTRequest = function(targetUrl, postInstance, responseFunction){
		$.ajax({
			type: "POST",
			url: targetUrl,
			data: postInstance, //{name:"boriwang",ddsds:""}
			dataType: "jsonp", //jsonp or json should both be fine
			timeout: 20000, // in milliseconds
			success: responseFunction,
			error: function(request, status, err) {
				console.log(err);
			}
		});
	};
	this.parseJSONResponse = function(response){
		var jsonResponse = eval("(" + response + ")"); //ok!				
		return jsonResponse;
	};
	this.toURL = function(obj){
		str = "?";
		for(property in obj){
			str += property+"="+ escape(obj[property])+"&";
		}
		return str;
	};
	this.setCookie = function(name,value,days){
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	this.getCookie = function(name){
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	this.localURLParam = function(){
		var params = {};
		if (location.search) {
			var parts = location.search.substring(1).split('&');
			for (var i = 0; i < parts.length; i++) {
				var nv = parts[i].split('=');
				if (!nv[0]) continue;
				params[nv[0]] = nv[1] || true;
			}
		}
		return params;
	}
}


function find_similar_str(array,attr,str){
  var rtn = [];
  for(var i=0; i<array.length; i++){
    if(eval("array["+i+"]."+attr+".toLowerCase().indexOf('"+str.toLowerCase()+"') !== -1")){
      rtn.push(array[i]);
    }
  }
  return rtn;
}

function find_same_str(array,attr,str){
  var rtn = [];
  for(var i=0; i<array.length; i++){
    if(eval("array["+i+"]."+attr+" == '"+str.toLowerCase()+"'")){
      rtn.push(array[i]);
    }
  }
  return rtn;
}

function move_class_to_behind(class_name){
  var els = document.getElementsByClassName(class_name);
  for(var i=0; i<els.length; i++){
    els[i].parentNode.insertBefore(els[i],els[i].parentNode.firstChild);
  }
}

function HtmlEncode(s){
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
}

/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.1.0
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2013, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator || "";
      if ($l.wordSeparator === undefined) { separator = " "; }
      return $.trim([prefix, words, suffix].join(separator));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  // functions that can be called via $(el).timeago('action')
  // init is default when no action is given
  // functions are called with context of a single element
  var functions = {
    init: function(){
      var refresh_el = $.proxy(refresh, this);
      refresh_el();
      var $s = $t.settings;
      if ($s.refreshMillis > 0) {
        setInterval(refresh_el, $s.refreshMillis);
      }
    },
    update: function(time){
      $(this).data('timeago', { datetime: $t.parse(time) });
      refresh.apply(this);
    }
  };

  $.fn.timeago = function(action, options) {
    var fn = action ? functions[action] : functions.init;
    if(!fn){
      throw new Error("Unknown function name '"+ action +"' for timeago");
    }
    // each over objects here and call the requested function
    this.each(function(){
      fn.call(this, options);
    });
    return this;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}));


/**
 * JQuery Plug-in to check the cursor position of an input field
 */
function inputCursorEnd(element_id){
	var textInput = document.getElementById(element_id);
	var val = textInput.value;
	var isAtStart = false, isAtEnd = false;
	if (typeof textInput.selectionStart == "number") {
	    // Non-IE browsers
	    isAtStart = (textInput.selectionStart == 0);
	    isAtEnd = (textInput.selectionEnd == val.length);
	} else if (document.selection && document.selection.createRange) {
	    // IE branch
	    textInput.focus();
	    var selRange = document.selection.createRange();
	    var inputRange = textInput.createTextRange();
	    var inputSelRange = inputRange.duplicate();
	    inputSelRange.moveToBookmark(selRange.getBookmark());
	    isAtStart = inputSelRange.compareEndPoints("StartToStart", inputRange) == 0;
	    isAtEnd = inputSelRange.compareEndPoints("EndToEnd", inputRange) == 0;
	}
	return isAtEnd;
}

// init web util
var ws = new webUtil();
var root_url = "http://guarded-eyrie-9128.herokuapp.com/";
