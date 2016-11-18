/* load editor, set theme, and insert default text */

var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;
editor.session.setOption("useWorker", false)
editor.setTheme("ace/theme/tomorrow");
editor.getSession().setMode("ace/mode/html");

var ch0 = '<!DOCTYPE html>\n<html>\n   <style>\n      #myContainer {\n        width: 400px;\n        height: 400px;\n        position: relative;\n        background: firebrick;\n        border-radius: 25px;\n      }\n      #myAnimation {\n        width: 50px;\n        height: 50px;\n        position: absolute;\n        background-color: white;\n        border-radius: 25px;\n        top: -1px;\n        left: -1px;\n      }\n   <\/style>\n   <!'+'-- Load any external files you like, CSS, JS, etc. --'+'>\n    <link rel=\"stylesheet\" \n    href=\"https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/3.3.7\/css\/bootstrap.min.css\"> \n    \n   <body>\n      <p>\n         <button class=\"btn btn-default\" onclick=\"myMove()\">Click Me<\/button>\n      <\/p>\n      <div id =\"myContainer\">\n         <div id =\"myAnimation\"><\/div>\n      <\/div>\n      \n      <script>\n         function myMove() {\n           var elem = document.getElementById(\"myAnimation\");\n           var pos = 0;\n           var id = setInterval(frame, 10);\n           function frame() {\n             if (pos == 352) {\n               clearInterval(id);\n             } else {\n               pos++;\n               elem.style.top = pos - 1 + \'px\';\n               elem.style.left = pos - 1 + \'px\';\n             }\n           }\n         }\n      <\/script>\n      \n      <!'+'-- TypeScript works too! --'+'>\n      <script type=\"text\/typescript\">\n            class Hello { \n                name: string; \n                gold: number; \n                \n                wha() { \n                    this.name = \'Mack\'; \n                } \n            } \n            \n            let greeting = new Hello(); \n            greeting.wha(); \n            document.writeln(\'<br><h3>Hello, \' + greeting.name + \'!<\/h3>\');\n      <\/script>\n   <\/body>\n<\/html>';
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
      childDoc.write(editor.getValue());
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
