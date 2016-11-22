/* load editor, set theme, and insert default text */

var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;
editor.session.setOption("useWorker", false)
editor.setTheme("ace/theme/tomorrow");
editor.getSession().setMode("ace/mode/html");

var ch0 = '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Boo Yah<\/title>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\n    <!'+'-- Polyfill(s) for older browsers --'+'>\n    <script src=\"https:\/\/unpkg.com\/core-js\/client\/shim.min.js\"><\/script>\n\n    <script src=\"https:\/\/unpkg.com\/zone.js@0.6.26\/dist\/zone.js\"><\/script>\n    <script src=\"https:\/\/unpkg.com\/reflect-metadata\/Reflect.js\"><\/script>\n    <script src=\"https:\/\/unpkg.com\/systemjs\/dist\/system.src.js\"><\/script>\n    \n    <script>\n\n(function (global) {\n  System.config({\n    paths: {\n      \/\/ paths serve as alias\n      \'npm:\': \'https:\/\/unpkg.com\/\'\n    },\n    \/\/ map tells the System loader where to look for things\n    map: {\n      \/\/ our app is within the app folder\n      app: \'app\',\n\n      \/\/ angular bundles\n      \'@angular\/core\': \'npm:@angular\/core\/bundles\/core.umd.js\',\n      \'@angular\/common\': \'npm:@angular\/common\/bundles\/common.umd.js\',\n      \'@angular\/compiler\': \'npm:@angular\/compiler\/bundles\/compiler.umd.js\',\n      \'@angular\/platform-browser\': \'npm:@angular\/platform-browser\/bundles\/platform-browser.umd.js\',\n      \'@angular\/platform-browser-dynamic\': \'npm:@angular\/platform-browser-dynamic\/bundles\/platform-browser-dynamic.umd.js\',\n      \'@angular\/http\': \'npm:@angular\/http\/bundles\/http.umd.js\',\n      \'@angular\/router\': \'npm:@angular\/router\/bundles\/router.umd.js\',\n      \'@angular\/router\/upgrade\': \'npm:@angular\/router\/bundles\/router-upgrade.umd.js\',\n      \'@angular\/forms\': \'npm:@angular\/forms\/bundles\/forms.umd.js\',\n      \'@angular\/upgrade\': \'npm:@angular\/upgrade\/bundles\/upgrade.umd.js\',\n      \'@angular\/upgrade\/static\': \'npm:@angular\/upgrade\/bundles\/upgrade-static.umd.js\',\n\n      \/\/ other libraries\n      \'rxjs\':                      \'npm:rxjs\',\n      \'angular-in-memory-web-api\': \'npm:angular-in-memory-web-api\/bundles\/in-memory-web-api.umd.js\'\n    },\n    \/\/ packages tells the System loader how to load when no filename and\/or no extension\n    packages: {\n      app: {\n        main: \'.\/main.js\',\n        defaultExtension: \'js\'\n      },\n      rxjs: {\n        defaultExtension: \'js\'\n      }\n    }\n  });\n})(this);  \n    <\/script>\n    <script>\n      System.import(\'app\').catch(function(err){ console.error(err); });\n    <\/script>\n  <\/head>\n\n  <body>\n    <my-app>Loading...<\/my-app>\n  <\/body>\n<\/html>\n';
editor.setValue(ch0, -1);

/* set up iFrame stuff */

var eyeFrame = sandbox.create();
sandbox.target.append(eyeFrame);
sandbox.use(eyeFrame);

trigger();

/* compile is triggered off of run button and Ctrl-ENTER or Mac Cmd-ENTER */

$('#run').click(trigger);

$(document).keydown(function(event) {
    if ((event.keyCode == 10 || event.keyCode == 13) && (event.ctrlKey || event.metaKey)) {
        trigger(event);
    }
});

/* triggerrr */

