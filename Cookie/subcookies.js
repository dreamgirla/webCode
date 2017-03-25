var CookieUtil = {
	get: function(name,subName){
		var subCookies = this.getAll(name);
		    if (subCookies) {
		      return subCookies[subName];
		}else{
			return null;
		}

	}
	getAll:function(name){
		var cookieName = encodURIComponent(name) + "="
			cookieStart document.cookie.indexOf(cookieName),
			cookieValue = null,
			cookieEnd,
			subCookies,
			i,
			parts,
			result = {};

			if (cookieStart > -1) {
				cookieEnd = document.cookie.indexOf(";",cookieStart);
				if (cookieEnd == -1) {
					cookieEnd = document.cookie.length;
				};
				cookieValue = document.cooki.substring(cookieStart +cookieName.length,cookieEnd);
				if (cookieValue.length>0) {
					subCookies = cookieValue.split("&");
					for(i=0,len=subCookies.length;i<len;i++){
						parts = subCookies[i].split("=");
						result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
					}
					return result;
				};
			};
			return null;
	}
}
var SubCookieUntil = {
	set:function(name,subName,value,expries,path,domain,secure){
		var subCookies = this.getAll(name) || {};
		subCookies[subName] = value;
		this.setAll(name,subCookies,expries,path,domain,secure);
	},
	setAll:function(name,subCookies,expries,path,domain,secure){
		var cookieText = encodURIComponent(name) + "=",
		subcookieParts = new Array(),
		subName;

		for(subName in subCookies){
			if (subName.length>0 && subCookies.hasOwnProperty(subName)) {
				subcookieParts.push(encodURIComponent(subName)+"="+
					encodURIComponent(subCookies[subName]));
			};
		}
		if (cookiePart.length>0) {
			cookieText += subcookieParts.join("&"); 
		};
		if (expries instanceof Date) {
			cookieText += "; expries=" +expries.toGMTString();
		};
		if (path) {
			cookieText += ";path=" +path;
		};
		if (domain) {
			cookieText +="; domain" +domain;
		};
		if (secure) {
			cookieText += "; secure";
		};
	}else{
		cookieText +=";expries=" +(new Date(0)).toGMTString();
	}
	document.cookie = cookieText;
}

var SubCookieUntil={
	unset:function(name,subName,path,domain,secure){
		var subCookies = this.getAll(name);
		if (subCookies) {
			delete subCookies[subName];
			this.setAll(name,subCookies,null,path,domain,secure);
		};
	}
	unsetAll:function(name,path,domain,secure){
		this.setAll(name,null,new Date(0),path,domain,secure);
	}
}