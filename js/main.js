/* load editor, set theme, and insert default text */

var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;
editor.session.setOption("useWorker", false)
editor.setTheme("ace/theme/clouds");
editor.getSession().setMode("ace/mode/typescript");

var ch0 = '\/**\n *  brief overview of the TypeScript language\n **\/\n\nconst enum Color {\n    White,\n    Black,\n    Red,\n    Green,\n    Blue\n}\n\nconst enum Style {\n    Blank,\n    Solid,\n    Stripped,\n    Dotted,\n}\n\ninterface PaintJob {\n    color: Color,\n    style: Style\n}\n\nclass Vehicle {\n    location: number;\n    paintJob: PaintJob;\n    \n    constructor(job?: PaintJob) {\n        if (job) {\n            this.paintJob = {\n                color: Color.White,\n                style: Style.Blank\n            }\n        }\n    }\n    \n    move(distance: number): void {\n        this.location += distance;\n    }\n    \n    paint(job: PaintJob): void {\n        this.paintJob = job;\n    }\n}\n\nclass Car extends Vehicle {\n    private gear: number;\n    \n    constructor() {\n        super({\n                color: Color.Red,\n                style: Style.Stripped\n            });\n        this.gear = 0;\n    }\n    \n    shiftUp(): void {\n        if ( this.gear < 6 ) this.gear++;\n    }\n    \n    shiftDown(): void {\n        if ( this.gear > 0 ) this.gear--;\n    }\n}\n\nclass Plane extends Vehicle {\n    private passengers: number;\n\n    constructor() {\n        super({\n                color: Color.Black,\n                style: Style.Dotted\n            });\n        this.passengers = 0;\n    }\n\n    welcomePassenger(): void {\n        this.passengers++;\n    }\n    \n    planeCrash(): void {\n        this.passengers = 0;\n    }\n}\n\nclass Node<T> {\n    private value : T;\n    \n    public next: Node<T>;\n\n    constructor(v: T, next: Node<T>) {\n        this.setValue(v);\n        this.next = next;\n    }\n    \n    setValue(value : T): void {\n        this.value = value;\n    }\n    \n    getValue(): T {\n        return this.value;\n    }\n}\n\nclass Stack<T> {\n    \n    private head: Node<T>;\n    private size: number;\n    \n    constructor() {\n        this.size = 0;\n    }\n    \n    getSize(): number {\n        return this.size;\n    }\n    \n    isEmpty(): boolean {\n        return this.size == 0;\n    }\n    \n    push( data: T ): void {\n        let node = new Node<T>(data, this.head);\n        this.head = node;\n        this.size++;\n    }\n    \n    pop(): T {\n        if (this.head) {\n            let node = this.head;\n            this.head = this.head.next;\n            this.size--;\n            return node.getValue();\n        } else {\n            return null;\n        }\n    }\n\n    print(): void {\n        let tmp: Node<T> = this.head;\n        while (tmp != null) {\n            console.log(tmp.getValue());\n            tmp = tmp.next;\n        }\n    }\n}\n\nclass PezDispenserGarage {\n    \n    private cars: Stack<Car>;\n    private planes: Stack<Plane>;\n    \n    constructor() {\n        this.cars = new Stack<Car>();\n        this.planes = new Stack<Plane>();\n    }\n}\n\n\/\/ do things';
editor.setValue(ch0, -1);

/* console blinker */

var blink = true;
var blinker = setInterval(function() {
    if (blink == true) {
        $('#prompt').text('> _')
    } else {
        $('#prompt').text('> ')
    }
    blink = !blink;
}, 750);

/* override console functions for when the user's program is run, redirect to the fake console */

console.log = function(str) {
    $('#console').append(str + '<br>');
    var objDiv = document.getElementById("right");
    objDiv.scrollTop = objDiv.scrollHeight;

};

console.error = function(str) {
    $('#console').append('<span class="err">' + str + '</span><br>')
};

/* jQuery resizing function */

var size = function(event, ui) {

    $('.ui-resizable-w').addClass('noclick');
    $('.ui-resizable-e').addClass('noclick');

    var diff = ui.size.width - ui.originalSize.width;

    if (ui.position.left < ui.originalPosition.left) {
        $('#left').css('width', ui.originalPosition.left - diff);
    } else if (ui.position.left > ui.originalPosition.left) {
        $('#left').css('width', ui.originalPosition.left - diff);
    } else if (ui.size.width < ui.originalSize.width) {
        var origRightPos = (ui.originalPosition.left + ui.originalSize.width);
        var origRightWidth = $('#bottom').width() - origRightPos;
        $('#right').css('left', origRightPos + diff);
        $('#right').css('width', origRightWidth - diff);
    } else if (ui.size.width > ui.originalSize.width) {
        var origRightPos = (ui.originalPosition.left + ui.originalSize.width);
        var origRightWidth = $('#bottom').width() - origRightPos;
        $('#right').css('left', origRightPos + diff);
        $('#right').css('width', origRightWidth - diff);
    }
};

/* !! compile !! */

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

/* the middle div is the only one that is resizable and the other div sizes are computed */

$('#middle').resizable({
    handles: 'e, w',
    resize: size
});

/* compile is triggered off of run button and Ctrl-ENTER or Mac Cmd-ENTER */

$('#run').click(trigger);

$(document).keydown(function(event) {
    if ((event.keyCode == 10 || event.keyCode == 13) && (event.ctrlKey || event.metaKey)) {
        trigger(event);
    }
});

/* clear console on click */

$('#right').click(function(event) {
    $('#hilarious').text('');
    $('#console').text('');
});

/* the resizing divs can be clicked */

$('.ui-resizable-w').click(function() {
    if ($(this).hasClass('noclick')) {
        $(this).removeClass('noclick');
    } else {
        if ($('#middle').position().left == 0) {
            $('#left').css('width', '22%');
            var newWidth = $('#middle').width() - $('#left').width();

            $('#middle').css('left', '22%');
            $('#middle').css('width', newWidth);
        } else {
            var newWidth = $('#middle').position().left + $('#middle').width();

            $('#middle').css('left', 0);
            $('#middle').css('width', newWidth);
        }
    }
});

$('.ui-resizable-e').click(function() {
    if ($(this).hasClass('noclick')) {
        $(this).removeClass('noclick');
    } else {
        if ($('#middle').width() + $('#middle').position().left >
            $(document).width() - 2) {
            $('#right').css('width', '30%');
            $('#right').css('left', '70%');
            var newWidth = $('#middle').width() - $('#right').width() - 16;

            $('#middle').css('width', newWidth);
        } else {
            var newWidth = $('#middle').width() + $('#right').width() + 16;
            $('#middle').css('width', newWidth);
        }
    }
});