function trigger(event) {

    var iframe = sandbox.create();
    sandbox.use(iframe, function () {
      var childDoc = iframe.contentDocument,
          childWindow = getIframeWindow(iframe);
      if (!childDoc) childDoc = childWindow.document;

      childDoc.open();
      childDoc.write('');

      /* inject XHR hacker script */

      var el = document.createElement( 'html' );
      el.innerHTML = editor.getValue();

        var test = 'var mainjs = \'define([\\\"require\\\", \\\"exports\\\", \\\'@angular\\\/platform-browser-dynamic\\\', \\\'.\\\/app.module\\\'], function (require, exports, platform_browser_dynamic_1, app_module_1) {\\n    \\\"use strict\\\";\\n    platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);\\n});\\n\';\n\nvar appmod = \'var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\\n    if (typeof Reflect === \\\"object\\\" && typeof Reflect.decorate === \\\"function\\\") r = Reflect.decorate(decorators, target, key, desc);\\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\\n};\\ndefine([\\\"require\\\", \\\"exports\\\", \\\'@angular\\\/core\\\', \\\'@angular\\\/platform-browser\\\', \\\'.\\\/app.component\\\'], function (require, exports, core_1, platform_browser_1, app_component_1) {\\n    \\\"use strict\\\";\\n    var AppModule = (function () {\\n        function AppModule() {\\n        }\\n        AppModule = __decorate([\\n            core_1.NgModule({\\n                imports: [platform_browser_1.BrowserModule],\\n                declarations: [app_component_1.AppComponent],\\n                bootstrap: [app_component_1.AppComponent]\\n            })\\n        ], AppModule);\\n        return AppModule;\\n    }());\\n    exports.AppModule = AppModule;\\n});\\n\';\n\nvar appcmp = \'var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\\n    if (typeof Reflect === \\\"object\\\" && typeof Reflect.decorate === \\\"function\\\") r = Reflect.decorate(decorators, target, key, desc);\\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\\n};\\ndefine([\\\"require\\\", \\\"exports\\\", \\\'@angular\\\/core\\\'], function (require, exports, core_1) {\\n    \\\"use strict\\\";\\n    var AppComponent = (function () {\\n        function AppComponent() {\\n        }\\n        AppComponent = __decorate([\\n            core_1.Component({\\n                selector: \\\'my-app\\\',\\n                template: \\\"<h1>Hello Angular<\\\/h1>\\\"\\n            })\\n        ], AppComponent);\\n        return AppComponent;\\n    }());\\n    exports.AppComponent = AppComponent;\\n});\\n\';\n\nvar files = {};\n\nfiles[\"\/angular\/app\/main.js\"] = mainjs;\nfiles[\"\/angular\/app\/app.module.js\"] = appmod;\nfiles[\"\/angular\/app\/app.component.js\"] = appcmp;';


      var script = document.createElement('script');
      script.text = test + "\n" + hackXHR.toString() + "\n" + contentForUrl.toString() +  "\n" + setupHook.toString() + "\nhackXHR();";

      var head = el.getElementsByTagName('head')[0];
      head.prepend(script);

      childDoc.write(el.innerHTML);
      childDoc.close();

    });
};



/* !! compile TypeScript !! */

function transpile(source) {

    var output = transpileModule(source, {
        module: ts.ModuleKind.AMD,
        target: "ES6",
        noLib: true
    });
};

/* taken from typescript playground */

function transpileModule(input, options) {
    var inputFileName = "module.ts";
    var sourceFile = ts.createSourceFile(inputFileName, input, options.target);

    var outputText;
    var program = ts.createProgram([inputFileName], options, {
        getSourceFile: function(fileName) {
            return fileName.indexOf("module") === 0 ? sourceFile : undefined;
        },
        writeFile: function(_name, text) {
            outputText = text;
        },
        getDefaultLibFileName: function() {
            return "lib.d.ts";
        },
        useCaseSensitiveFileNames: function() {
            return false;
        },
        getCanonicalFileName: function(fileName) {
            return fileName;
        },
        getCurrentDirectory: function() {
            return "";
        },
        getNewLine: function() {
            return "\r\n";
        },
        fileExists: function(fileName) {
            return fileName === inputFileName;
        },
        readFile: function() {
            return "";
        },
        directoryExists: function() {
            return true;
        },
        getDirectories: function() {
            return [];
        }
    });

    let emitResult = program.emit();
    if (outputText === undefined) {
        throw new Error("Output generation failed");
    }

    /* 
        collect error messages and display them in ace editor 
        ... for some reason JS lib headers are not recognized 
    */

    let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    let annotations = [];

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.start != null) {
            let {
                line,
                character
            } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

            if (!message.includes('console') && !message.includes('NaN') && !message.includes('document') &&
                !message.includes('Array') && !message.includes('map') && !message.includes('push') && 
                !message.includes('A rest parameter') && !message.includes('\'length\' does not exist on type \'{') 
                && !message.includes('}\' is not an array type') && !message.includes('do not match any signature') ) {
                var anno = {
                    row: line,
                    column: character,
                    text: message,
                    type: "error"
                };
                annotations.push(anno);
            }
        }
    });

    editor.getSession().setAnnotations(annotations);

    return outputText;
}
