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

$('#middle').resizable({
    handles: 'e, w',
    resize: size
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
            $('#left').css('width', '25%');
            var newWidth = $('#middle').width() - $('#left').width();

            $('#middle').css('left', '25%');
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

