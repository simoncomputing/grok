/* load editor, set theme, and insert default text */

var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;
editor.session.setOption("useWorker", false)
editor.setTheme("ace/theme/tomorrow");
editor.getSession().setMode("ace/mode/typescript");

var ch0 = '\/**\n *  brief overview of the TypeScript language\n **\/\n\nconst enum Color {\n    White,\n    Black,\n    Red,\n    Green,\n    Blue\n}\n\nconst enum Style {\n    Blank,\n    Solid,\n    Stripped,\n    Dotted,\n}\n\ninterface PaintJob {\n    color: Color,\n    style: Style\n}\n\nclass Vehicle {\n    location: number;\n    paintJob: PaintJob;\n    \n    constructor(job?: PaintJob) {\n        if (job) {\n            this.paintJob = {\n                color: Color.White,\n                style: Style.Blank\n            }\n        }\n    }\n    \n    move(distance: number): void {\n        this.location += distance;\n    }\n    \n    paint(job: PaintJob): void {\n        this.paintJob = job;\n    }\n}\n\nclass Car extends Vehicle {\n    private gear: number;\n    \n    constructor() {\n        super({\n                color: Color.Red,\n                style: Style.Stripped\n            });\n        this.gear = 0;\n    }\n    \n    shiftUp(): void {\n        if ( this.gear < 6 ) this.gear++;\n    }\n    \n    shiftDown(): void {\n        if ( this.gear > 0 ) this.gear--;\n    }\n}\n\nclass Plane extends Vehicle {\n    private passengers: number;\n\n    constructor() {\n        super({\n                color: Color.Black,\n                style: Style.Dotted\n            });\n        this.passengers = 0;\n    }\n\n    welcomePassenger(): void {\n        this.passengers++;\n    }\n    \n    planeCrash(): void {\n        this.passengers = 0;\n    }\n}\n\nclass Node<T> {\n    private value : T;\n    \n    public next: Node<T>;\n\n    constructor(v: T, next: Node<T>) {\n        this.setValue(v);\n        this.next = next;\n    }\n    \n    setValue(value : T): void {\n        this.value = value;\n    }\n    \n    getValue(): T {\n        return this.value;\n    }\n}\n\nclass Stack<T> {\n    \n    private head: Node<T>;\n    private size: number;\n    \n    constructor() {\n        this.size = 0;\n    }\n    \n    getSize(): number {\n        return this.size;\n    }\n    \n    isEmpty(): boolean {\n        return this.size == 0;\n    }\n    \n    push( data: T ): void {\n        let node = new Node<T>(data, this.head);\n        this.head = node;\n        this.size++;\n    }\n    \n    pop(): T {\n        if (this.head) {\n            let node = this.head;\n            this.head = this.head.next;\n            this.size--;\n            return node.getValue();\n        } else {\n            return null;\n        }\n    }\n\n    print(): void {\n        let tmp: Node<T> = this.head;\n        while (tmp != null) {\n            console.log(tmp.getValue());\n            tmp = tmp.next;\n        }\n    }\n}\n\nclass PezDispenserGarage {\n    \n    private cars: Stack<Car>;\n    private planes: Stack<Plane>;\n    \n    constructor() {\n        this.cars = new Stack<Car>();\n        this.planes = new Stack<Plane>();\n    }\n}\n\n\/\/ do things';
editor.setValue(ch0, -1);

/* compile is triggered off of run button and Ctrl-ENTER or Mac Cmd-ENTER */

$('#run').click(trigger);

$(document).keydown(function(event) {
    if ((event.keyCode == 10 || event.keyCode == 13) && (event.ctrlKey || event.metaKey)) {
        trigger(event);
    }
});

/* !! compile TypeScript !! */

var trigger = function(event) {

    $('#console').append('> exec <br>');

    var output = transpileModule(editor.getValue(), {
        module: ts.ModuleKind.AMD,
        target: "ES6",
        noLib: false
    });

    try {
        eval(output);
        var rightDiv = document.getElementById("right");
        rightDiv.scrollTop = rightDiv.scrollHeight;
    } catch (e) {
        console.error(e);
    }
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

