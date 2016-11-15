/* load editor, set theme, and insert default text */

var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;
editor.session.setOption("useWorker", false)
editor.setTheme("ace/theme/tomorrow");
editor.getSession().setMode("ace/mode/javascript");

var ch0 = "var car  = 'bar'";
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