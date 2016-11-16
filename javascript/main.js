/* load editor, set theme, and insert default text */

var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;
editor.session.setOption("useWorker", false)
editor.setTheme("ace/theme/tomorrow");
editor.getSession().setMode("ace/mode/javascript");

var ch0 = '\/* tribe generator *\/\n\nvar numPeeps = 16,\n    maxAge = 50,\n    peeps = [];\n\nfor (var i = 0; i < numPeeps; i++) {\n    var person = {\n        name: genName(3 + rand(5)),\n        age: rand(maxAge) + 1,\n        toString: function() {\n            return this.name + \": \" + this.age + \" years old\";\n        }\n    }\n    peeps.push(person);\n}\n\nconsole.log(\"<br>The whole tribe\");\nconsole.log(\"-\".repeat(20));\n\npeeps.forEach(printPeep);\n\nconsole.log(\"<br>Youngins only\");\nconsole.log(\"-\".repeat(20));\n\npeeps.filter(function(p) {\n    return p.age < 21;\n}).forEach(printPeep);\n\nvar numClans = 4,\n    clans = [];\n\nfor (i = 0; i < numClans; i++) {\n    clans.push(genName(rand(3) + 4));\n}\n\nconsole.log(\"<br>Added clans\");\nconsole.log(\"-\".repeat(20));\n\npeeps = peeps.map(function(p) {\n    p.name += \" \" + clans[rand(numClans)];\n    return p;\n});\n\npeeps.forEach(printPeep);\n\nclans.forEach(function(c) {\n    console.log(\"<br>The \" + c + \" clan\");\n    console.log(\"-\".repeat(20));\n\n    peeps.filter(function(p) {\n        return lastName(p.name) == c;\n    }).forEach(printPeep);\n});\n\n\/* methods *\/\n\nfunction lastName(fullName) {\n    return fullName.split(\" \")[1];\n}\n\nfunction printPeep(p) {\n    console.log(p.toString());\n}\n\nfunction rand(num) {\n    return Math.floor(num * Math.random());\n}\n\nfunction genName(n) {\n\n    var singleConsts = [\'l\', \'c\', \'h\', \'t\', \'r\', \'s\', \'b\', \'w\', \'d\'];\n    var doubleConsts = [\'ck\', \'rt\', \'pp\', \'ts\', \'sk\'];\n    var vowels = [\'a\', \'e\', \'o\'];\n\n    var theName = \"\";\n    for (var i = 0; i < n; i++) {\n        if (i % 2 == 0 ) {\n            if (i == 0 || rand(2)) {\n                var num = rand(singleConsts.length);\n                theName += singleConsts[num];\n            } else {\n                var num = rand(doubleConsts.length);\n                theName += doubleConsts[num];\n            }\n        } else if (i ) {\n            var num = rand(vowels.length)\n            theName += vowels[num];\n        }\n    }\n    return theName;\n}';
editor.setValue(ch0, -1);

/* compile is triggered off of run button and Ctrl-ENTER or Mac Cmd-ENTER */

$('#run').click(trigger);

$(document).keydown(function(event) {
    if ((event.keyCode == 10 || event.keyCode == 13) && (event.ctrlKey || event.metaKey)) {
        trigger(event);
    }
});

/* !! compile JavaScript !! */

function trigger(event) {

    $('#console').append('> exec <br>');

    try {
        eval(editor.getValue());
        var rightDiv = document.getElementById("right");
        rightDiv.scrollTop = rightDiv.scrollHeight;
    } catch (e) {
        console.error(e);
    }
};