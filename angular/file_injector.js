var _src = yew.mkdir(null, "src");

var buildCh0 = function() {
	
}

var buildCh1 = function() {
	
}

// etc.

function hackXHR() {
	var rawOpen = XMLHttpRequest.prototype.open;

	XMLHttpRequest.prototype.open = function() {
			console.log('a');
		if (!this._hooked) {
			this._hooked = true;
			setupHook(this);
		}
		rawOpen.apply(this, arguments);
	}
}


function contentForUrl(url) {

	var a = document.createElement('a');
	a.href = url;
	return files[a["pathname"]];

}

function setupHook(xhr) {

	/* this is where the magic happens */
	function getRes() {
  
  		/* no clue why this works */
  		delete xhr.responseText;
  		var ret = xhr.responseText;
  		setup();

		if(xhr.responseURL) {	
			var match;
			/* bah bop bop bop baaahhhh, I'm lovin' it */
			ret = (match = contentForUrl(xhr.responseURL)) ? match : ret;
		}

		return ret;
	}

  	function getStat() {
  		/* nothing to see here */
    	return 200;
  	}

	function setup() {
		Object.defineProperty(xhr, 'responseText', {
			get: getRes,
			configurable: true
		});
		Object.defineProperty(xhr, 'response', {
			get: getRes,
			configurable: true
		});
		Object.defineProperty(xhr, 'status', {
			get: getStat,
			configurable: true
		});
	}
	setup();
}


