var ch1 = 'var name:string = \"Jerry\",\n    age:number = 22,\n    likesDogs:boolean = true;\n    \n\nvar clone:string = name;            \/\/ Ok\nvar dogLover:string = likesDogs;    \/\/ Error\n\n\nvar name: string = `Mack`;\nlet numDogs: number = 101;\nlet words: string = `${ name } has ${ numDogs } dalmatians.`\n\nconsole.log(words);\n\nvar list: number[] = [1, 3, 5, 8];\nvar arry: Array<number> = list;\n\nvar a: [string, number];            \/\/ this is called a tuple,\n                                    \/\/ allows you to describe the \n                                    \/\/ array more specifically. \na = [\"blue\", 1];                    \/\/ OK\na = [1, \"blue\"];                    \/\/ Error\n\nvar b: [number, boolean, string];   \/\/ not limited to 2 elements \nb = [10, true, \"eagle\"];            \/\/ OK\nb = [10, \"true\", \"eagle\"];          \/\/ Error\nb = [10, true, \"eagle\", 1, 3, 5,    \/\/ Elements sfter specification \n        8, false, \"beast\"];         \/\/ don\'t matter.\n\n\n\nvar hmm: any = 6;               \t\/\/ sometimes you need to make a \nhmm = \"string!\";                \t\/\/ variable\'s type flexible\nhmm = false; ';
var ch2 = 'function aya() {\n    \/\/ foo *is* visible out here\n    foo = 0;\n    \n    for( var foo; foo < 5; foo ++ ) {\n        \/\/ foo is visible to the whole function\n    }\n\n    \/\/ foo *is* visible out here\n    console.log(foo);\n}\n\nfunction bee() {\n    \/\/ bar is *not* visible out here\n\n    for( let bar = 0; bar < 5; bar ++ ) {\n        \/\/ bar is only visible in here \n        \/\/ (and in the for() parentheses)\n    }\n   \n    \/\/ bar is *not* visible out here\n    \/\/ this will produce an error\n    console.log(bar);\n}\n\nfunction see(p) {\n    var a = 100;\n\tif ( p ) {\n\t    \/\/ change let to var and errors will go away\n\t    \/\/ yet this is unsound practice\n\t\tlet b = a + 1;\n\t\treturn b;\n    } else {\n        \/\/ correct way to remove errors is to declare\n        \/\/ b here with let\n        b = a - 1;\n        return b;\n    }\n}\n\n\naya();\nconsole.log(see(null));\nbee();';
var ch3 = 'interface CoffeeCup {\n    full: boolean;\n    drink(): void;\n    refill(): void;\n}\n\nfunction inspect( cup: CoffeeCup ) {\n    if ( cup.full ) {\n        cup.drink();\n    } else {\n        cup.refill();\n    }\n}\n\n\/\/ can also declare inline \nfunction inspectInline ( \n    cup: {\n        full: boolean;\n        drink(): void;\n        refill(): void;\n    }) {\n    inspect(cup);\n}\n\nvar cup = {\n    full: false,\n    drink: function() {\n        this.full = false;\n    },\n    refill: function() {\n        this.full = true;\n    }\n}\n\ninspect(cup);           \/\/ OK\nconsole.log(cup.full);\ninspectInline(cup);     \/\/ OK\nconsole.log(cup.full);\n\ninspect(\"test\");        \/\/ Error\ninspectInline(false);   \/\/ Error\n';
var ch4 = 'class Drink {\n\n\tpublic full: boolean;\n\t\n\tconstructor() {\n\t    this.full = false;\n\t}\n\n\tinspect() {\n\t    console.log(\'hmmm\');\n        if ( this.full ) {\n            this.drink();\n            console.log(\'gulp...gulp...ahhh\');\n        } else {\n            this.refill();\n            console.log(\'need to refill if I wanna drink\');\n        }\n\t}\n\n\tdrink() {\n        this.full = false;\n\t}\n\n\trefill() {\n\t\tthis.full = true;\n\t}\n}\n\nclass Coffee extends Drink {\n\t\n}\n\nclass IceWater extends Drink {\n\n    constructor(private hasIce: boolean) {\n\t    super();\n\t}\n    \n\tinspect() {\n\t    console.log(\'hmmm\');\n        if ( this.full && this.hasIce ) {\n            this.drink();\n            console.log(\'gulp...gulp...ahhh nice and cold\');\n        } else {\n            this.refill();\n            console.log(\'add ice and water and you get ice water\');\n        }\n\t}\n\n\trefill() {\n\t\tsuper.refill();\n\t\tthis.hasIce = true;\n\t}\n\n\tmeltIce() {\n\t\tthis.hasIce = false;\n\t}\n}\n\nlet mug = new Coffee();\nmug.inspect(); \nmug.inspect();      \n\nlet glass = new IceWater(false);\nglass.inspect(); \nglass.meltIce();\nglass.inspect();\nglass.inspect();\n';
var ch5  = 'class Generic<T> {\n    value : T;\n    setValue(value : T) {\n        this.value = value;\n    }\n    getValue() : T {\n        return this.value;\n    }\n}\n\nvar str = new Generic<string>();\nstr.setValue(\"Hello World\");\nconsole.log(str.getValue());\n\nvar num = new Generic<number>();\nnum.setValue(1);\nconsole.log(num.getValue());\n\nvar boo = new Generic<boolean>();\nboo.setValue(true);\nconsole.log(boo.getValue());\n';
var ch6 = '\/\/ specify return type\nfunction hello():string {       \n    return \'hello\';\n}\n\nlet numStuff:number = hello();  \/\/ error\nlet greeting:string = hello();  \/\/ OK\n\n\/\/ specify param types\nfunction annoy(say: string, repeat: number ) { \n    for (let i = 0; i < repeat; i++) {\n        console.log(say);\n    }   \n}\n\nannoy(\'Hay!\', 10);      \/\/ OK\nannoy(\'Hay!\', true);    \/\/ Error\n\n\/\/ specify optional params\nfunction jump( height:number, name?:string ) {\n    if (name) {\n        console.log(name + \' jumped \' + height + \' feet\');\n    } else {\n        console.log(\'You jumped \' + height + \' feet\');\n    }\n}\n\njump(10);               \/\/ OK\njump(100, \'Jack\');      \/\/ OK';
var ch7 = 'const enum Colors {\n    Red,\n    Green,\n    Blue,\n    Rainbow = 100\n}\n\nvar colors = [Colors.Red, Colors.Green, Colors.Blue, Colors.Rainbow];\nvar numbers =  [0 \/* Red *\/, 1 \/* Green *\/, 2 \/* Blue *\/, 100 \/* Rainbow *\/];\n\nconsole.log(colors);\nconsole.log(numbers);\n\n\/\/ can return name of enum from value \nenum Enum {\n    A\n}\nlet a = Enum.A;\nlet nameOfA = Enum[Enum.A]; \/\/ \"A\"\n\nconsole.log(a);\nconsole.log(nameOfA);';
var ch8 = '\/\/ Expression bodies\nvar evens = [2, 4, 6, 8];\nvar odds = evens.map(v => v + 1);\nvar nums = evens.map((v, i) => v + i);\nvar pairs = evens.map(v => ({even: v, odd: v + 1}));\n\nvar fives = [];\n\n\/\/ Statement bodies\nnums.forEach(v => {\n  if (v % 5 === 0) {\n    fives.push(v);\n  }\n});\n\n\/\/ Lexical this\nvar bob = {\n  _name: \"Bob\",\n  _friends: [\"Jo\", \"Mark\", \"Harry\"],\n  printFriends() {\n    this._friends.forEach(f =>\n      \/\/ \'this\' refers to bob\n      console.log(this._name + \" knows \" + f));\n  },\n  badPrintFriends() {\n    this._friends.forEach(function(f) {\n        \/\/ \'this\' refers to global object window\n      console.log(this._name + \" knows \" + f);\n    });\n  }\n}\n\nbob.printFriends();\nbob.badPrintFriends();\n\nconsole.log(\"Evens: \" + evens);\nconsole.log(\"Odds: \" + odds);\nconsole.log(\"Nums: \" + nums);\n\nconsole.log(\"Pairs:\" )\n\nfor (let i = 0; i < pairs.length; i++ ) {\n    console.log(pairs[i].even + \", \" + pairs[i].odd);\n}\n\nconsole.log(\"Fives:\" + fives);\n\n\/\/ parameters\n\nfunction f (x, y = 7, z = 42) {\n    return x + y + z\n}\n\nfunction g(x, y, ...a) {\n    return (x + y) * a.length\n}\n\nfunction h(x, y, z) {\n  return x + y + z;\n}\n\nconsole.log(f(1));                          \/\/ 50\nconsole.log(g(1, 2, \"hello\", true, 7));     \/\/ 9\nconsole.log(h(...[1,2,3]));                 \/\/ 6\n\n\n\n\n\n\n';

$('#ch0').click(function () {
	editor.setValue(ch0, 1);
});

$('#ch1').click(function () {
	editor.setValue(ch1, 1);
});

$('#ch2').click(function () {
	editor.setValue(ch2, 1);
});

$('#ch3').click(function () {
	editor.setValue(ch3, 1);
});

$('#ch4').click(function () {
	editor.setValue(ch4, 1);
});

$('#ch5').click(function () {
	editor.setValue(ch5, 1);
});

$('#ch6').click(function () {
	editor.setValue(ch6, 1);
});

$('#ch7').click(function () {
	editor.setValue(ch7, 1);
});

$('#ch8').click(function () {
	editor.setValue(ch8, 1);
});