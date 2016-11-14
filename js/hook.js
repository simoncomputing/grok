
var rawOpen = XMLHttpRequest.prototype.open;

XMLHttpRequest.prototype.open = function() {
	if (!this._hooked) {
		this._hooked = true;
		setupHook(this);
	}
	rawOpen.apply(this, arguments);
}

function setupHook(xhr) {
	function getter() {
  
  		delete xhr.responseText;
  		var ret = xhr.responseText;
  		setup();
  
    console.log(xhr.responseURL); 
  
      if (xhr.responseURL && xhr.responseURL.includes("main.ts")) {
  var myVariable = '/* yay */ import { platformBrowserDynamic } from \'@angular\/platform-browser-dynamic\';\n\nimport { AppModule } from \'.\/app.module\';\n\nplatformBrowserDynamic().bootstrapModule(AppModule);';
        return myVariable;
      } else if (xhr.responseURL && xhr.responseURL.includes("app.component.html")) {
        
        var myVariable = '<!'+'-- main app container --'+'>\n<div class=\"jumbotron\">\n    <div class=\"container\">\n        <div class=\"col-sm-8 col-sm-offset-2\">\n            <router-outlet><\/router-outlet>\n        <\/div>\n    <\/div>\n<\/div>\n\n<h1> BOO YAH <\/h1>';
        return myVariable;
      } 
      

		return ret;
	}
 
	function setter(str) {
		console.log('set responseText: %s', str);
	}

  function getStat() {
    return 200;
  }

	function setup() {
		Object.defineProperty(xhr, 'responseText', {
			get: getter,
			set: setter,
			configurable: true
		});
		Object.defineProperty(xhr, 'response', {
			get: getter,
			set: setter,
			configurable: true
		});
		Object.defineProperty(xhr, 'status', {
			get: getStat,
			set: setter,
			configurable: true
		});
	}
	setup();
}

